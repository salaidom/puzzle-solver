let solver = require("./src/solver.js");

const areaX = 10;
const areaY = 10;

const puzzles = [
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2],
    [0, 0, 0, 2, 2],
  ],
  [
    [0, 3, 3],
    [0, 3, 3],
    [0, 3, 3],
    [3, 3, 3],
    [3, 3, 3],
    [3, 3, 3],
  ],
  [
    [4, 4, 0, 4, 4],
    [4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4],
    [4, 4, 0, 0, 0],
  ],
  [
    [0, 5, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0],
    [5, 5, 5, 5, 5, 5],
  ],
  // [
  //   [0, 6, 0, 0, 0, 0],
  //   [0, 6, 0, 0, 0, 0],
  //   [0, 6, 0, 0, 0, 0],
  //   [6, 6, 6, 6, 6, 6],
  // ],
  // [
  //   [0, 7, 0, 7, 0, 0],
  //   [0, 7, 0, 7, 0, 0],
  //   [0, 7, 7, 7, 0, 0],
  //   [7, 7, 7, 7, 7, 7],
  // ],
];

solver.solve(areaX, areaY, puzzles);
