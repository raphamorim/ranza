# Ranza (UNSTABLE)

> The npm butler

Search all your requires in the project and manages what is missing in `package.json` file. Or rather: Search for unidentified dependencies in `package.json` and notifies you

Don't be shy, send a Pull Request :)

## Install

Before anything, you need to have [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.

```sh
$ npm install -g ranza
```

## Usage

Status from all dependencies in `package.json`

```sh
$ ranza [path]
```

Search and Install unidentified dependencies in `package.json`:

```sh
$ ranza [path] install
```

Search and Install unidentified dependencies in `package.json` in devDependencies:

```sh
$ ranza [path] install dev
```

## Options

    ranza [options]

    Options:

        -h, --help                output usage information
        -v, --version             output the version number


## About

**License:** MIT ® [Raphael Amorim](https://github.com/raphamorim)