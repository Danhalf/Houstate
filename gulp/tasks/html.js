import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';
import gulpHtmlImgWrapper from 'gulp-html-img-wrapper';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';

const html = () => {
  return gulp
    .src(filePaths.src.html)
    .pipe(plugins.handleError('HTML'))
    .pipe(fileInclude())
    .pipe(plugins.replace(/@img\//g, 'images/'))
    // .pipe(
    //   gulpHtmlImgWrapper({
    //     extensions: ['.jpg', '.png', '.jpeg'], // write your own extensions pack (case insensitive)
    //   })
    // )
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        collapseWhitespace: app.isBuild,
        removeComments: app.isBuild,
      })
    )
    .pipe(
      plugins.if(
        app.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(gulp.dest(filePaths.build.html))
    .pipe(plugins.browserSync.stream());
};

export { html };