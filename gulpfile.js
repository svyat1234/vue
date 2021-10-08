const gulp = require("gulp");
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const sass = require('gulp-sass')(require('sass'));

const dist = "C:/OSPanel/domains/vue/admin"

gulp.task("copy-html", () => {
   return gulp.src("./app/src/index.html")
   .pipe(gulp.dest(dist));
});
gulp.task("copy-api", () => {
   return gulp.src("./app/api/**/*.*")
   .pipe(gulp.dest(dist + "/api"));
});

gulp.task("build-js", () => {
   return browserify('./app/src/main.js', {debug: true})
      .transform("babelify", {presets: ["@babel/preset-env"], sourceMap: true})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(dist))
});

gulp.task("build-sass", () => {
   return gulp.src('./app/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(dist));
});