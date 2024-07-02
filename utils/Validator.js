/**
 * Function for check login credentials valid or not
 *
 * @param {string} email E-mail
 * @param {string} password password
 * @return {bool} true or false (valid or not)
 */
const loginValidator = (email, password) => {
  var status = false;

  const email_validate = validateEmail(email);
  const password_validate = validatePassword(password);

  if (email_validate && password_validate) {
    status = true;
  }
  return status;
};

/**
 * Function for check registartion credentials valid or not
 *
 * @param {string} email E-mail
 * @param {string} password password
 * @param {string} confirm_password re submitted password
 * @param {string} full_name user full name
 * @return {bool} true or false (valid or not)
 */
const registrationValidator = (
  email,
  password,
  confirm_password,
  full_name
) => {
  var status = false;

  const email_validate = validateEmail(email);
  const password_validate = validatePassword(password);

  if (
    email_validate &&
    password_validate &&
    confirm_password.replace(/\s/g, '') != '' &&
    full_name.replace(/\s/g, '') != '' &&
    password === confirm_password
  ) {
    status = true;
  }
  return status;
};

/**
 * Function for handle email hepler text
 *
 * @param {string} email E-mail
 * @return {dict} dictionary of message and success status
 */
const emailHelperText = (email) => {
  var status = true;
  if (validateEmail(email) || email === '') {
    status = false;
  }
  return { status: status, message: 'Please insert a valid email address' };
};

/**
 * Function for handle password hepler text
 *
 * @param {string} password password
 * @return {dict} dictionary of message and success status
 */
const passwordHelperText = (password) => {
  var status = true;
  if (validatePassword(password) || password === '') {
    status = false;
  }
  return {
    status: status,
    message:
      'Password shoud contain 6 - 16 characters and one special character and one number',
  };
};

/**
 * Function for handle password hepler text
 *
 * @param {string} password password
 * @param {string} re_password password
 * @return {dict} dictionary of message and success status
 */
const registrationPasswordHelperText = (password, re_password) => {
  var status = true;
  if (
    (validatePassword(password) && password == re_password) ||
    password === ''
  ) {
    status = false;
  }
  return {
    status: status,
    message:
      'Password shoud contain 6 - 16 characters and one special character and one number and password and confirm password should be same',
  };
};

/**
 * Function for chack if email is valid or not
 *
 * @param {string} password E-mail
 * @return {string || bool} If the email is valid : returns email as string or none
 */
const validatePassword = (password) => {
  return String(password)
    .toLowerCase()
    .match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
};

/**
 * Function for chack if email is valid or not
 *
 * @param {string} email E-mail
 * @return {string || bool} If the email is valid : returns email as string or none
 */
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Function for handle password confirm hepler text
 *
 * @param {string} password password
 * @param {string} re_password password
 *  @param {string} type string
 * @return {dict} dictionary of message and success status
 */
const passwordMatcherHelperText = (password, re_password, type) => {
  var status = true;
  if (password === re_password || password === '') {
    status = false;
  }
  return {
    status: status,
    message:
      type == 'old_password'
        ? 'Entered old password is wrong'
        : 'Password and confirm password should be same',
  };
};

export {
  loginValidator,
  registrationValidator,
  passwordHelperText,
  emailHelperText,
  registrationPasswordHelperText,
  validateEmail,
  validatePassword,
  passwordMatcherHelperText,
};
