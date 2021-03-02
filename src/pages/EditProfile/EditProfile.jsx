import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserForm } from "components/UserForm/UserForm";

import {
  headers,
  h2,
  backToUsers,
} from "../UserProfile/UserProfile.module.css";
import { selectAllUsers } from "features/users/usersSlice";
import { Loader } from "components/Loader/Loader";

export const EditProfile = ({ match }) => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(state => state.users.isLoading);
  const { userId } = match.params;
  const user = users.find(user => user.id === userId);

  return (
    <section>
      <div className={headers}>
        <Link
          to={`/users/${userId}`}
          title='back to profile'
          className={backToUsers}
        >
          User profile
        </Link>
        <h2 className={h2}>Editing</h2>
      </div>

      {isLoading && !user && <Loader />}

      {!isLoading && !user && (
        <h3 style={{ textAlign: "center" }}>No user under ID: {userId}</h3>
      )}

      {!isLoading && user && <UserForm valuesToEdit={user} userId={userId} />}
    </section>
  );
};
