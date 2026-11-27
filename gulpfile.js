const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ffmpeg = require('ffmpeg-static');
const { execFile } = require('child_process');
const fs = require('fs');
const uglify = require("gulp-uglify");

function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({style: 'compressed'}))
        .pipe(gulp.dest('./dist/css'));
}

async function comprimeImagens() {
    const { default: imagemin } = await import('gulp-imagemin');

    return gulp.src('./src/images/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function comprimeVideo(cb) {
    fs.mkdirSync('./dist/video', { recursive: true });

    execFile(ffmpeg, [
        '-y',
        '-i', './src/video/video-de-entrada.mp4',
        '-c:v', 'libx264',
        '-crf', '26',
        '-preset', 'medium',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        './dist/video/video-de-entrada.mp4'
    ], cb);
}

exports.default = gulp.parallel(styles, scripts);
exports.images = comprimeImagens;
exports.video = comprimeVideo;

exports.watch = function() {
    gulp.watch('./src/styles/**/*.scss', styles);
    gulp.watch('./src/scripts/**/*.js', scripts);
};

exports.full = gulp.parallel(styles, scripts, comprimeImagens, comprimeVideo);