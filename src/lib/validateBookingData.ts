import { BookingForm } from "../types/forms";

export const validateBookingData = (formData: BookingForm) => {
  const errors: string[] = [];
  const now = new Date();

  // Check if the booking date is today or in the future
  const bookingDate = new Date(formData.date);
  bookingDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ideally this would be need to be done server side too as we can't trust the client time and date
  if (bookingDate < today) {
    errors.push("Booking date must be today or in the future");
  } else if (bookingDate.getTime() === today.getTime()) {
    // If booking is today, ensure time is at least 1 hour from now
    const bookingTime = new Date(formData.date + "T" + formData.time);
    const timeDiff = bookingTime.getTime() - now.getTime();
    const hour = 1000 * 60 * 60;

    if (timeDiff < hour) {
      errors.push("Booking time must be at least 1 hour from now");
    }
  }

  // Check if guests are between 1 and 12 -- we're using a select menu but double-check
  if (formData.guests < 1 || formData.guests > 12) {
    errors.push("Guests must be between 1 and 12");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
