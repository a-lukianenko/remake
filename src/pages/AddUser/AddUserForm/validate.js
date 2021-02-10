import * as Yup from "yup";
import { subYears } from "date-fns";

const phonePattern = /\+7\s\(\d{3}\)\s(\d{3}-\d{2}-\d{2})/;
const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function validate(usernames, emails) {
  return Yup.object({
    avatar: Yup.string(),
    username: Yup.string()
      .notOneOf(usernames, "username already taken")
      .required("required"),
    password: Yup.string()
      .min(8, "Must be minimum 8 characters")
      .matches(/(?=.*[A-Z])/, "Password must include at least 1 capital letter")
      .matches(/(?=.*\d)/, "Password must include at least 1 digit")
      .required("required"),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("required"),
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    birthDate: Yup.date().max(
      subYears(new Date(), 18),
      "you must be at least 18 years old"
    ),
    email: Yup.string()
      .matches(
        emailPattern,
        "email should match the pattern e.g. name@some.com"
      )
      .notOneOf(emails, "email already registered")
      .required("required"),
    address: Yup.string(),
    gender: Yup.string().oneOf(["male", "female"]).required("required"),
    company: Yup.string().required("required"),
    github: Yup.string(),
    facebook: Yup.string(),
    language: Yup.string().required("required"),
    fax: Yup.string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
    phone1: Yup.string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
    phone2: Yup.string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
    phone3: Yup.string().matches(
      phonePattern,
      "must match the pattern +7 (XXX) XXX-XX-XX"
    ),
    // phones: Yup.array(
    //   Yup.object({
    //     [`phone${/(1|2|3)/}`]: Yup.string().matches(
    //       phonePattern,
    //       "must match the pattern +7 (XXX) XXX-XX-XX"
    //     ),
    //   })
    // )
    //   .max(3)
    //   .nullable(),
    skils: Yup.array(Yup.string())
      .min(3, "Minimum 3 skills")
      .required("required")
      .nullable(),
    additionalInfo: Yup.string().max(300, "Maximum 300 characters"),
    hobbies: Yup.array(Yup.string()),
  });
}
