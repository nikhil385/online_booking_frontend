import axios from 'axios';
const headers = {
  "Content-Type": 'application/json'
}

export const getEvents = async() => {
  const data = JSON.parse(sessionStorage.getItem('user'))
  const events = await axios.get(
    `${process.env.REACT_APP_API_URL}/events?userId=${data._id}`,
    { headers }
  )
  return events.data
}

export const createEvent = (data) => {
  axios.post(
    `${process.env.REACT_APP_API_URL}/events`,
    data,
    { headers }
  ).then(response => {
    return response.data
  }).catch(error => {
    console.error('Error:', error);
    return []
  });
}

export const approveEvent = (data) => {
  axios.post(
    `${process.env.REACT_APP_API_URL}/events/approve/${data._id}`,
    data,
    { headers }
  ).then(response => {
    return response.data
  }).catch(error => {
    console.error('Error:', error);
    return []
  });
}

export const rejectEvent = (data) => {
  axios.post(
    `${process.env.REACT_APP_API_URL}/events/reject/${data._id}`,
    data,
    { headers }
  ).then(response => {
    return response.data
  }).catch(error => {
    console.error('Error:', error);
    return []
  });
}