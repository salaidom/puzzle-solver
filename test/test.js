var assert = require("assert");
var solver = require("../src/solver.js");

const isEmpty = (value) => value === null || value === "";

const isUndefined = (value) => typeof value === "undefined";

describe("Area generation", function () {
  it("should generate area of dimension 4x4", function () {
    const areaOfDimension4 = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    assert.deepEqual(solver.generateArea(4, 4), areaOfDimension4);
  });
  it("two generated areas of same dimensions should be equal", function () {
    assert.deepEqual(solver.generateArea(10, 10), solver.generateArea(10, 10));
  });
});

describe("Puzzle placeability", function () {
  it("Puzzle of smaller dimensions than area should be placeable into empty area at 0,0 coordinates", function () {
    const area = solver.generateArea(5, 5);
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    assert.equal(
      solver.canPlacePuzzleOnCurrentCoordinates(puzzle, area, 0, 0),
      true
    );
  });
  it("Puzzle of smaller dimensions than area should not be placeable into empty area at high coordinates", function () {
    const area = solver.generateArea(5, 5);
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    assert.equal(
      solver.canPlacePuzzleOnCurrentCoordinates(puzzle, area, 3, 3),
      false
    );
  });
  it("Puzzle of bigger dimensions than area should not be placeable into empty area", function () {
    const area = solver.generateArea(2, 2);
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    assert.equal(
      solver.canPlacePuzzleOnCurrentCoordinates(puzzle, area, 0, 0),
      false
    );
  });
});

describe("Puzzle rotation", function () {
  it("Puzzle should be rotated by 90 deg clockwise when 1 rotation is needed", function () {
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedPuzzle = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
    ];
    const rotatedPuzzle = solver.rotatePuzzle(puzzle);
    assert.deepEqual(rotatedPuzzle, expectedPuzzle);
  });
  it("Puzzle should be rotated by 180 deg clockwise when 2 rotations are needed", function () {
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedPuzzle = [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
    ];
    let rotatedPuzzle = solver.rotatePuzzle(puzzle);
    rotatedPuzzle = solver.rotatePuzzle(rotatedPuzzle);
    assert.deepEqual(rotatedPuzzle, expectedPuzzle);
  });
  it("Puzzle should be rotated by 270 deg clockwise when 3 rotations are needed", function () {
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedPuzzle = [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ];
    let rotatedPuzzle = solver.rotatePuzzle(puzzle);
    rotatedPuzzle = solver.rotatePuzzle(rotatedPuzzle);
    rotatedPuzzle = solver.rotatePuzzle(rotatedPuzzle);
    assert.deepEqual(rotatedPuzzle, expectedPuzzle);
  });
  it("Puzzle should be the same after 4 rotations", function () {
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedPuzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    let rotatedPuzzle = solver.rotatePuzzle(puzzle);
    rotatedPuzzle = solver.rotatePuzzle(rotatedPuzzle);
    rotatedPuzzle = solver.rotatePuzzle(rotatedPuzzle);
    rotatedPuzzle = solver.rotatePuzzle(rotatedPuzzle);
    assert.deepEqual(rotatedPuzzle, expectedPuzzle);
  });
});

describe("Puzzle placement and removal", function () {
  it("Puzzle should be present in area when placed", function () {
    const area = solver.generateArea(4, 4);
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedArea = [
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ];
    solver.placePuzzleOnCurrentCoordinates(puzzle, area, 0, 0);
    assert.deepEqual(area, expectedArea);
  });
  it("Area should be empty when puzzle is removed", function () {
    const area = [
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ];
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedArea = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    solver.removePuzzleFromCurrentCoordinates(puzzle, area, 0, 0);
    assert.deepEqual(area, expectedArea);
  });
  it("Only specific puzzle should be removed from area", function () {
    const area = [
      [1, 1, 1, 2],
      [0, 1, 0, 2],
      [0, 1, 2, 2],
      [0, 0, 2, 2],
    ];
    const puzzle = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedArea = [
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 2, 2],
      [0, 0, 2, 2],
    ];
    solver.removePuzzleFromCurrentCoordinates(puzzle, area, 0, 0);
    assert.deepEqual(area, expectedArea);
  });
});

describe("Solving", function () {
  it("Output should not be empty when there is a solution", function () {
    const puzzlez = [
      [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [2, 2],
        [2, 2],
      ],
    ];
    const result = solver.solve(4, 4, puzzlez);
    assert.equal(isEmpty(result), false);
  });
  it("Output should be empty when there is no solution", function () {
    const puzzlez = [
      [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
      ],
    ];
    const result = solver.solve(4, 4, puzzlez);
    assert.equal(isUndefined(result), true);
  });
});
