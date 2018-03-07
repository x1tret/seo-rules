# seo-rules

A [Node.js](https://nodejs.org/) module for validating html

## Module

Supports the following rules
1. Detect if there are any <img /> tags without alt attribute
2. Detect if there are any <a /> tags without rel attribute
3. In <head> tag
  i. Detect if there is any header that doesn’t have <title> tag
  ii. Detect if there is any header that doesn’t have <meta name=“descriptions” ... /> tag
  iii. Detect if there is any header that doesn’t have <meta name=“keywords” ... /> tag
4. Detect if there are more than 15 <strong> tag in HTML (15 is a value should be configurable by user)
5. Detect if a HTML have more than one <H1> tag.

### Installation

#### From GitHub

```sh
$ git clone git@github.com:x1tret/seo-rules.git
```

Then cd into directory and run the setup script

```sh
$ npm run setup
```

### Usage

Create an options object.

**format** This is the formatting of the input data. It supports A HTML file or Node Readable Stream.

**path** In case format is A HTML file, you need input this option.

**rules** You can use "all" to check all supported rules or you can also use array.

#### All rules

```JavaScript
const validator = require('seo-rules')
const options = {
  format: 'html',
  path:'test/data/valid.html',
  rules: 'all'
}

try {
  result = validator(options);
  console.log(result);
} catch (e) {
  console.log(e.message);
}

```

#### Some rules

```JavaScript
const validator = require('seo-rules')
const options = {
  format: 'html',
  path:'test/data/valid.html',
  rules: ['strong','header_meta']
}

try {
  result = validator(options);
  console.log(result);
} catch (e) {
  console.log(e.message);
}

```

#### Change option value

```JavaScript
const validator = require('seo-rules')
const options = {
  format: 'html',
  path:'test/data/invalid.html',
  rules: [{name:'strong', option:20}]
}

try {
  result = validator(options);
  console.log(result);
} catch (e) {
  console.log(e.message);
}

```

## License

[MIT](LICENSE)