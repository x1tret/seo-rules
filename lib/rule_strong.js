module.exports = ($, length) => {
  length = length || 15;
  var len = $('strong').length;
  return len >= length ? length : true;
}