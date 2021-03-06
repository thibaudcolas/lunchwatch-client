import { Record } from 'immutable';
import moment from 'moment';
import * as types from './types';
import i18n from '../../../i18n';

const stateRecord = Record({
  date: moment(),
  language: 'fi',
  lat: 65.0593177,
  lng: 25.4662935,
  address: 'University of Oulu',
});

const initialState = stateRecord();

const searchParamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DATE_CHANGE: {
      return state.set('date', action.payload.date);
    }
    case types.LANGUAGE_CHANGE: {
      i18n.changeLanguage(action.payload.language);
      moment.locale(action.payload.language);
      return state.set('language', action.payload.language);
    }
    case types.LOCATION_CHANGE: {
      return state
        .set('lat', action.payload.lat)
        .set('lng', action.payload.lng)
        .set('address', action.payload.address);
    }
    default:
      return state;
  }
};

export default searchParamsReducer;
