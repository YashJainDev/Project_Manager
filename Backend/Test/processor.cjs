function generateUser(userContext, events, done) {
  const randomNum = Math.floor(Math.random() * 100000);
  userContext.vars.username = `testuser${randomNum}`;
  userContext.vars.email = `testuser${randomNum}@example.com`;
  userContext.vars.password = `Pass${randomNum}@123`;

  return done();
}

module.exports = { generateUser }; 
