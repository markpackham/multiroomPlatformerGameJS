// Collision block array
Array.prototype.parse2D = function () {
  const rows = [];
  for (let i = 0; i < this.length; i += 16) {
    // Slide to every 16th element in the array
    rows.push(this.slice(i, i + 16));
  }

  return rows;
};

// Creating collision blocks
Array.prototype.createObjectsFrom2D = function () {
  const objects = [];

  this.forEach((row, yIndex) => {
    row.forEach((symbol, xIndex) => {
      // 292 is what a collision block is
      // 250 is also used
      if (symbol === 292 || symbol === 250) {
        // Add new collision in collision blocks array
        objects.push(
          new CollisionBlock({
            position: {
              x: xIndex * 64,
              y: yIndex * 64,
            },
          })
        );
      }
    });
  });
  return objects;
};
