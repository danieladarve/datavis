const fs = require('fs');
const path = require('path');
const walk = require('walkdir');
const testData = [];
let folder = ""

walk.sync('./src/assets/tests', (c, stat) => {
  if(!c.includes(".txt")){
    folder = path.parse(c).name;
  }
  if(c.includes(".txt")){
    let test = {}
    const data = fs.readFileSync(c, 'utf8');
    const allLines = data.split(/\r\n|\n/);

    allLines.forEach((line, index) => {
      if(index <= 3){
        let lineContent = line.split(" ");
        test[lineContent[0].slice(0, -1)] = lineContent[1]
      }
    });

    const allTests = data.match(/(?:\{(?:(?:[^{}]+)|(?:[^{}]*\{[^{}]*\}[^{}]*)+)\})/gms);
    const location = (folder.replace(/-Left/g, "")).replace(/-Right/,"");
    test["Location"] = location
    test["Side"] = folder.replace(`${location}-`, "")
    test["Readings"] = allTests.map(item => JSON.parse(item));
    testData.push(test);
  }
});

let data = JSON.stringify(testData);
fs.writeFileSync('./src/assets/data.json', data);

module.exports = {
  lintOnSave: true,
  devServer: {
    port: 8000
  }
}
