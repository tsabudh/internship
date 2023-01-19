const browserSync = require("browser-sync");
const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const localServer = require("browser-sync").create();
const plumber = require("gulp-plumber");

// Define paths for html files
const paths = {
  scripts: {
    src: "./dev/scripts/*.js",
    dest: "./dist/scripts/",
  },
  styles: {
    src: "dev/scss/*.scss",
    dest: "dist/css/",
  },
  images: {
    src: "dev/images/**/*",
    dest: "dist/images",
  },
};

//create funtion to transfer images from dev to dist
exports.scripts = function scripts() {
  return gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
};

// Copy fonts to dist
exports.fonts = function fonts() {
  return gulp.src(["dev/fonts/**/*"]).pipe(gulp.dest("dist/fonts"));
};

//Create a function for gulp file includes
function includeHTML() {
  return gulp
    .src("./dev/**/*.html")
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest("./dist"))
    .pipe(localServer.stream());
}

//Compile scss into css
function style() {
  return (
    gulp
      // 1. where is my scss file
      .src(paths.styles.src)
      // 2. pass that file through sass compiler
      .pipe(sass().on("error", sass.logError))
      // 3. where do I save the compiled CSS?
      .pipe(gulp.dest(paths.styles.dest))
      // 4. stream changes to all browser
      .pipe(localServer.stream())
  );
}

//create funtion to transfer images from dev to dist
function images() {
  return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
}

function watch() {
  localServer.init({
    server: {
      baseDir: "./dist/",
    },
  });
  gulp.watch("./dev/scss/**/*.scss", style);
  gulp.watch("./dev/*.css", localServer.reload);

  // gulp.watch('./dev/**/*.html',).on('change', localServer.reload);
  gulp
    .watch("dev/**/*.html", includeHTML)
    .on("change", () => localServer.reload());
  gulp.watch("./dev/images/", images).on("change", localServer.reload);
}

exports.watch = watch;
