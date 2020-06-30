const bcrypt = require("bcrypt");

const pw = process.argv[2];
const hash = process.argv[3];

console.log("plain text: ", pw);
console.log("hash: ", hash);
bcrypt.compare(pw, hash, function(err, result) {
  if (err) {
    console.error("There was an error comparing the hashes!", err);
    return;
  }
  console.log("Hash matches: ", result);
});
