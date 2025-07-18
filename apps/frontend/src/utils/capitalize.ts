String.prototype.capitalize = function () {
  return (this as string).charAt(0).toUpperCase() + (this as string).slice(1);
};
