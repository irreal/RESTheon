const bcrypt = require("bcrypt");

const pw = process.argv[2];
console.log("the plain text password is: ", pw);

bcrypt.hash(pw, 10, function(err, hash) {
  if (err) {
    console.error("There was an error generating the hash: " + err);
    return;
  }
  console.log("Hash succesfully generated! ", hash);
});
