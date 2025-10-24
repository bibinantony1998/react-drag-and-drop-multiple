// gpr-hack.js
import { writeFileSync, readFileSync } from "fs";

const file = readFileSync("./package.json", {
  encoding: "utf-8",
});

const json = JSON.parse(file);

json.name = "@bibinantony1998/react-drag-and-drop-multiple";

writeFileSync("./package.json", JSON.stringify(json, undefined, 2));
