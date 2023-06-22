import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const { src, dest } = gulp;

const createSvgSprite = () => {
  return src(`${filePaths.src.svg}`)
    .pipe(plugins.handleError('SVG'))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            example: true,
          },
        },
      })
    )
    .pipe(dest(`${filePaths.build.images}`));
};

export { createSvgSprite };