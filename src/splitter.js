var fs = require('fs');

module.exports = splitter

function splitter(readPath, pattern, cleanName, writePath){
  try {
    var array = fs.readFileSync(readPath).toString().split("\n");
  }
  catch (err) {
    throw err;
  }
  var title = "", file = "", first = true;
  for(var i=0; i < array.length; i++) {
    if (array[i].indexOf(pattern) > -1){
      if (!first) {
        fs.writeFile(title, file, function (err) {
          if (err) throw err;
        });
        file = "";
      }
      title = writePath + array[i].replace(cleanName, "").trim()
      title = title.replace(":", "").replace(" ", "") + ".md"
      console.log(title)
      file += array[i];
      first = false;
    }
    else {
      var newline = "\n" + array[i]
      file += newline;
    }
  }

  // handle last file
  fs.writeFile(title, file, function (err) {
    if (err) throw err;
  });
}


