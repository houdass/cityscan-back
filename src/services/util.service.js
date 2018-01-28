// Set user info from request
const setUserInfo = (request) => {
  const user = {
    _id: request._id,
    updatedAt: request.updatedAt,
    createdAt: request.createdAt,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    role: request.role
  };
  return user;
};

module.exports = {
  setUserInfo
};
