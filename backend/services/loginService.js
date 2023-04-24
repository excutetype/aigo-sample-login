const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const exception = require("../exceptions");

const loginService = {
  login: async (loginData) => {
    try {
      const user = (await userRepository.findByEmail(loginData.email))[0];

      // 이메일 존제 확인
      if (!user) {
        throw new exception.loginServiceException.NotExistEmail();
      }

      if (!equelHash(loginData.password, user.password, user.salt)) {
        throw new exception.loginServiceException.WrongPassword();
      }

      // todo : token 발행
    } catch (e) {
      throw e;
    }
  },
};

function equelHash(planeText, hash, salt) {
  const digest = crypto
    .pbkdf2Sync(planeText, salt, 1, 32, "sha256")
    .toString("hex");

  if (digest === hash) return true;
  return false;
}

module.exports = loginService;
