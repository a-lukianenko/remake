import { object, string, date, array, ref } from "yup";
import { subYears } from "date-fns";

const phonePattern = /\+7\s\(\d{3}\)\s(\d{3}-\d{2}-\d{2})/;
const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const formHeaders = [
  "1. Account",
  "2. Profile",
  "3. Contacts",
  "4. Capabilities",
];

export const initialValues = {
  avatar: "",
  username: "",
  password: "",
  passwordRepeat: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  gender: "male",
  birthDate: new Date(),
  company: "",
  github: "",
  facebook: "",
  language: "",
  fax: "",
  phone1: "",
  phone2: "",
  phone3: "",
  skils: null,
  additionalInfo: "",
  hobbies: [],
};

export const validationSchema = {
  account(usernames = []) {
    return object({
      avatar: string(),
      username: string()
        .notOneOf(usernames, "username already taken")
        .required("required"),
      password: string()
        .min(8, "Must be minimum 8 characters")
        .matches(
          /(?=.*[A-Z])/,
          "Password must include at least 1 capital letter"
        )
        .matches(/(?=.*\d)/, "Password must include at least 1 digit")
        .required("required"),
      passwordRepeat: string()
        .oneOf([ref("password"), null], "Passwords don't match")
        .required("required"),
    });
  },
  profile(emails = []) {
    return object({
      firstName: string().required("required"),
      lastName: string().required("required"),
      birthDate: date().max(
        subYears(new Date(), 18),
        "you must be at least 18 years old"
      ),
      email: string()
        .matches(
          emailPattern,
          "email should match the pattern e.g. name@some.com"
        )
        .notOneOf(emails, "email already registered")
        .required("required"),
      address: string(),
      gender: string().oneOf(["male", "female"]).required("required"),
    });
  },
  contacts: object({
    company: string().required("required"),
    github: string(),
    facebook: string(),
    language: string().required("required"),
    fax: string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
    phone1: string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
    phone2: string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
    phone3: string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
  }),
  capabilities: object({
    skils: array(string())
      .min(3, "Minimum 3 skills")
      .required("required")
      .nullable(),
    additionalInfo: string().max(300, "Maximum 300 characters"),
    hobbies: array(string()),
  }),
};
