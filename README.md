# seo-rules

A [Node.js](https://nodejs.org/) module for validating html

## Module

Supports the following rules
1. Detect if there are any ```<img />``` tags without alt attribute
2. Detect if there are any ```<a />``` tags without rel attribute
3. In ```<head></head>``` tag
   - Detect if there is any header that doesn’t have ```<title></title>``` tag
   - Detect if there is any header that doesn’t have ```<meta name="descriptions" ... />``` tag
   - Detect if there is any header that doesn’t have ```<meta name="keywords" ... />``` tag
4. Detect if there are more than 15 ```<strong></strong>``` tag in HTML (15 is a value should be configurable by user)
5. Detect if a HTML have more than one ```<h1></h1>``` tag.

### Installation

#### From npm

comming soon

#### From GitHub

```sh
$ npm install git+ssh://git@github.com:x1tret/seo-rules.git
```

or

```sh
$ npm install git+https://git@github.com:x1tret/seo-rules.git
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

result = validator(options);
console.log(result);

```

#### Some rules

```JavaScript
const validator = require('seo-rules')
const options = {
  format: 'html',
  path:'test/data/valid.html',
  rules: ['strong','header_meta']
}

result = validator(options);
console.log(result);

```

#### Change option value

```JavaScript
const validator = require('seo-rules')
const options = {
  format: 'html',
  path:'test/data/invalid.html',
  rules: [{name:'strong', option:20}]
}

result = validator(options);
console.log(result);

```

## License

[MIT](LICENSE)