var _a = require('./lib/rule_a');
var _img = require('./lib/rule_img');
var _h1count = require('./lib/rule_h1');
var _strong = require('./lib/rule_strong');
var _header = require('./lib/rule_header');

var validator = {
  a : _a,
  img : _img,
  h1count : _h1count,
  strong : _strong,
  header_meta : _header.meta,
  header_title : _header.title
};

var msg = {
  a : 'There are {count} <a> tag without rel attribute.',
  img : 'There are {count} <img> tag without alt attribute.',
  h1count : 'This HTML has more than one <H1> tag.',
  strong : 'This HTML has more than {count} <strong> tag.',
  header_meta : 'This HTML without {meta} tag.',
  header_title : 'This HTML without <title> tag.'
};

var get_error = (func, result) => {
  switch(func) {
    case 'header_meta':
      var meta = '', str = '';
      for(var i in result) {
        str = `<meta name="${result[i]}" />`;
        meta += msg[func].replace('{meta}', str) + "\n";
      }

      return meta;
    default: return msg[func].replace('{count}', result) + "\n";
  }
};

var _is_valid = ($html, rules) => {
  var output = '', result = null;

  if (rules == 'all') {
    for(var i in validator) {
      result = validator[i]($html);
      if (result !== true)
        output += get_error(i, result);
    }
    return output || true;
  }

  for(var i in rules) {
    var func = rules[i];
    if (typeof func === 'object') {
      result = validator[func.name]($html, func.option);
      if (result !== true)
        output += get_error(func.name, result);
    } else {
      if ( ! (func in validator))
        return Error(`Function "${func}" is not exist`);
      result = validator[func]($html);
      if (result !== true)
        output += get_error(func, result);
    }
  }

  return output || true;
}

module.exports = {
  is_valid: _is_valid,
}
