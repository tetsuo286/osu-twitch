import Inferno from 'inferno';
import Component from 'inferno-component';

export default class App extends Component {
  render({ children }) {
    return <div>{ children }</div>;
  }
}
