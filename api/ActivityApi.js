import axios from 'axios';

export const analyzeActivity = async (answer) => {
  try {
    const response = await axios.post('https://mentalhealthbe-3e24n5elga-uc.a.run.app/analyze', {answers: answer}, {
      headers: {
        'Content-Type': 'application/json',
      }},{timeout: 10000,
    });
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request Error:', error.message);
    }
    return null;
  }
};
