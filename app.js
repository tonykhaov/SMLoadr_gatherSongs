const fs = require("fs");
const path = require("path");

const DOWNLOADS_dir = path.join(__dirname, "/DOWNLOADS");

console.log(DOWNLOADS_dir);

fs.readdir(DOWNLOADS_dir, {}, (err, files) => {
  if (err) return console.log(err);
  else return console.log(typeof files);
});
