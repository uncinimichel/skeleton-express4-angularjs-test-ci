var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    usemin = require('gulp-usemin'),
    ngmin = require('gulp-ngmin'),
    rev = require('gulp-rev');

var paths = {
    bower: 'app/bower_components',
    bootstrap: 'app/bower_components/bootstrap-sass-official/assets',
    fontawesome: this.bower + '/fontawesome'
};

gulp.task('CompileScss', function () {
    return gulp.src(['app/styles/**/*.scss'])
        .pipe(sass({
            style: 'expanded',
            loadPath: [
                'app/styles/**/*.scss',
                paths.bootstrap + '/stylesheets',
                paths.fontawesome + '/fontawesome/scss'
            ]
        }))
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe(notify({ message: 'CompileScss task complete' }));
})
;

gulp.task('CompileFonts', function () {
    return gulp.src([paths.bootstrap + '/fonts/**/*', paths.fontawesome + '/fonts/**/*'])
        .pipe(gulp.dest('app/fonts'))
        .pipe(notify({ message: 'CompileFonts task complete' }));
});

gulp.task('CompileImages', function () {
    return gulp.src(['app/images/**/*', paths.bootstrap + '/images/**/*'])
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('app/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('UseminHTML', function () {
    gulp.src(['app/index.html'])
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            js: [rev()]
        }))
        .pipe(gulp.dest('dist/public'));
});

gulp.task('MoveFonts', function () {
    return gulp.src(['app/fonts/**/*'])
        .pipe(gulp.dest('dist/public/fonts'))
        .pipe(notify({ message: 'moveFonts task complete' }));
});

gulp.task('MoveImages', function () {
    return gulp.src(['app/images/**/*'])
        .pipe(gulp.dest('dist/public/images'))
        .pipe(notify({ message: 'moveFonts task complete' }));
});

gulp.task('MoveComponentHTML', function () {
    return gulp.src(['app/components/**/*.html'])
        .pipe(gulp.dest('dist/public/components'))
        .pipe(notify({ message: 'MoveComponentHTML task complete' }));
});

gulp.task('MoveViewsHTML', function () {
    return gulp.src(['app/views/**/*.html'])
        .pipe(gulp.dest('dist/public/views'))
        .pipe(notify({ message: 'MoveViewsHTML task complete' }));
});


gulp.task('nodejsRootFiles', function () {
    return gulp.src(['package.json', 'server.js'])
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'nodejsRootFiles task complete' }));
});

gulp.task('nodejsFiles', function () {
    return gulp.src(['server/**/*.js'])
        .pipe(gulp.dest('dist/server'))
        .pipe(notify({ message: 'nodejsFiles task complete' }));
});

gulp.task('ScriptsNodejs', ['nodejsRootFiles', 'nodejsFiles']);

gulp.task('clean', function (cb) {
    del(['dist'], cb)
});

// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scriptsFrontEnd']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('build', ['clean', 'CompileScss', 'CompileFonts', 'CompileImages'], function () {
    gulp.start('UseminHTML', 'MoveComponentHTML', 'MoveViewsHTML', 'MoveImages', 'MoveFonts', 'ScriptsNodejs');
});

