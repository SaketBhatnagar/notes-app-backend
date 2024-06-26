const userData = require("../db/UserDb");

const updatePassword = (email, password, newPassword) => {
  userData.map((user) => {
    if (user.email == email && user.password == password) {
      user.password = newPassword;
    }
  });
};

const updateName = (email, password, newName) => {
  userData.map((user) => {
    if (user.email == email && user.password == password) {
      user.name = newName;
    }
  });
};

const findUserById = (userid) => {
  let new_user = null;
  userData.map((user) => {
    if (user.userid == userid) {
      new_user = user;
    }
  });
  return new_user;
};

const deleteUser = (userid) => {
  let new_user = userData.filter((user) => user.userid !== +userid);
  return new_user;
};

module.exports = { deleteUser, findUserById, updateName, updatePassword };
