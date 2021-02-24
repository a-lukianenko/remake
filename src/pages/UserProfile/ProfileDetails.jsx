import { Link } from "react-router-dom";
import { profileDetails } from "./ProfileDetails.module.css";

export const ProfileDetails = ({ user, userId }) => {
  const {
    username,
    password,
    firstName,
    lastName,
    birthDate,
    email,
    address,
    company,
    fax,
    facebook,
    skills,
    hobbies,
  } = user;

  const phones = [];
  for (let i = 1; i <= 3; i++) {
    user[`phone${i}`] ?? phones.push(user[`phone${i}`]);
  }

  return (
    <div className={profileDetails}>
      <table className='table'>
        <tbody>
          {/* Account */}
          <tr>
            <td>
              Account{" "}
              <Link
                to={{
                  pathname: `/users/${userId}/edit`,
                  state: { formEditStep: 0 },
                }}
                className='edit'
              >
                &#9998;
              </Link>
            </td>
            <td>User name</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td></td>
            <td>Password</td>
            <td>{password.replaceAll(/./g, "*")}</td>
          </tr>

          {/* Personal */}
          <tr>
            <td>
              Personal{" "}
              <Link
                to={{
                  pathname: `/users/${userId}/edit`,
                  state: { formEditStep: 1 },
                }}
                className='edit'
              >
                {" "}
                &#9998;
              </Link>
            </td>
            <td>First name</td>
            <td>{firstName}</td>
          </tr>
          <tr>
            <td></td>
            <td>Last name</td>
            <td>{lastName}</td>
          </tr>
          <tr>
            <td></td>
            <td>Birthdate</td>
            <td>{new Date(birthDate).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td></td>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td></td>
            <td>Address</td>
            <td>{address}</td>
          </tr>

          {/* Contact details */}
          <tr>
            <td>
              Contacts{" "}
              <Link
                to={{
                  pathname: `/users/${userId}/edit`,
                  state: { formEditStep: 2 },
                }}
                className='edit'
              >
                {" "}
                &#9998;
              </Link>
            </td>
            <td>Company</td>
            <td>{company}</td>
          </tr>
          <tr>
            <td></td>
            <td>Fax</td>
            <td>{fax}</td>
          </tr>
          <tr>
            <td></td>
            <td>Facebook</td>
            <td>
              <a href={facebook}>{facebook}</a>
            </td>
          </tr>
          {phones.map((phone, i) => (
            <tr key={i.toString()}>
              <td></td>
              <td>Phone {i + 1}</td>
              <td>{phone}</td>
            </tr>
          ))}

          {/* Capabilities */}
          <tr>
            <td>
              Capabilities{" "}
              <Link
                to={{
                  pathname: `/users/${userId}/edit`,
                  state: { formEditStep: 3 },
                }}
                className='edit'
              >
                {" "}
                &#9998;
              </Link>
            </td>
            <td>Skills</td>
            <td>{skills.join(", ")}</td>
          </tr>
          <tr>
            <td></td>
            <td>Hobbies</td>
            <td>
              {hobbies.map(hobby => (
                <p key={hobby}>{hobby}</p>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
