export const dateFormatter = (dateString) => {
 const date = new Date(dateString);

 const year = date.getFullYear();
 const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed
 const day = String(date.getDate()).padStart(2, "0");

 return `${day}/${month}/${year}`;
};
