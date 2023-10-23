const checkPermission = (userId, userInfo) => {
  if (userInfo.role === "admin" || userId === userInfo.userId) return 1;
  return 0;
};

module.exports = {
  checkPermission,
};
