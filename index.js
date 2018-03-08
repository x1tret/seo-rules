'use strict'

const cheerio = require('cheerio');
var fs = require('fs');
var validator = require('./validator');

var print_out = (content, output) => {
  if ( ! output)
    return content;

  if (output == 'console')
    return console.log(content);

  fs.access(__dirname, fs.W_OK, function(err) {
    if (err)
      return Error(`Cannot write file at ${output}`);
    fs.writeFile(output, content, function(err) {
      if(err)
        return console.log(err);
    });
  });
}

module.exports = (params) => {

  if ( ! params)
    return Error('Missing required input like as object');

  var format = params.format || 'html';
  if ( format != 'html' && format != 'stream')
    return Error('Your format is invalid');

  if ( ! params.path)
    return Error('Missing required params: please input a "path" for your html which you want to validate');

  var rules = params.rules;
  if ( ! rules || (rules != 'all' && ! Array.isArray(rules)) )
    return Error('Please input your rules: all | ["h1count", "img"]');

  var output = params.output || null;

  if (format == 'html') {
    if ( ! fs.existsSync(params.path))
      return Error('Your file is not exist');

    var content = fs.readFileSync(params.path, 'utf8');
    var $html = cheerio.load(content);
    var result = validator.is_valid($html, rules);
    return print_out(result, output);
  }

  var readable = params.path;
  if (typeof readable != 'object' || readable.constructor.name != 'ReadStream')
    return Error('Input with stream format must be a ReadStream');

  readable.on('data', (content) => {
    var $html = cheerio.load(content);
    var result = validator.is_valid($html, rules);

    if (typeof output == 'object' && output.constructor.name == 'WriteStream')
      return output.write(result, 'utf8');

    return print_out(result, output);
  });
}