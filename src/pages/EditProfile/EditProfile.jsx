import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { style } from "../UserProfile/UserProfile";

export const EditProfile = ({ match }) => {
  const { userId, section } = match.params;
  const users = useSelector(state => state.users);
  const user = users.find(user => user.account.username === userId);

  return (
    <section style={style.textCentered}>
      <div style={style.backToUsers}>
        <Link to={`/users/${userId}`} className='button'>
          &#8592; User profile
        </Link>
        <h2 style={style.h2}>Editing</h2>
      </div>
      <h3>{section}</h3>
      <p>{user.account.username}</p>
    </section>
  );
};
