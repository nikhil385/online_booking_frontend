import axios from 'axios';

export const login = async(username, password) => {
  const data = { username, password }

  axios.post(
    `${process.env.REACT_APP_API_URL}/users/login`,
    data,
    {
      headers: {
        "Content-Type": 'application/json'
      }
    }
  ).then(response => {
    sessionStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }).catch(error => {
    console.error('Error:', error);
  });
}