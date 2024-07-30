function fileNameChange() {
  const now = new Date();
  const formattedFileName = `profile${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;

  return formattedFileName;
}

export default fileNameChange;
