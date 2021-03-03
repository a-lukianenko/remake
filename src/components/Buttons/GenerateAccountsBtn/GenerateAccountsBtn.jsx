import { generateUsersAsync } from "features/users/usersSlice";
import { useDispatch } from "react-redux";
import { genAccounts } from "utils/generateAccounts";
import { generateBtn } from "./GenerateAccountsBtn.module.css";

export const GenerateAccountsBtn = () => {
  const dispatch = useDispatch();
  const handleGenerate = () => {
    const accounts = genAccounts();
    dispatch(generateUsersAsync(accounts));
  };

  return (
    <button className={generateBtn} onClick={handleGenerate}>
      Generate accounts
    </button>
  );
};
