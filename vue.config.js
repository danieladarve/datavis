const fs = require('fs');
const walk = require('walkdir');
const testData = [];

walk.sync('./src/assets/tests', (path, stat) => {
  if(path.includes(".txt")){
    let test = {}
    const data = fs.readFileSync(path, 'utf8');
    const allLines = data.split(/\r\n|\n/);

    allLines.forEach((line, index) => {
      if(index <= 3){
        let lineContent = line.split(" ");
        test[lineContent[0].slice(0, -1)] = lineContent[1]
      }
    });

    const allTests = data.match(/(?:\{(?:(?:[^{}]+)|(?:[^{}]*\{[^{}]*\}[^{}]*)+)\})/gms);
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
