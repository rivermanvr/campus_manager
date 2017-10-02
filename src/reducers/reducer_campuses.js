import { GOT_NEW_DATA } from '../actions';

const initialState = {
  campuses: [{ id: 3, name: 'Discovery Center', phone: '973-256-8080',
    photo: '/assets/images/Bldg-4.jpeg', students: [{ name:'Vince Rios' }] },
    { id: 2, name: 'Hall of Medicine', phone: '973-256-8090',
    photo: '/assets/images/Bldg-3.jpeg', students: [{ name:'Vince Rios' }] }
  ],
  selectedCampus: {},
  campusStudents: []
}

export default (state = initialState, action) => {
  console.log('in reducer_campuses: ', state, action);
  switch(action.type) {
    case GOT_NEW_DATA:
      return Object.assign({}, state, { campuses: action.payload.campuses })
    default:
      return state;
  }
};
