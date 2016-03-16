import { Map as map } from 'immutable';
import Share from '../components/share';

export default () => ({
  state: map({ title: 'Share a Story / New York Jets / cloth.io' }),
  component: Share,
});
