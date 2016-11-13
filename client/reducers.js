/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import snapshots from './modules/Snapshot/SnapshotReducer';
import places from './modules/Place/PlaceReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  snapshots,
  places,
  intl
});