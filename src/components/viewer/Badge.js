import Inferno from 'inferno';
import Component from 'inferno-component';
import classNames from 'classnames';

export default class extends Component {
  render() {
    const { className, label, value, ...props} = this.props;
    const classes = classNames('badge p-1 d-flex flex-column justify-content-center', className);
    return (
      <div className={ classes } { ...props }>
        <div className="label">{ label }</div>
        { !!value && <div className="value">{ value }</div> }
      </div>
    );
  }
}
