const gulp = require('gulp');
const each = require('gulp-each');

gulp.task('compile:bookmarklet', () =>
  gulp.src('./index.html')
    .pipe(each((content, file, callback) => {
        const output = `data:text/html;base64,${new Buffer(content).toString('base64')}`;
        callback(null, output)
    }))
    .pipe(gulp.dest('./bookmarklet'))
);
