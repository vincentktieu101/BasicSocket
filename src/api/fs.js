const fs = require("fs");

const loadJSON = (filename = "") => {
  return JSON.parse(
    fs.existsSync(filename)
      ? fs.readFileSync(filename).toString()
      : "null"
  );
}

const saveJSON = (filename, json = "''") => {
  return fs.writeFileSync(filename, JSON.stringify(json, null, 2));
}

module.exports = {
  "loadJSON": loadJSON,
  "saveJSON": saveJSON
};