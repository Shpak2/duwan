const gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require("gulp-sass"),
    sourcemaps = require('gulp-sourcemaps'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    rigger = require('gulp-rigger'),
    plumber = require('gulp-plumber'),
    htmlValidator = require('gulp-w3c-html-validator'),
    watch = require("gulp-watch"),
    uglify = require("gulp-uglify"),
    removeComments = require('gulp-strip-css-comments'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      },
      notify: false
  });
});


gulp.task('build:html', function() {
return gulp.src('src/**/*.html')
  .pipe(plumber())
  .pipe(htmlValidator())
  .pipe(rigger())
  .pipe(gulp.dest('build'))
  .on('end',browserSync.reload);
});

gulp.task('sass-compile', function() {
    return gulp.src('src/scss/main.sass')
    .pipe(sourcemaps.init())
    .pipe(removeComments())
    .pipe(sass())
    .pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .on("error", notify.onError({
      title: "style error"
    }))
    .pipe(concat('style.css'))
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    // .pipe(gulp.dest('e-szkielko/assets/css'))
    // .pipe(gulp.dest('c:/openserver/OpenServer/domains/szkielko/wp-content/themes/e-szkielko/assets/css'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('jqueryScripts', function() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('swiperScripts', function() {
  return gulp.src('node_modules/swiper/swiper-bundle.min.js')
  .pipe(concat('swiper.min.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('swiperStyle', function() {
  return gulp.src('node_modules/swiper/swiper-bundle.min.css')
  .pipe(concat('swiper.min.css'))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('mainScript', function() {
  return gulp.src('src/js/**/*.js')
  .pipe(plumber())
  .pipe(concat('main.js'))
  .pipe(removeComments())
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  // .pipe(gulp.dest('e-szkielko/assets/js'))
  // .pipe(gulp.dest('c:/openserver/OpenServer/domains/szkielko/wp-content/themes/e-szkielko/assets/js'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task("fonts:build", function() {
  return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task("image:build", function() {
  return gulp.src('src/img/**/*.*')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true
    }))
    .pipe(gulp.dest('build/img'))
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.html',gulp.series('build:html'));
  gulp.watch('src/scss/**/*.sass',gulp.series('sass-compile'))
  gulp.watch('src/js/**/*.js',gulp.series('mainScript'));
  gulp.watch('src/fonts/**/*.*',gulp.series('fonts:build'));
  gulp.watch('src/img/**/*.*',gulp.series('image:build'));
});

gulp.task('default',gulp.series(
  gulp.parallel('build:html','sass-compile','jqueryScripts','swiperScripts','swiperStyle','mainScript','fonts:build','image:build'),
  gulp.parallel('watch','serve')
  ));