import AsyncStorage from '@react-native-async-storage/async-storage';

const reset = { success: false };
/**
 * Function for store user data to loacal storage
 *
 * @param {object} value user data
 */
const _store_user_details = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@user_details', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Function for retrieve local storage data
 *
 * @return {object} value user data
 */
const _get_user_details = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_details');
    return jsonValue != null ? JSON.parse(jsonValue) : { success: false };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

/**
 * Function for delete local storage user data
 *
 */
const _remove_user_details = async () => {
  try {
    await AsyncStorage.removeItem('@user_details');
    await _store_user_details(reset);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Function for update user name in loacal storage
 *
 * @param String value for user data
 */
const _update_user_name = async (value) => {
  const temp = await _get_user_details();
  temp['name'] = value;
  try {
    const jsonValue = JSON.stringify(temp);
    await AsyncStorage.setItem('@user_details', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export {
  _store_user_details,
  _get_user_details,
  _remove_user_details,
  _update_user_name,
};
