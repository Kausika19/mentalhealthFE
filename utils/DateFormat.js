const getCurrentDateTime = () => {
    // Create a new Date object
    const currentDateTime = new Date();
  
    // Get individual components of the date and time
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDateTime.getDate();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();
  
    // Format components if needed (e.g., add leading zeros)
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    // Construct the date and time strings
    const currentDate = `${year}-${formattedMonth}-${formattedDay}`;
    const currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  
    // Return the date and time as an object
    return {
      currentDate: currentDate,
      currentTime: currentTime
    };
  };

export {getCurrentDateTime};


// const { currentDate, currentTime } = getCurrentDateTime();
// console.log('Current Date:', currentDate);
// console.log('Current Time:', currentTime);