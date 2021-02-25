import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileDetails } from "./ProfileDetails";
import { selectAllUsers } from "features/users/usersSlice";
import { AvatarPic } from "components/AvatarPic/AvatarPic";
import { headers, h2, flex, backToUsers } from "./UserProfile.module.css";
import { Loader } from "components/Loader/Loader";

export const UserProfile = ({ match }) => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(state => state.users.isLoading);
  const { userId } = match.params;
  const user = users.find(user => user.username === userId);

  return (
    <section>
      <div className={headers}>
        <Link to='/users' className={backToUsers}>
          Users List
        </Link>

        {isLoading && <h2 className={h2}>User name</h2>}

        {!user && !isLoading && (
          <h2 className={h2}>No user under ID: {userId}</h2>
        )}

        {!isLoading && user && (
          <h2 className={h2}>
            {user.firstName} {user.lastName}
          </h2>
        )}
      </div>

      {(isLoading || (isLoading && !user)) && <Loader />}

      {!isLoading && user && (
        <div className={flex}>
          <AvatarPic
            src={user.avatar}
            width='200'
            height='200'
            style={{ border: "3px solid #5E97F3", padding: "10px" }}
          />
          <ProfileDetails user={user} userId={userId} />
        </div>
      )}
    </section>
  );
};
