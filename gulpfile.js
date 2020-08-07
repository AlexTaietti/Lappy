const gulp       = require('gulp');
const sass       = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const babel      = require('gulp-babel');
const BS         = require('browser-sync').create();

function compileScss () {

    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(gulp.dest('./dist/css'));

}

function compileJs () {

    return gulp.src('./src/es/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(gulp.dest('./tmp/js'));

}

gulp.task('serve', function () {

  BS.init({ server: './dist' });

  gulp.watch('./dist/**').on('change', BS.reload);

});

gulp.watch('./src/scss/*.scss', compileScss);
gulp.watch('./src/es/*.js', compileJs);

gulp.task(compileScss);
gulp.task(compileJs);
