const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

function yaml2json(file) {
  try {
    const yamlfile = path.join("./syntaxes/yaml", file);
    let content = fs.readFileSync(yamlfile, "utf8");
    const doc = yaml.load(content);

    fs.writeFile(
      path.join("./syntaxes", file.replace(".yaml", ".json")),
      JSON.stringify(doc, null, 4),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

fs.readdirSync("./syntaxes/yaml").forEach((file) => {
  if (file.endsWith(".yaml")) {
    console.log(file);
    yaml2json(file);
  }
});
