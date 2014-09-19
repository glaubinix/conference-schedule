var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var templatizer = require('templatizer');
var through = require('through');
var gutil = require('gulp-util');
var rev = require('gulp-rev');
var replace = require('gulp-replace');
var fs = require('fs');
var path = require('path');
var url = require('url');

var config = require('./config');

gulp.task('clean', function () {
    return gulp.src(['./build'])
        .pipe(clean());
});


gulp.task('clean-css', function () {
    return gulp.src(['./build/*.css'])
        .pipe(clean());
});

gulp.task('css', ['clean-css'], function() {
    var cssFiles = ['./css/normalize.css', './css/main.css'];
    if (config.theme !== 'hot-pink') {
        cssFiles.push('./css/themes/' + config.theme + '.css');
    }

    gulp.src(cssFiles)
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest('./build'));
});

gulp.task('clean-js', function () {
    return gulp.src(['./build/*.js'])
        .pipe(clean());
});

gulp.task('templates', function () {
    gulp.src('templates')
        .pipe(
            through(
                function() {},
                function() {
                    this.emit('data', new gutil.File({
                        contents: new Buffer(templatizer('templates')),
                        path: 'templates.js'
                    }));
                    this.emit('end')
                }
            )
        )
        .pipe(gulp.dest('./js'));
});

gulp.task('browserify', ['clean-js', 'templates'], function () {
    var browserified = transform(function(filename) {
        return browserify(filename).bundle();
    });

    return gulp.src(['./js/app.js'])
        .pipe(browserified)
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./build'));
});

gulp.task('data', function() {
    if (config.schedule_loader.type !== 'json') {
        return;
    }

    var parsed = url.parse(config.schedule_loader.url);
    if (parsed.path !== parsed.href) {
        return;
    }

    gulp.src(config.schedule_loader.url)
        .pipe(gulp.dest('build/' + path.dirname(config.schedule_loader.url)));
});

gulp.task('html', ['css', 'browserify'], function() {

    var files = fs.readdirSync('./build'),
        css,
        norm,
        js;
    for (var i in files) {
        if (path.extname(files[i]) == '.js') {
            js = files[i];
        } else if (path.extname(files[i]) == '.css') {
            css = files[i];
        }
    }

    gulp.src('index.html')
        .pipe(replace(/css\/main\.css/g, css))
        .pipe(replace(/css\/normalize\.css/g, ''))
        .pipe(replace(/js\/app\.js/g, js))
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['html', 'data'], function() {

});

gulp.task('default', ['build'], function() { });
