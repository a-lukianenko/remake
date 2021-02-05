import * as Yup from "yup";

export default Yup.object({
  username: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("required"),
  password: Yup.string()
    .min(8, "Must be minimum 8 characters")
    .matches(/(?=.*[A-Z])/, "Password must include at least 1 capital letter")
    .matches(/(?=.*\d)/, "Password must include at least 1 digit")
    .required("required"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("required"),
});
