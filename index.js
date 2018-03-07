'use strict'

const cheerio = require('cheerio');
var fs = require('fs');
var validator = require('./validator');

module.exports = (params) => {


  if ( ! params)
    return Error('Missing required input like as object');

  var content = null;
  var format = params.format || 'html';
  if ( format == 'html') {
    if ( ! params.path)
      return Error('Missing required params: please input a "path" for your html which you want to validate');
    else if ( ! fs.existsSync(params.path))
      return Error('Your file is not exist');

    content = fs.readFileSync(params.path, 'utf8');
  }

  var rules = params.rules;
  if ( ! rules || (rules != 'all' && ! Array.isArray(rules)) )
    return Error('Please input your rules: all | ["h1count", "img"]');

  var output = '', result = null;
  var $html = cheerio.load(content);
  if (rules == 'all') {
    for(var i in validator.rules) {
      result = validator.rules[i]($html);
      if (result !== true)
        output += validator.get_error(i, result);
    }
  } else {
    for(var i in rules) {
      var func = rules[i];
      if (typeof func === 'object') {
        result = validator.rules[func.name]($html, func.option);
        if (result !== true)
          output += validator.get_error(func.name, result);
      } else {
        if ( ! (func in validator.rules))
          return Error(`Function "${func}" is not exist`);
        result = validator.rules[func]($html);
        if (result !== true)
          output += validator.get_error(func, result);
      }
    }
  }

  var out = params.output || null;
  if (out) {
    if (out == 'console') {
      console.log(output);
    } else {
      fs.access(__dirname, fs.W_OK, function(err) {
        if (err)
          return Error(`Cannot write file at ${out}`);
        fs.writeFile(out, output, function(err) {
          if(err)
            return console.log(err);
        });
      });
    }
  }

  if ( ! output)
    return true;

  return output;
}