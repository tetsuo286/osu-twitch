import Inferno from 'inferno';
import Component from 'inferno-component';
import { formatNo } from 'utils';
import { TableRow } from 'components/viewer';

export default class extends Component {
  render({ profile }) {
    return (
      <table className="table mb-0 fs-2">
        <TableRow label="Accuracy" value={ profile.accuracy ? (Number(profile.accuracy).toFixed(2) + '%') : '-' } />
        <TableRow label="Play Count" value={ formatNo(profile.playcount || 0) } />
        <TableRow label="Ranked Score" value={ formatNo(profile.ranked_score || 0) } />
        <TableRow label="Total Score" value={ formatNo(profile.total_score || 0) } />
        <TableRow label="Level" value={ Math.floor(profile.level || 0) } />
      </table>
    );
  }
}