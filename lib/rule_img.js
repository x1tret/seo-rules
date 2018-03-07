module.exports = ($) => {
  var count = 0;
  $('img').each(function() {
    var attr = $(this).attr('alt');
    if (typeof attr === typeof undefined || attr === false)
        count++;
  })
  return count ? count : true;
}