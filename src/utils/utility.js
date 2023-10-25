export const formatDate = (str) => {
  const date = new Date(str)
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
} 