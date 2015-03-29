# Ranza

> The npm butler

Search all your requires in the project and manages what is missing in `package.json` file. Or rather: Search for unidentified dependencies in `package.json` and notifies you.

A ranza **status** commad example:

![Ranza Status](docs/images/status.gif)

A ranza **watch** command example:

![Ranza Watch](docs/images/watch.gif)

## Install

Before anything, you need to have [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.

```sh
$ npm install -g ranza
```

## Usage

#### Status

Run in folder root to get the status from all dependencies in `package.json`

```sh
$ ranza status
```

#### Install

Search and install all dependencies requires in all files without save:

```sh
$ ranza install
```

Search and install all dependencies requires in all files and save as `dependencies` in `package.json`:

```sh
$ ranza install --save
```

Search and install all dependencies requires in all files and save as `devDependencies` in `package.json`:

```sh
$ ranza install --save-dev
```

#### Clean

Remove and clean all unused dependencies from `package.json`

```sh
$ ranza clean
```

#### Watch

**(not recommended)**

> Cause: Install all dependencies in each livereload

Livereload in all files, installing undefined dependencies without save:

```sh
$ ranza watch
```
 
**(recommended)**

> Cause: Only install missed dependencies in each livereload

Livereload in all files, installing undefined dependencies and saving as `dependencies` in `package.json`:

```sh
$ ranza watch --save
```

Livereload in all files, installing undefined dependencies and saving as `devDependencies` in `package.json`:

```sh
$ ranza watch --save-dev
```

## History

See [Changelog](docs/changelog.md) for more details.

## Contributing

Don't be shy, send a Pull Request

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## About

**License:** MIT ® [Raphael Amorim](https://github.com/raphamorim)
