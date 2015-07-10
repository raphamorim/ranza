# Ranza

> The dependency checker

[![NPM Version](https://img.shields.io/npm/v/express.svg?style=flat)](https://www.npmjs.org/package/ranza)
[![Build Status](https://travis-ci.org/raphamorim/ranza.svg)](https://travis-ci.org/raphamorim/ranza)

Quickly spot any dependency required in the project and not listed in `package.json`. And also the other way around: quickly remove listed dependencies that are not being used.

# Why use ranza?

Avoid accumulation of dependencies that are not being used.

## Getting Started

With [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed, install ranza with a single command.

##### As CLI

```sh
$ npm install -g ranza
```

##### As Node Module

```sh
$ npm install ranza
```

## CLI Usage

#### Status

Checks all project for required dependencies and confirms if they are listed on `package.json`:

```sh
$ ranza status
```

You can use status with debug option as arguments, to best view requires status showing the occurrence files, ex:

**input:**

```sh
$ ranza status --debug
```

**some output example:**

```sh
Defined and used:
  • babel-core
     => lib/new.js

  • bluebird
     => core/src/comparer.js
     => core/src/manager.js
     => core/src/sentinel.js

Defined, but unused:
  • grunt
  • babel
```

#### Install

Installs all dependencies required throughout the project, but do not save them in `package.json`:

```sh
$ ranza install
```

Installs all dependencies required throughout the project and add them to `package.json` as `dependencies`:

```sh
$ ranza install --save
```

Installs all dependencies required throughout the project and save them in `package.json` as `devDependencies`:

```sh
$ ranza install --save-dev
```

#### Clean

Remove and clean all unused dependencies from `package.json`:

```sh
$ ranza clean
```

## Node Module Usage

You can check the dependencies status using:

```javascript
var ranza = require('ranza');

ranza.status(function(status) {
	/* 
	status = { 
		undefinedUsed: [], 
		definedUnused: [ 'ejs'], 
		definedUsed: [ 'express', 'kenobi' ] 
	}
	*/

	console.log(status)
});
```

## History

See [Changelog](docs/changelog.md) for more details.

## Contributing

Don't be shy, send a Pull Request! Here is how:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## About

**License:** MIT ® [Raphael Amorim](https://github.com/raphamorim)
