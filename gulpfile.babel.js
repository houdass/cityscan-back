import gulp from 'gulp';

import { exec } from 'child_process';
import CONFIG from './src/config/main';

const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')({ lazy: true });

/* const files = ['config/*.js', 'constants.js', 'models/*.js', 'services/*.js',
  'controllers/*.js', 'routers/*.js', 'app.js']; */
const files = ['./src/**/*.js'];

gulp.task('dev', ['apidoc', 'babel', 'watch'], (cb) => {
  log('*** DEV ENV ***');
  let started = false;
  return $.nodemon({
    script: './build/app.js',
    ext: 'js',
    env: {
      PORT: CONFIG.PORT
    },
    ignore: ['./node_modules/**', 'public/']
  }).on('start', () => {
    console.log('111111111111111');
    if (!started) {
      cb();
      console.log('22222222222');
      started = true;
    }
  });
});

gulp.task('prod', ['uglify', 'apidoc'], (cb) => {
  log('*** PROD ENV ***');
  exec('node ./build/app.js', (err, stdout, stderr) => {
    log(stdout);
    log(stderr);
    cb(err);
  });
});

gulp.task('babel', ['eslint'], () => gulp.src(files, { base: './src' })
.pipe($.babel())
.pipe(gulp.dest('build')));

gulp.task('uglify', ['babel'], () => gulp.src(files.map((file) => `build/${file}`), { base: './build' })
.pipe($.uglify())
.pipe(gulp.dest('build')));

gulp.task('watch', () => {
  // gulp.watch(['**/*.spec.js', '**/*.int.js'], ['test']);
  gulp.watch('./src/routers/**/*.js', ['apidoc']);
  gulp.watch(files, ['eslint', 'babel']);
});

gulp.task('test', () => {
  log('*** RUN TESTS ***');
  $.env({ vars: { ENV: 'test' } });
  gulp.src(['**/*.spec.js', '**/*.integration.js'], { read: true })
  .pipe($.mocha());
});

gulp.task('apidoc', (cb) => {
  log('*** GENERATE APIDOC ***');
  exec('npm run apidoc', (err, stdout, stderr) => {
    startBrowserSync();
    log(stdout);
    log(stderr);
    cb(err);
  });
});

gulp.task('eslint', () => gulp.src(files)
.pipe($.eslint())
// eslint.format() outputs the lint results to the console.
// Alternatively use eslint.formatEach() (see Docs).
.pipe($.eslint.format()));

// Reusable functions

/**
 * Log messages.
 *
 * @param {string} msg - The message to log.
 */
function log(msg) {
  $.util.log($.util.colors.green(msg));
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
    port: CONFIG.PORT_BROWSER_SYNC,
    files: 'public/index.html',
    server: {
      baseDir: './public'
    }
  });
}

// TODO : delete this task
gulp.task('build', ['uglify'], () => gulp.src(files.map((file) => `build/${file}`))
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
