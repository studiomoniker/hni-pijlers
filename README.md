# HNI Web Cover Boilerplate

> A boilerplate for developing web covers for hetnieuweinstituut.nl

## Boilerplate Features

- Uses [Gulp](http://gulpjs.com/) for building
- Automatically transpiles ES6+ javascript using [Babel](https://babeljs.io/)
- Uses [SASS](http://sass-lang.com/) for CSS
- Produces [vendor prefixed](http://webdesign.about.com/od/css/a/css-vendor-prefixes.htm) CSS using [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Inlines](https://www.npmjs.com/package/gulp-inline-source) minified javascript and css when deploying
- Displays javascript and sass errors as osx notifications during development.
- Watches for changes to your source files and recompiles the cover automatically
- Javascript is included at the bottom of the page, so there is no need to wait for [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) events (That's `$(document).ready()` for jQuery users).

## Required Dependencies

To use this boilerplate, your machine needs to have Node.js and Gulp installed:

- Install [Node.js](https://nodejs.org/en/download/)
- In Terminal.app install Gulp: `npm install --global gulp`

## Boilerplate Installation

1. To download the boilerplate click on `Download ZIP`  or clone this git repository.
2. Open Terminal.app and go to the cover directory: `cd /path/to/cover/directory` or drag the cover folder onto the Terminal icon.
4. Run `npm install` to install the necessary dependencies
5. Run `gulp` to build the cover
6. The `dist` directory now contains the built web cover!

## Usage

- Whenever you work on the cover, open up a Terminal window, cd to the cover directory (as explained in installation) and run the `gulp` command to start building the files. This will concatenate the javascript files to a single javascript file and convert the SASS code to vendor-prefixed css. It will rebuild automatically, whenever a file is edited.
- Drag `/dist/index.html` to a browser to see what it produced.
- To create the zip file to send to The New Institute, run `gulp package`

## Locations

- All files located in `assets` will be automatically copied to `dist` (don't keep your files in the `dist` directory)
- `index.html` is located in `assets`
- SASS is located in `/style`. The main entry point is `main.scss`. This is built to `/dist/style.css`
- Javascript is located in `/src`. The main entry point is `app.js`. This is built to `/dist/app.js`
- By default we import `/src/message.js`, which is used to make the cover clickable on the homepage, to send users to the web magazine.
- Proxy images are located in `/other`. Edit the `settings.ini` file to point to the correct filenames (!)

## Misc

- Don't want your code inlined, when running `gulp package`? Remove the two `inline` attributes from `/src/index.html`
