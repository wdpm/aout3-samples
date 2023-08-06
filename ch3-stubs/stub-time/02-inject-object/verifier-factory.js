const {RealTimeProvider} = require('./time-provider');
const {PasswordVerifier} = require('./password-verifier-time02');

const passwordVerifierFactory = (rules) => {
  return new PasswordVerifier(rules, new RealTimeProvider());
};

module.exports = {
  passwordVerifierFactory
};
