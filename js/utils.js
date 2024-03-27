Array.prototype.parse2D = function () {
  const rows = [];
  for (let i = 0; i < this.length; i += 16) {
    // Slide to every 16th element in the array
    rows.push(this.slice(i, i + 16));
  }

  return rows;
};
