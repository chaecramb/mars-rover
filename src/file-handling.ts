const fs = require("fs");
const path = require("path");

export const parseFile = (fileName: string) => {
  const filePath = path.join(__dirname, "../", fileName);
  return fs.readFileSync(filePath, "utf-8");
};
