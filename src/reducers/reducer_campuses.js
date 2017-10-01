const initialState = {
  campuses: [{ id: 3, name: 'Discovery Center', phone: '973-256-8080',
    photo: '/assets/images/Bldg-4.jpeg', students: [{ name:'Vince Rios' }] },
    { id: 2, name: 'Hall of Medicine', phone: '973-256-8090',
    photo: '/assets/images/Bldg-3.jpeg', students: [{ name:'Vince Rios' }] }
  ],
  selectedCampus: {},
  campusStudents: [],
  campusSelectBox: ''
}

export default (state = initialState, action) => {
  return state;
};
