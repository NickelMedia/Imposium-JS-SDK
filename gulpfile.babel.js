'use strict';

import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import sourceMaps from 'gulp-sourcemaps';
import LessPluginAutoprefix from 'less-plugin-autoprefix';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';

const config = {
    relSrc: 'docs/less',
    src: __dirname + '/docs/less',
    out: __dirname + '/docs/www',
};

const paths = {
    in: {
        lessDir: config.src,
        lessEntry: config.src + '/styles.less',
        lessGlob: config.relSrc + '/**'
    },
    out: {
        cssDir: config.out
    }
};

const watchOpts = {};
 
gulp.task('compile-less', () => {
    return gulp.src(paths.in.lessEntry)
        .pipe(sourceMaps.init())
        .pipe(less({
            paths: [paths.in.lessDir],
            ieCompat: false,
            relativeUrls: true,
            plugins: [
                new LessPluginAutoprefix({browsers: ['last 3 versions']}),
                require('less-plugin-glob')
            ]
        }))
        .on('error' ,function(err){
            gutil.log(err);
            this.emit('end');
        })
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(concat('imposium-theme.css'))
        .pipe(cleanCSS({keepSpecialComments: 0}))
        .pipe(sourceMaps.write("."))
        .pipe(gulp.dest(paths.out.cssDir));
});

gulp.task('default', ['watch']);

gulp.task('build', () => { runSequence(['compile-less']); });

gulp.task('watch', ['build'], () => {
    gulp.watch(paths.in.lessGlob, watchOpts, () => { runSequence('compile-less'); });
});

