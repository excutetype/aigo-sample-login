class dbException extends Error {
  constructor(msg) {
    super(msg);
  }
}

module.exports = { dbException };
