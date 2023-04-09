// instanciando as variaveis
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Compilando o sass e adicionando o autoprefixer e dando realod na pagina
function compilaSass() {
  return gulp
    .src('scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// tarefa do sass
gulp.task('sass', compilaSass);

// function de plugins css
function pluginsCSS() {
  return gulp
    .src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// tarefa dos plugins css
gulp.task('plugincss', pluginsCSS);

// funcao gulp-concat
function gulpJs() {
  return gulp
    .src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

gulp.task('alljs', gulpJs);

// function de plugins js
function pluginsJs() {
  return gulp
    .src(['./js/lib/axios.min.js', './js/lib/swiper.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// tarefa dos plugins js
gulp.task('pluginjs', pluginsJs);

// funcao do browser-sync
function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
    online: true,
    tunnel: true,
    tunnel: 'teste-donay',
    logLevel: 'debug',
  });
}

//tarefa do broser-sync
gulp.task('browser-sync', browser);

//funcao do watch pra alteracoes em scss e html
function watch() {
  gulp.watch('scss/*.scss', compilaSass);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/scripts/*js', gulpJs);
  gulp.watch('js/lib/*.js', pluginsJs);
  gulp.watch('css/lib/*.css', pluginsCSS);
}

// tarefa do watch
gulp.task('watch', watch);

// tarefa gulp pra iniciar tudo
gulp.task(
  'default',
  gulp.parallel(
    'watch',
    'browser-sync',
    'sass',
    'plugincss',
    'alljs',
    'pluginjs',
  ),
);
