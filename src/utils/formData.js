import { object, string, date, array, ref } from "yup";
import { subYears } from "date-fns";

const phonePattern = /\+7\s\(\d{3}\)\s(\d{3}-\d{2}-\d{2})/;

export const formHeaders = [
  "1. Account",
  "2. Profile",
  "3. Contacts",
  "4. Capabilities",
];

export const hobbies = [
  { value: "art", label: "Art" },
  { value: "sports", label: "Sport, fitness, aerobica and staff like that" },
  {
    value: "games",
    label: "I just want to play games, I’m not living in this life",
  },
  { value: "nothing", label: "I’m a female... I’m doing nothing. Every day." },
  {
    value: "guitar",
    label: "Guitar, guitar and guitar again. I’m in love with it.",
  },
  { value: "wtf", label: "WTF is 'hobbies'???" },
];

export const languages = [
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "Spanish", label: "Spanish" },
  { value: "Mandarin", label: "Mandarin" },
  { value: "Russian", label: "Russian" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "German", label: "German" },
  { value: "Japanese", label: "Japanese" },
  { value: "Hindi", label: "Hindi" },
  { value: "Malay", label: "Malay" },
  { value: "Persian", label: "Persian" },
  { value: "Swahili", label: "Swahili" },
  { value: "Tamil", label: "Tamil" },
  { value: "Italian", label: "Italian" },
  { value: "Dutch", label: "Dutch" },
  { value: "Bengali", label: "Bengali" },
  { value: "Turkish", label: "Turkish" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Polish", label: "Polish" },
  { value: "Javanese", label: "Javanese" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Thai", label: "Thai" },
  { value: "Korean", label: "Korean" },
];

export const skills = [
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Angular", label: "Angular" },
  { value: "jQuery", label: "jQuery" },
  { value: "NodeJS", label: "NodeJS" },
  { value: "Python", label: "Python" },
  { value: "PHP", label: "PHP" },
  { value: "Ruby on Rails", label: "Ruby on Rails" },
  { value: "SQL", label: "SQL" },
  { value: "BackboneJS", label: "BackboneJS" },
  { value: "Web Design", label: "Web Design" },
  { value: "Project Management", label: "Project Management" },
  { value: "Git", label: "Git" },
  { value: "Docker", label: "Docker" },
  { value: "AWS Lambda", label: "AWS Lambda" },
  { value: "Firebase", label: "Firebase" },
];

export const initialValues = {
  avatar: "",
  username: "andri",
  password: "111aaAAAAaa",
  passwordRepeat: "111aaAAAAaa",
  firstName: "Andrii",
  lastName: "Lukianeko",
  email: "a@a.com",
  address: "",
  gender: "male",
  birthDate: new Date(1991, 1, 1),
  company: "brocoders",
  github: "",
  facebook: "",
  languages: ["English"],
  fax: "",
  phone1: "",
  phone2: "",
  phone3: "",
  skills: [],
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
        .email("Invalid email")
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
    languages: array(string())
      .min(1, "choose your main language")
      .required("required"),
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
    skills: array(string()).min(3, "Minimum 3 skills").required("required"),
    additionalInfo: string().max(300, "Maximum 300 characters"),
    hobbies: array(string()),
  }),
};
