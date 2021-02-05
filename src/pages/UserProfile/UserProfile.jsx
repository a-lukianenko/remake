import { useSelector } from "react-redux";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
import { ProfileDetails } from "./ProfileDetails";

export const UserProfile = ({ match }) => {
  const users = useSelector(state => state.users);
  const { userId } = match.params;
  const user = users.find(user => user.account.username === userId);

  if (!user) return <h3>No user under ID: {userId}</h3>;

  const { firstName, lastName } = user.personalInfo;

  return (
    <section style={style.textCentered}>
      <div style={style.backToUsers}>
        <Link to='/users' className='button'>
          &#8592; Users list
        </Link>
        <h2 style={style.h2}>
          {firstName} {lastName}
        </h2>
      </div>

      <div style={style.flex}>
        <Avatar />
        <ProfileDetails user={user} userId={userId} />
      </div>
    </section>
  );
};

export const style = {
  textCentered: {
    padding: "0 2rem",
    textAlign: "center",
  },
  backToUsers: {
    display: "flex",
    alignItems: "center",
  },
  h2: {
    margin: "2rem auto",
  },
  flex: {
    display: "flex",
    justifyContent: "space-around",
  },
};
