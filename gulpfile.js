const gulp = require("gulp");
const zip = require("gulp-zip");
const del = require("del");

const extractExtensionData = () => {
  const extPackageJson = require("./src/assets/manifest.json");
  return extPackageJson.version;
};

gulp.task("zip", (cb) => {
  const version = extractExtensionData();
  const zipFilename = `package-v${version}.zip`;

  del(zipFilename);

  gulp.src("public/**").pipe(zip(zipFilename)).pipe(gulp.dest("./zip"));

  cb();
});
