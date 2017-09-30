const initialState = {
  campuses: [{ name: 'Discovery Center', phone: '973-256-8080',
    photo: '/assets/images/Bldg-4.jpeg' },
    { name: 'Hall of Medicine', phone: '973-256-8090',
    photo: '/assets/images/Bldg-3.jpeg' }
  ],
  selectedCampus: {},
  campusStudents: []
}

export default (state = initialState, action) => {
  return state;
};
