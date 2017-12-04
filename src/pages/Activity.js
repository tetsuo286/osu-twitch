import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-mobx';
import { Loading, RecentEvents } from 'components/viewer';

@connect(['state', 'store'])
export default class extends Component {
  render({ state }) {
    const { isFetchingProfile, profiles, beatMaps } = state;
    const profile = profiles.get(0);

    return (
      <div className="activity">
        { isFetchingProfile && <Loading /> }
        { !isFetchingProfile && !!profile &&
          <RecentEvents events={ profile.events } beatMaps={ beatMaps } /> }
      </div>
    );
  }
}