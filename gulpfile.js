import gulp from 'gulp';
import { filePaths } from './gulp/config/paths.js';
import { plugins } from './gulp/config/plugins.js';

import { copy } from './gulp/tasks/copy.js';
import { copyRootFiles } from './gulp/tasks/copyRootFiles.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import { createSvgSprite } from './gulp/tasks/createSvgSprite.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: filePaths,
  gulp,
  plugins,
};

const isBuild = process.argv.includes('--build');
const isDev = !process.argv.includes('--build');

const watcher = () => {
  gulp.watch(filePaths.watch.static, copy);
  gulp.watch(filePaths.watch.html, html);
  gulp.watch(filePaths.watch.scss, scss);
  gulp.watch(filePaths.watch.js, js);
  gulp.watch(filePaths.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

const devTasks = gulp.parallel(copy, copyRootFiles, html, scss, js, images);


const mainTasks = gulp.series(fonts, devTasks);


const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(mainTasks);

gulp.task('default', dev);


export { dev, build, createSvgSprite, isBuild, isDev, reset, images };