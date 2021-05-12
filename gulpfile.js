const gulp = require(`gulp`);

const plumber = require(`gulp-plumber`);
const del = require(`del`);
const rename = require(`gulp-rename`);
const sourcemaps = require(`gulp-sourcemaps`);
const server = require(`browser-sync`).create();

const sass = require(`gulp-sass`);
sass.compiler = require(`node-sass`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const mqpacker = require(`css-mqpacker`);
const minify = require(`gulp-csso`);

const imagemin = require(`gulp-imagemin`);
const svgstore = require(`gulp-svgstore`);

const rollup = require(`gulp-better-rollup`);

gulp.task(`style`, () => {
  return gulp.src(`sass/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: [
          `last 1 version`,
          `last 2 Chrome versions`,
          `last 2 Firefox versions`,
          `last 2 Opera versions`,
          `last 2 Edge versions`
        ]
      }),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest(`build/css`))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`build/css`));
});

gulp.task(`sprite`, () => {
  return gulp.src(`img/sprite/*.svg`)
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename(`sprite.svg`))
  .pipe(gulp.dest(`build/img`));
});

gulp.task(`imagemin`, () => {
  return gulp.src(`build/img/**/*.{jpg,png,gif}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
    ]))
    .pipe(gulp.dest(`build/img`));
});

gulp.task(`scripts`, () => {
  return gulp.src(`js/main.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, `iife`))
    .pipe(sourcemaps.write(``))
    .pipe(gulp.dest(`build/js/`))
    .pipe(server.stream());
});

gulp.task(`copy-html`, () => {
  return gulp.src(`*.html`)
    .pipe(gulp.dest(`build`))
    .pipe(server.stream());
});

gulp.task(`copy-base`, () => {
  return gulp.src([
    `fonts/**/*.{woff,woff2}`,
    `img/*.*`,
    `*.ico`
  ], {base: `.`})
    .pipe(gulp.dest(`build`));
});

gulp.task(`copy`, gulp.series(`copy-base`, `copy-html`, `scripts`, `style`, `sprite`));

gulp.task(`clean`, () => {
  return del(`build`);
});

gulp.task(`assemble`, gulp.series(`clean`, `copy`, `style`));

gulp.task(`build`, gulp.series(`assemble`, `imagemin`));

gulp.task(`serve`, () => {
  server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch(`sass/**/*.{scss,sass}`, gulp.series(`style`));
  gulp.watch(`*.html`).on(`change`, gulp.series(`copy-html`));
  gulp.watch(`js/**/*.js`, gulp.series(`scripts`));
});


gulp.task(`test`, (done) => {
  done();
});
