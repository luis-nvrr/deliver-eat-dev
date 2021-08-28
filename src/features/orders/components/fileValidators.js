export function checkIfFilesAreTooBig(files) {
  console.log(files);
  let valid = true;
  if (files) {
    files.forEach((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    });
  }

  return valid;
}

export function checkIfFilesAreCorrectType(files) {
  let valid = true;
  if (files) {
    files.forEach((file) => {
      if (!['image/jpeg'].includes(file.type)) {
        valid = false;
      }
    });
  }

  return valid;
}
