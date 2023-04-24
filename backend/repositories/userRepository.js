const db = require("../database/mysql");
const exception = require("../exceptions");

userRepository = {
  create: async (user) => {
    const { email, nickname, password, salt } = user;
    return new Promise((resolve, reject) => {
      db.execute(
        "INSERT INTO user (email, nickname, password, salt) VALUES (?, ?, ?, ?);",
        [email, nickname, password, salt],
        (err, res) => {
          if (err) reject(new exception.dbException.dbException(err));
          resolve(res);
        }
      );
    });
  },

  findByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      db.execute("select * from user where email=?", [email], (err, res) => {
        if (err) reject(new exception.dbException.dbException(err));
        resolve(res);
      });
    });
  },
};

module.exports = userRepository;
