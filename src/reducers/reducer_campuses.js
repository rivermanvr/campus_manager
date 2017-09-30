const initialState = {
  campuses: [{ name: 'Discovery Center', phone: '973-256-8080',
    photo: '/assets/images/Bldg-4.jpeg', students: [{ name:'Vince Rios' }] },
    { name: 'Hall of Medicine', phone: '973-256-8090',
    photo: '/assets/images/Bldg-3.jpeg', students: [{ name:'Vince Rios' }] }
  ],
  selectedCampus: {},
  campusStudents: []
}

export default (state = initialState, action) => {
  return state;
};
