const SUNDAY = 0; const MONDAY = 1; const SATURDAY = 6;
class PasswordVerifier {
  // constructor inject dependencies
  constructor (rules, timeProvider) {
    this.rules = rules;
    this.timeProvider = timeProvider;
  }

  verify (input) {
    if ([SATURDAY, SUNDAY].includes(this.timeProvider.getDay())) {
      throw new Error("It's the weekend!");
    }
    const errors = [];
    // more code goes here..
    return errors;
  }
}

module.exports = {
  SUNDAY,
  MONDAY,
  SATURDAY,
  PasswordVerifier
};
