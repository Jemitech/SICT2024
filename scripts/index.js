

function calculateTimeUntilFriday() {
    const today = new Date();
    const friday = new Date();
    const dayOfWeek = today.getDay();
    
    // Calculate days until next Friday
    let daysUntilFriday = 5 - dayOfWeek;
    if (dayOfWeek > 5) daysUntilFriday += 7; // If today is Saturday or Sunday
    
    // Set Friday's date
    friday.setDate(today.getDate() + daysUntilFriday);
    friday.setHours(0, 0, 0, 0);
    
    // Calculate remaining time
    const timeUntilFriday = friday - today;
    const days = Math.floor(timeUntilFriday / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeUntilFriday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilFriday % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeUntilFriday % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  }
  
  let day_s = document.getElementById('days');
  let hour_s = document.getElementById('hours');
  let min_s = document.getElementById('mins');
  let sec_s = document.getElementById('secs');

  // Function to update countdown display
  function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const { days, hours, minutes, seconds } = calculateTimeUntilFriday();

    day_s.textContent = days
    hour_s.textContent = hours
    min_s.textContent = minutes
    sec_s.textContent = seconds
    
    countdownElement.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }
  
  // Update countdown every second
  setInterval(updateCountdown, 1000);
  
  // Initial call to set countdown
  updateCountdown();
