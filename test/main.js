var tap = require('tap')
var seo = require('../index');
var fs = require('fs');

tap.test('Requires options to be specified', function (test) {
  var options = false
  var expected = new Error('Missing required input like as object')
  try {
    seo(options);
  } catch (e) {
    tap.equal(e, expected)
  }
  test.done()
})

tap.test('Requires "path" as mandatory option', function (test) {
  var options = {}
  var expected = new Error('Missing required params: please input a "path" for your html which you want to validate')
  try {
    seo(options);
  } catch (e) {
    tap.equal(e, expected)
  }
  test.done()
})

tap.test('Requires "path" as exist directory', function (test) {
  var options = {path: 'not exist'}
  var expected = new Error('Your file is not exist')
  try {
    seo(options);
  } catch (e) {
    tap.equal(e, expected)
  }
  test.done()
})

tap.test('Requires "rules" as mandatory option', function (test) {
  var options = {path:'test/data/valid.html'}
  var expected = new Error('Please input your rules: all | ["h1count", "img"]')
  try {
    seo(options);
  } catch (e) {
    tap.equal(e, expected)
  }
  test.done()
})

tap.test('Requires "rules" as array or "all"', function (test) {
  var options = {
    path:'test/data/valid.html',
    rules: false
  }
  var expected = new Error('Please input your rules: all | ["h1count", "img"]')
  try {
    seo(options);
  } catch (e) {
    tap.equal(e, expected)
  }
  test.done()
})

tap.test('Check function is not exist', function (test) {
  var options = {
    path:'test/data/valid.html',
    rules: ['header']
  }
  var expected = new Error('Function "header" is not exist')
  try {
    seo(options);
  } catch (e) {
    tap.equal(e, expected)
  }
  test.done()
})

tap.test('Check all testcase valid', function (test) {
  var options = {
    path:'test/data/valid.html',
    rules: 'all'
  }
  tap.equal(seo(options), true);
  test.done()
})

tap.test('Check all testcase invalid', function (test) {
  var options = {
    path:'test/data/invalid.html',
    rules: 'all'
  }
  expected = `There are 1 <a> tag without rel attribute.
There are 2 <img> tag without alt attribute.
This HTML has more than one <H1> tag.
This HTML has more than 15 <strong> tag.
This HTML without <meta name="descriptions" /> tag.
This HTML without <meta name="keywords" /> tag.
This HTML without <title> tag.
`;

  tap.equal(seo(options), expected);
  test.done()
})

tap.test('Check testcase for "meta" and "strong" in valid', function (test) {
  var options = {
    path:'test/data/valid.html',
    rules: ['header_meta', 'strong']
  }
  tap.equal(seo(options), true);
  test.done()
})

tap.test('Check "strong" testcase with custom input ', function (test) {
  var options = {
    path:'test/data/invalid.html',
    rules: [{name:'strong', option:20}]
  }
  tap.equal(seo(options), true);
  test.done()
})

tap.test('Check testcase for "meta" and "strong" in invalid', function (test) {
  var options = {
    path:'test/data/invalid.html',
    rules: ['strong','header_meta']
  }
  expected = `This HTML has more than 15 <strong> tag.
This HTML without <meta name="descriptions" /> tag.
This HTML without <meta name="keywords" /> tag.
`;
  tap.equal(seo(options), expected);
  test.done()
})

tap.test('Check output file success', function (test) {
  var options = {
    path:'test/data/invalid.html',
    rules: 'all',
    output: 'out.txt'
  }
  tap.equal(fs.existsSync(options.output), true);
  test.done()
})

tap.test('Check output file fail', function (test) {
  var options = {
    path:'test/data/invalid.html',
    rules: 'all',
    output: '/root/out.txt'
  }
  expected = new Error(`Cannot write file at ${options.output}`);
  try {
    seo(options);
  } catch (e) {
    tap.equal(e, expected)
  }
  test.done()
})
