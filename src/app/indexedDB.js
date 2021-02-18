import Localbase from "localbase";

let db = new Localbase("db");

export const fetchUsersIDB = async () => {
  const users = await db.collection("users").get();
  return users;
};

export const addUserIDB = async user => {
  const key = await user.username;
  await db.collection("users").doc(key).set(user);
};

export const deleteUserIDB = async user => {
  const key = await user.username;
  await db.collection("users").doc(key).delete();
};
