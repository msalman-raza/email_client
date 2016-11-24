const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');
const ts = require('gulp-typescript');
const htmlreplace = require('gulp-html-replace');
const runSequence = require('run-sequence');
const Builder = require('systemjs-builder');
const sourcemaps = require('gulp-sourcemaps');
const embedTemplates = require('gulp-angular-embed-templates');

// CSS
const minifycss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

const tsProject = ts.createProject('tsconfig.json');
const builder = new Builder('', 'systemjs.config.js');

const paths = {
    'js_destination': 'dist/js/',
    'specs': 'specs/',
    'app': 'app/',
    'dist': 'dist/',
    'watch': 'src/**/*.{ts,html}',
    'css_images' : 'resources/sass/img/**/*',
    'css_fonts' : 'resources/fonts/**/*',
    'sass_file': 'resources/sass/app.scss',
    'css_base': 'dist/css/',
}
const vendor_css = [
    'resources/bootstrap/bootstrap.scss',
    'resources/lib/font-awesome.css'
    ]
const file_names = {
    'mainBundleName': 'app.js',
    'vendorBundleName': 'vendor.js',
    'cssBundleName': 'app.css',
    'cssVendorName': 'vendor.css'
}


var watchMode = 0;

gulp.task('default',['dist']);
gulp.task('dist', [ 'bundle:vendor', 'bundle:app','css'] ,function() {
    return true;

});

gulp.task('compile:app', function () {
    var tsResult = tsProject.src()
        .pipe(embedTemplates())
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest("./"));


});
gulp.task('compile:vendor', shell.task([
    'tsc '+paths.app+"vendor.ts"
]));


gulp.task('bundle:vendor', ['compile:vendor','clean:vendor_js'], function () {
    builder
        .buildStatic(paths.app+'vendor.js', paths.js_destination + file_names.vendorBundleName,{ minify: true, sourceMaps: false, encodeNames:false})
        .catch(function (err) {
            console.log('Vendor bundle error');
            console.log(err);
        });
});
gulp.task('bundle:app', ['compile:app','clean:app_js'] , function () {
    if(watchMode){
        builder.reset();
    }
    builder
        .buildStatic(paths.app+'main.js', paths.js_destination + file_names.mainBundleName,{ minify: false, sourceMaps: "inline", encodeNames:false})
        .catch(function (err) {
            console.log('App bundle error');
            console.log(err);
        })
        .then(function(){
            console.log("Bundle complete");
            runSequence('clean:dev', function() {
                done();
            });
        });
    return ;
});


gulp.task('watch',function(){
    watchMode = 1;
    gulp.watch(paths.app+"**/*.ts",['bundle:app']);
    gulp.watch(paths.sass_file,['css:app']);
});


gulp.task('css:setup', function () {
    return gulp.src(vendor_css)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss(file_names.cssVendorName))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.css_base));
});
gulp.task('css:app', function()
{
    return gulp.src(paths.sass_file)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss(file_names.cssBundleName))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.css_base));
});
gulp.task('css',['css:setup','css:app','copy:css_assets']);


gulp.task('copy:css_assets', function(){
    gulp.src([paths.css_images])
        .pipe(gulp.dest(paths.dist+"css/img"));

    return gulp.src([paths.css_fonts])
        .pipe(gulp.dest(paths.dist+"fonts"));
});



gulp.task('clean:vendor_js', function () {
    return del([paths.dist+'**/*.vendor.js', paths.dist+'**/*.vendor.js.map']);
});
gulp.task('clean:app_js', function () {
    return del([paths.dist+'**/*.app.js', paths.dist+'**/*.app.js.map']);
});


gulp.task('clean:js', ['clean:app_js','clean:vendor_js']);
gulp.task('clean:dist',['clean:js'], function () {
    return del(paths.dist+'/index.html');
});


gulp.task('clean:dev', ['clean:ts','clean:spec_js']);
gulp.task('clean:ts', function () {
    return del([paths.app+'**/*.js', paths.app+'**/*.js.map']);
});
gulp.task('clean:spec_js', function () {
    return del([paths.specs+'**/*.spec.js', paths.specs+'**/*.spec.js.map']);
});




