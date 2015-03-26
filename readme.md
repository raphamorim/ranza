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

#### Status (stable)

Status from all dependencies in `package.json`

```sh
$ ranza status
```

#### Install (unstable)

Search and Install unidentified dependencies in `package.json`:

```sh
$ ranza install
```

Search and Install unidentified dependencies in `package.json` as devDependencies:

```sh
$ ranza install dev
```


## About

**License:** MIT ® [Raphael Amorim](https://github.com/raphamorim)