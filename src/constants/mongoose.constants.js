export default {
  POPULATE: {
    ROLE_AND_PERMISSIONS: {
      path: 'role',
      populate: {
        path: 'permissions'
      }
    },
    PREFERENCE: 'preference'
  }
};
