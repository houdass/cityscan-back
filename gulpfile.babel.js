import gulp from 'gulp';

import { exec } from 'child_process';
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')({ lazy: true });
import GULP_CONFIG from './src/config/gulp.config';
import MAIN_CONFIG from './src/config/main.config';

const isDev = process.env.NODE_ENV === MAIN_CONFIG.ENVS.DEV;

gulp.task('dev', ['apidoc', 'babel', 'watch'], () => {
  log(' === DEV ENV ===', 'green');
  return $.nodemon({
    script: './build/app.js',
    ext: 'js',
    ignore: ['./node_modules/**', 'public/'],
    watch: ['build/app.js']
  });
});

gulp.task('prod', ['uglify', 'apidoc'], (cb) => {
  log(' === PROD ENV === ', 'green');
  exec('node ./build/app.js', (err, stdout, stderr) => {
    log(stdout);
    log(stderr);
    cb(err);
  });
});

gulp.task('babel', ['eslint'], () => gulp.src(GULP_CONFIG.SRC_FILES, { base: './src' })
.pipe($.babel())
.pipe(gulp.dest('build')));
console.log('-------->', process.env.PORT)
gulp.task('uglify', ['babel'], () => gulp.src(GULP_CONFIG.BUILD_FILES, { base: './build' })
.pipe($.uglify())
.pipe(gulp.dest('build')));

gulp.task('watch', () => {
  // gulp.watch(['**/*.spec.js', '**/*.int.js'], ['test']);
  gulp.watch(GULP_CONFIG.ROUTES_FILES, ['apidoc']);
  gulp.watch(GULP_CONFIG.SRC_FILES, ['eslint', 'babel']);
});

gulp.task('test', () => {
  log(' === RUN TESTS === ', 'green');
  $.env({ vars: { ENV: MAIN_CONFIG.ENVS.TEST } });
  gulp.src(GULP_CONFIG.TEST_FILES, { read: true })
  .pipe($.mocha());
});

gulp.task('apidoc', (cb) => {
  log(' === GENERATE APIDOC === ', 'blue');
  exec('npm run apidoc', (err, stdout, stderr) => {
    isDev && startBrowserSync();
    log(stdout);
    log(stderr);
    cb(err);
  });
});

gulp.task('eslint', () => gulp.src(GULP_CONFIG.SRC_FILES)
.pipe($.eslint())
.pipe($.eslint.format()));

// Reusable functions

/**
 * Log messages.
 *
 * @param {string} msg - The message to log.
 * @param {string} color - The color of the message.
 */
function log(msg, color = 'red') {
  $.util.log($.util.colors[color](msg));
}

/**
 * Notify function.
 *
 * @param {Object} options - Config options.
 */
function notify(options) {
  const notifier = require('node-notifier');
  notifier.notify(options);
}

/**
 * Start browserSync.
 */
function startBrowserSync() {
  if (browserSync.active) {
    return;
  }

  const msg = {
    title: 'Server Started.',
    message: 'Rest API is ready!',
    sound: true
  };
  notify(msg);

  browserSync.init({
    port: MAIN_CONFIG.PORTS.BROWSER_SYNC,
    files: 'public/index.html',
    server: {
      baseDir: './public'
    }
  });
}

// TODO : delete this task
gulp.task('build', ['uglify'], () => gulp.src(GULP_CONFIG.BUILD_FILES)
  .pipe($.sourcemaps.init())
  .pipe($.concatJs({
    target: 'build.js', // Name to concatenate to
    entry: './build/app.js' // Entrypoint for the application, main module
                         // The `./` part is important! The path is relative to
                         // whatever gulp decides is the base-path, in this
                         // example that is `./lib`
  }))
  .pipe($.sourcemaps.write())
  .pipe($.uglify())
  .pipe(gulp.dest('./build')));
