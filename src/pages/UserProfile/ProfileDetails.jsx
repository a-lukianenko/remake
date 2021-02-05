import { Link } from "react-router-dom";

export const ProfileDetails = ({ user, userId }) => {
  const { username, password } = user.account;
  const { firstName, lastName, birthDate, email, address } = user.personalInfo;
  const { company, fax, facebook, phones } = user.contactDetails;
  const { skills, hobbies } = user.capabilities;

  return (
    <table style={style}>
      <tbody>
        {/* Account */}
        <tr>
          <td>
            Account <Link to={`/users/${userId}/edit/account`}>&#9998;</Link>
          </td>
          <td>User name</td>
          <td>{username}</td>
        </tr>
        <tr>
          <td></td>
          <td>Password</td>
          <td>{password}</td>
        </tr>

        {/* Personal */}
        <tr>
          <td>
            Personal <Link to={`/users/${userId}/edit/personal`}>&#9998;</Link>
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
          <td>{birthDate}</td>
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
            Contacts <Link to={`/users/${userId}/edit/contacts`}>&#9998;</Link>
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
          <td>Facebook NavLink</td>
          <td>{facebook}</td>
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
            <Link to={`/users/${userId}/edit/capabilities`}>&#9998;</Link>
          </td>
          <td>Skills</td>
          <td>{skills.join(", ")}</td>
        </tr>
        <tr>
          <td></td>
          <td>Hobbies</td>
          <td>{hobbies.join(", ")}</td>
        </tr>
      </tbody>
    </table>
  );
};

const style = {
  maxWidth: "50%",
};
