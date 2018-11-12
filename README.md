# enquirer-compat

![](https://flat.badgen.net/travis/g-plane/enquirer-compat)

This package helps you switch from Inquirer to Enquirer without heavy code changes.

## Usage

Install it:

```
npm i enquirer-compat
```

Change your code like this:

```diff
- const inquirer = require('inquirer')
+ const inquirer = require('enquirer-compat')
```

**Don't forget to test your code after that.**

## Known Issues

Not all features of Inquirer are supported or implemented in Enquirer.

- NOT supports `rawlist`, `expand`, `checkbox`, `editor` prompts.
- NOT supports separator.
- NOT supports option `pageSize`.

## License

MIT License (c) 2018-present Pig Fang
