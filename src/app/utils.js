export function formatDate(timeString) {
  let d = new Date(parseInt(timeString) * 1000);
  return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
}