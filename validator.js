var _a = require('./lib/rule_a');
var _img = require('./lib/rule_img');
var _h1count = require('./lib/rule_h1');
var _strong = require('./lib/rule_strong');
var _header = require('./lib/rule_header');

var msg = {
  a : 'There are {count} <a> tag without rel attribute.',
  img : 'There are {count} <img> tag without alt attribute.',
  h1count : 'This HTML has more than one <H1> tag.',
  strong : 'This HTML has more than {count} <strong> tag.',
  header_meta : 'This HTML without {meta} tag.',
  header_title : 'This HTML without <title> tag.'
};

var _get_error = (func, result) => {
  switch(func) {
    case 'header_meta':
      var meta = '', str = '';
      for(var i in result) {
        str = `<meta name="${result[i]}" />`;
        meta += msg[func].replace('{meta}', str) + "\n";
      }
      // console.log('test,', meta);
      return meta;
    default: return msg[func].replace('{count}', result) + "\n";
  }
};

module.exports = {
  get_error: _get_error,
  rules: {
    a : _a,
    img : _img,
    h1count : _h1count,
    strong : _strong,
    header_meta : _header.meta,
    header_title : _header.title
  }
}
