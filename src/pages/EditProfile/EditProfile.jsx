import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserForm } from "components/UserForm/UserForm";

import {
  textCentered,
  backToUsers,
  h2,
} from "../UserProfile/UserProfile.module.css";
import { selectAllUsers } from "features/users/usersSlice";

export const EditProfile = ({ match }) => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(state => state.users.isLoading);
  const hasError = useSelector(state => state.users.hasError);
  const { userId } = match.params;
  const user = users.find(user => user.username === userId);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error...</div>;
  if (!user) return <h3>No user under ID: {userId}</h3>;

  return (
    <section>
      <div className={backToUsers}>
        <Link to={`/users/${userId}`} className='button'>
          &#8592; User profile
        </Link>
        <h2 className={h2}>Editing</h2>
      </div>
      <UserForm initialValues={user} isEditing={true} dbKey={user.username} />
    </section>
  );
};
