const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel       = require('gulp-babel');
const autoprefix  = require('gulp-autoprefixer');


function style() {

    return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefix())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}


function script() {
    
    return gulp.src('src/es/*.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('src/js'));

}


function watch() {
    
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });
    
    gulp.watch('src/scss/*.scss', style);
    gulp.watch('src/es/*.js').on('change', script);

    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('dist/js/*.js').on('change', browserSync.reload);

}


exports.script = script;
exports.style  = style;
exports.watch  = watch;