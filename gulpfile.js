const gulp = require('gulp');
const exec = require('child_process').exec;
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')({ lazy: true });
const config = require('./config/main');

gulp.task('start', ['apidoc', 'eslint'], () => {
    log('*** Start Project ***');
    $.nodemon({
        script: './app.js',
        ext: 'js',
        env: {
            PORT: config.portNodemon
        },
        ignore: ['./node_modules/**']
    }).on('start', () => {
        startBrowserSync();
    });
});


gulp.task('test', () => {
    log('*** Start tests ***');
    $.env({ vars: { ENV: 'test' } });
    gulp.src(['**/*.spec.js', '**/*.integration.js'], { read: true })
        .pipe($.mocha());
});

gulp.task('apidoc', (cb) => {
    log('*** Start apidoc ***');
    exec('npm run apidoc', (err, stdout, stderr) => {
        log(stdout);
        log(stderr);
        cb(err);
    });
});

gulp.task('eslint', () => gulp.src(['**/*.js', '!node_modules/**', '!public/**'])
        .pipe($.eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe($.eslint.format()));

// Watchers
gulp.watch(['**/*.spec.js', '**/*.int.js'], ['test']);
gulp.watch(['./routers/**/*.js'], ['apidoc']);
gulp.watch(['**/*.js', '!node_modules/**', '!public/**'], ['eslint']);

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
        port: config.portBrowserSync,
        files: 'public/index.html',
        server: {
            baseDir: './public'
        }
    });
}


