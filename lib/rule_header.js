Header = {};

Header.meta = ($, arr_rule) => {
  arr_rule = arr_rule || ['descriptions', 'keywords'];
  var arr_meta = [], result = [], attr = null;
  $('head meta').each(function() {
    arr_meta.push($(this).attr('name'));
  })
  for(var i in arr_rule)
    if (arr_meta.indexOf(arr_rule[i]) == -1)
      result.push(arr_rule[i]);

  return result.length ? result : true;
}

Header.title = ($) => {
  return $('head title').length == 1;
}

module.exports = Header;