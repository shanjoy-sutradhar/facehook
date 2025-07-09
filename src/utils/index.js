export const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  difference = difference / 1000;
  let yearDifference = Math.floor(difference / (3600 * 24 * 365));
  difference -= yearDifference * (3600 * 24 * 365);
  let dayDifference = Math.floor(difference / (3600 * 24));
  difference -= dayDifference * (3600 * 24);
  let hourDifference = Math.floor(difference / 3600);
  difference -= hourDifference * 3600;
  let minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;

  let message;

  if (yearDifference > 0) {
    message = `${yearDifference} year`;
  }
  if (dayDifference > 0) {
    message = message
      ? `${message} ${dayDifference} day`
      : `${dayDifference} day`;
  }
  if (hourDifference > 0) {
    message = message
      ? `${message} ${hourDifference} hour`
      : `${hourDifference} hour`;
  }

  if (minuteDifference > 0) {
    message = message
      ? `${message} ${minuteDifference} minutes`
      : `${minuteDifference} minutes`;
  }

  if (difference) {
    message = message
      ? `${message} ${Math.round(difference)} seconds`
      : `${Math.round(difference)} seconds`;
  }
  return message;
};

// --- Helper function for sorting posts (Latest first) ---
export const sortPostsLatestFirst = (posts) => {
  // Create a new array reference before sorting to ensure immutability
  // This is important because .sort() modifies the array in place.
  return [...posts].sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
};
