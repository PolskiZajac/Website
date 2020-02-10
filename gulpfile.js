const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');


gulp.task('assets', function() {
  return gulp.src('app/img/**/*')
    .pipe(gulp.dest('img/'));
});

gulp.task('vendors', function() {
  return gulp.src('app/vendors/**/*')
    .pipe(gulp.dest('vendors/'));
});

gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest('js/'));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({'outputStyle': 'compressed'}))
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest('css/'))
});

gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('.'));
});

gulp.task('porty-scss', function() {
  return gulp.src('app/porty/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({'outputStyle': 'compressed'}))
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest('porty/css/'))
});

gulp.task('porty-js', function() {
  return gulp.src('app/porty/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest('porty/js/'));
});

gulp.task('porty-img', function() {
  return gulp.src('app/porty/img/**/*.webp')
    .pipe(gulp.dest('porty/img/'))
});


gulp.task('serve', gulp.series('sass', 'scripts', 'assets', 'vendors', 'html', function() {
  gulp.watch('app/scss/**/*', gulp.series('sass'));
  gulp.watch('app/js/**/*.js',  gulp.series('scripts'));
  gulp.watch('app/img/**/*', gulp.series('assets'));
  gulp.watch('app/vendors/**/*', gulp.series('vendors'));
  gulp.watch('app/**/*.html', gulp.series('html'));
}));

gulp.task('porty', gulp.series('html', 'porty-scss', 'porty-js', 'porty-img', function() {
  gulp.watch('app/porty/scss/**/*', gulp.series('porty-scss'));
  gulp.watch('app/porty/js/**/*.js',  gulp.series('porty-js'));
  gulp.watch('app/porty/img/**/*', gulp.series('porty-img'));
  gulp.watch('app/**/*.html', gulp.series('html'));
}));

gulp.task('build', gulp.series('sass', 'scripts', 'assets', 'vendors', 'html'));
gulp.task('serve', gulp.series('serve'));
gulp.task('default',gulp.series('sass', 'scripts', 'assets', 'vendors', 'html'));
