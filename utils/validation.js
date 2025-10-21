const validateUserName = (username) => {
  const regex = /^[a-zA-Z\d_]{4,16}$/;
  const result = regex.test(username);
  return result;
};
const validatePassword = (password) => {
  const regex = /^.{4,20}$/;
  const result = regex.test(password);
  return result;
};
const validateForm = (username, password) => {
  const usernameResult = validateUserName(username);
  const passwordResult = validatePassword(password);
  if (usernameResult && passwordResult) {
    return true;
  } else if (!usernameResult) {
    alert("username is not valid!");
  } else if (!passwordResult) {
    alert("password must between 4 and 20 characters!");
  }
  return false;
};
export default validateForm;
