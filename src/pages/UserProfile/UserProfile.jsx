import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileDetails } from "./ProfileDetails";
import { selectAllUsers } from "features/users/usersSlice";
import { AvatarPic } from "components/AvatarPic/AvatarPic";
import { textCentered, backToUsers, h2, flex } from "./UserProfile.module.css";

export const UserProfile = ({ match }) => {
  const users = useSelector(selectAllUsers);
  const { userId } = match.params;
  const user = users.find(user => user.username === userId);

  if (!user) return <h3>No user under ID: {userId}</h3>;

  const { firstName, lastName } = user;

  return (
    <section className={textCentered}>
      <div className={backToUsers}>
        <Link to='/users' className='button'>
          &#8592; Users list
        </Link>
        <h2 className={h2}>
          {firstName} {lastName}
        </h2>
      </div>

      <div className={flex}>
        <AvatarPic src={user.avatar} width='150' height='150' />
        <ProfileDetails user={user} userId={userId} />
      </div>
    </section>
  );
};
