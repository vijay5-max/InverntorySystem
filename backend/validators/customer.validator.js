import ApiError from "../utils/ApiError.js";

export const validateCustomer = (req, res, next) => {

  const {
    name,
    phone,
    email,
  } = req.body;

  // Name
  if (!name || name.trim() === "") {
    return next(new ApiError(400, "Customer name is required"));
  }

  // Phone
  if (!phone || phone.trim() === "") {
    return next(new ApiError(400, "Phone number is required"));
  }

  // Phone format (10 digits)
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    return next(new ApiError(400, "Phone number must contain exactly 10 digits"));
  }

  // Email (optional)
  if (email) {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return next(new ApiError(400, "Invalid email address"));
    }
  }

  next();

};