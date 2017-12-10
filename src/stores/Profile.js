import { action } from 'mobx';
import map from 'lodash.map';
import asyncWrapper from 'stores/asyncWrapper';

// TODO externalize
function errorHandler(e) {
  switch(e.response.status) {
    case 404:
    this.state.lastError = 'Profile not found';
    break;
    default:
    this.state.lastError = 'Unable to load profile';
  }
}

export default class {
  constructor(request, state, rootStore) {
    this.request = request;
    this.state = state;
    this.rootStore = rootStore;
  }

  @action async fetch(mode=0) {
    asyncWrapper.call(this, async () => {
      const result = await this.request.get('/users/viewing', {
        headers: { Authorization: this.state.authorization },
        params: { m: mode, event_days: 15 }
      });
      this.state.profiles.set(mode, result.data);
      await this.rootStore.beatMaps.fetch(map(result.data.events, 'beatmap_id'));
    }, 'Profile', errorHandler);
  }

  @action setData(data) {
    if(data.beatMaps) {
      data.beatMaps.forEach(beatMap => {
        this.state.beatMaps.set(beatMap.beatmap_id, beatMap);
      });
    }
    this.state.profiles.set(0, Object.assign(this.state.profiles.get(0), data.user));
    this.state.lastRefreshTime = Date.now();
  }
}
