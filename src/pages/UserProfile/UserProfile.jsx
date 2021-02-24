import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileDetails } from "./ProfileDetails";
import { selectAllUsers } from "features/users/usersSlice";
import { AvatarPic } from "components/AvatarPic/AvatarPic";
import {
  textCentered,
  headers,
  h2,
  flex,
  backToUsers,
} from "./UserProfile.module.css";

export const UserProfile = ({ match }) => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(state => state.users.isLoading);
  const hasError = useSelector(state => state.users.hasError);
  const { userId } = match.params;
  const user = users.find(user => user.username === userId);

  if (!user) return <h3>No user under ID: {userId}</h3>;

  const { firstName, lastName } = user;

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error...</div>;

  return (
    <section className={textCentered}>
      <div className={headers}>
        <Link to='/users' className={backToUsers}>
          Users List
        </Link>
        <h2 className={h2}>
          {firstName} {lastName}
        </h2>
      </div>

      <div className={flex}>
        <AvatarPic
          src={user.avatar}
          width='150'
          height='150'
          style={{ border: "3px solid #5E97F3" }}
        />
        <ProfileDetails user={user} userId={userId} />
      </div>
    </section>
  );
};
