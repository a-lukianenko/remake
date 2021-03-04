import Localbase from "localbase";

const db = new Localbase("db");

export const fetchUsersIDB = async () => {
  return db.collection("users").get();
};

export const addUserIDB = async user => {
  const key = await user.id;
  await db.collection("users").doc(key).set(user);
};

export const deleteUserIDB = async id => {
  await db.collection("users").doc(id).delete();
};

export const updateUserIDB = async (userId, user) => {
  await db.collection("users").doc(userId).set(user);
};

export const addFakeUsersIDB = async users => {
  await db.collection("users").set(users, { keys: true });
};
