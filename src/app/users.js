import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(),
    account: {
      username: "leanne",
      password: "123231",
    },
    personalInfo: {
      firstName: "Leanne",
      lastName: "Graham",
      birthDate: "01.01.1990",
      email: "Sincere@april.biz",
      address: "123 Main St",
    },
    contactDetails: {
      company: "Google",
      fax: "11-22-333",
      facebook: "fb/me",
      phones: ["050-111-22-33", "050-444-55-66"],
    },
    capabilities: {
      skills: ["skill_1", "skill_2", "skill_3"],
      hobbies: ["hobby_1", "hobby_2", "hobby_3"],
    },
    lastUpdate: "1 month ago",
  },
  {
    id: nanoid(),
    account: {
      username: "ervin",
      password: "asagAds",
    },
    personalInfo: {
      firstName: "Ervin",
      lastName: "Ford",
      birthDate: "02.02.1992",
      email: "ervin@april.biz",
      address: "200 Main St",
    },
    contactDetails: {
      company: "Amazon",
      fax: "001-22-333",
      facebook: "fb/ervin",
      phones: ["050-443-25-66"],
    },

    capabilities: {
      skills: ["skill_1", "skill_2", "skill_3"],
      hobbies: ["hobby_1", "hobby_2", "hobby_3"],
    },
    lastUpdate: "2 weeks ago",
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

// export const {  } = usersSlice.actions;

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export default usersSlice.reducer;
