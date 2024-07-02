import AsyncStorage from '@react-native-async-storage/async-storage';

const reset = { success: false };
/**
 * Function for store user data to loacal storage
 *
 * @param {object} value user data
 */
const _store = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@auth_data', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Function for retrieve local storage data
 *
 * @return {object} value user data
 */
const _get = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@auth_data');
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
const _remove = async () => {
  try {
    await AsyncStorage.removeItem('@auth_data');
    await _store(reset);
  } catch (e) {
    console.error(e);
  }
};

export { _store, _get, _remove };
