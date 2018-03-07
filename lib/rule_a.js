module.exports = ($) => {
  var count = 0;
  $('a').each(function() {
    var attr = $(this).attr('rel');
    if (typeof attr === typeof undefined || attr === false)
        count++;
  })
  return count ? count : true;
}