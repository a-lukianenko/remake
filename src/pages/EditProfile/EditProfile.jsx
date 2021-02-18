import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  textCentered,
  backToUsers,
  h2,
} from "../UserProfile/UserProfile.module.css";

export const EditProfile = ({ match }) => {
  const { userId, section } = match.params;
  const users = useSelector(state => state.users);
  const user = users.find(user => user.username === userId);

  return (
    <section className={textCentered}>
      <div className={backToUsers}>
        <Link to={`/users/${userId}`} className='button'>
          &#8592; User profile
        </Link>
        <h2 className={h2}>Editing</h2>
      </div>
      <h3>{section}</h3>
      <p>{user.username}</p>
    </section>
  );
};
