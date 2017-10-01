import { REMOVE_CAMPUS, ADD_CAMPUS } from './constants';

export function removeCampus(campusId) {
  console.log('in campusRemove action: ', campusId)
  return { type: REMOVE_CAMPUS, payload: campusId };
}

export function addCampus(campusNew) {
  console.log('in campusAdd action: ', campusNew)
  return { type: ADD_CAMPUS, payload: campusNew };
}
