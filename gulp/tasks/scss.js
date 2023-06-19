import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { isBuild, isDev } from '../../gulpfile.js';

const sass = gulpSass(dartSass);

const scss = () => {
  return (
    gulp
      .src(filePaths.src.scss, { sourcemaps: isDev })
      .pipe(plugins.handleError('SCSS'))
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(plugins.replace(/@img\//g, '../images/'))
      .pipe(plugins.if(isBuild, groupCssMediaQueries()))
      .pipe(
        plugins.if(
          isBuild,
          webpCss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          })
        )
      )
      .pipe(
        plugins.if(
          isBuild,
          autoPrefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          })
        )
      )
      // .pipe(gulp.dest(filePaths.build.css))
      .pipe(plugins.if(isBuild, cleanCss()))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(filePaths.build.css))
      .pipe(plugins.browserSync.stream())
  );
};

export { scss };