export const formatDate = (str) => {
  const date = new Date(str)
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
} 

export const getLoggedInUser = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
  return loggedInUser
}