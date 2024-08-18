export function formatDate(timestamp: string) {
  const date = new Date(timestamp);

  // Extract the components
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Format the date and time
  const formattedDate = `${day}/${month}/${year}  ${hours}:${minutes} `;
  return formattedDate;
}
