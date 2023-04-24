const crypto = require("crypto");
const userRepository = require("../repositories/userRepository");
const exception = require("../exceptions");

const registerService = {
  register: async (registerData) => {
    try {
      // 이메일 중복 검사
      const sameEmailUser = await userRepository.findByEmail(
        registerData.email
      );
      if (sameEmailUser.length) {
        throw new exception.registerServiceException.ExistEmail();
      }

      const { digest, salt } = hashing(registerData.password);
      const user = {
        email: registerData.email,
        nickname: registerData.nickname,
        password: digest,
        salt,
      };

      return userRepository.create(user);
    } catch (e) {
      throw e;
    }
  },
};

function hashing(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const digest = crypto
    .pbkdf2Sync(password, salt, 1, 32, "sha256")
    .toString("hex");

  return { salt, digest };
}

module.exports = registerService;
