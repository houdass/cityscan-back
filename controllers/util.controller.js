// Set user info from request
const setUserInfo = (request) => {
    const user = {
        _id: request._id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        role: request.role,
        permissions: request.permissions
    };
    return user;
};

module.exports = {
    setUserInfo
};
