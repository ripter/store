// from: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
export const getValueAtPath = (obj, path, defaultValue = null) =>
  String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((a, c) => (Object.hasOwnProperty.call(a,c) ? a[c] : defaultValue), obj);
