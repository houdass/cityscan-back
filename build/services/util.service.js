"use strict";

// Set user info from request
var setUserInfo = function setUserInfo(request) {
  var user = {
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
  setUserInfo: setUserInfo
};