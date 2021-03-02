import PropTypes from "prop-types";

export const UnsavedDataType = {
  continueForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export const AvatarPicType = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
};

export const ConfirmButtonType = {
  isConfirmed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  confirmTitle: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired,
  finalAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
};

export const FormHeadersType = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  touched: PropTypes.number.isRequired,
  isEditing: PropTypes.bool,
  handleStepNavigation: PropTypes.func.isRequired,
};

export const AddressInputType = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export const AvatarInputType = {
  name: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
};

export const BirthDateInputType = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export const RadioInputType = {
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  type: PropTypes.string.isRequired,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  labelWrapper: PropTypes.string,
};

export const RadioInputGroupType = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  labelStyle: PropTypes.string,
  labelsStyle: PropTypes.string,
  labelWrapper: PropTypes.string,
};

export const SelectInputType = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  isMulti: PropTypes.bool,
  indicatorsContainer: PropTypes.bool,
};

export const TelInputType = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  removePhone: PropTypes.func,
  isRemovable: PropTypes.bool,
};

export const TextAreaInputType = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  isResizable: PropTypes.bool,
  rows: PropTypes.string,
  cols: PropTypes.string,
};

export const TextInputType = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export const UserFormType = {
  valuesToEdit: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordRepeat: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string,
    gender: PropTypes.oneOf(["male", "female"]),
    birthDate: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    github: PropTypes.string,
    facebook: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    fax: PropTypes.string,
    phone1: PropTypes.string,
    phone2: PropTypes.string,
    phone3: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    additionalInfo: PropTypes.string,
    hobbies: PropTypes.arrayOf(PropTypes.string),
  }),
  userId: PropTypes.string,
};

export const FormStepperType = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  valuesToEdit: UserFormType.valuesToEdit,
  userId: PropTypes.string,
};

export const EditProfileType = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const UserRecordType = {
  user: UserFormType.valuesToEdit,
};

UserRecordType.user.id = PropTypes.string.isRequired;

export const ProfileDetailsType = {
  user: UserFormType.valuesToEdit.isRequired,
};

export const UserProfileType = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const SearchInputType = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
