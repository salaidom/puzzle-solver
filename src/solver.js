let found = false;

function generateArea(cols, rows) {
  let area = [];

  for (let i = 0; i < rows; i++) {
    area.push([]);
    area[i].push([]);
    for (let j = 0; j < cols; j++) {
      area[i][j] = 0;
    }
  }

  return area;
}

function printArea(area) {
  area.forEach((line) => {
    console.log(line.join(" "));
  });
}

function printPuzzle(puzzle) {
  puzzle.forEach((line) => {
    console.log(line.join(" "));
  });
}

function rotatePuzzle(puzzle) {
  const rotated = [];
  for (let i = 0; i < puzzle[0].length; i++) {
    const row = puzzle
      .map((el) => el[i])
      .reverse()
      .slice();
    rotated.push(row);
  }
  return rotated;
}

function canPlacePuzzleOnCurrentCoordinates(puzzle, area, x, y) {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[0].length; j++) {
      if (x + j >= area[0].length - 1) {
        return false;
      }
      if (y + i >= area.length - 1) {
        return false;
      }
      if (puzzle[i][j] != 0 && area[y + i][x + j] != 0) {
        return false;
      }
    }
  }
  return true;
}

function placePuzzleOnCurrentCoordinates(puzzle, area, x, y) {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[0].length; j++) {
      area[y + i][x + j] =
        puzzle[i][j] != 0 ? puzzle[i][j] : area[y + i][x + j];
    }
  }
}

function removePuzzleFromCurrentCoordinates(puzzle, area, x, y) {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[0].length; j++) {
      area[y + i][x + j] = puzzle[i][j] != 0 ? 0 : area[y + i][x + j];
    }
  }
}

function nextTry(area, puzzles, puzzleIndex) {
  if (!found) {
    if (puzzleIndex < puzzles.length) {
      for (let i = 0; i < area.length; i++) {
        for (let j = 0; j < area[0].length; j++) {
          let currentPuzzle = puzzles[puzzleIndex];

          for (rot = 0; rot < 4; rot++) {
            if (rot !== 0) {
              currentPuzzle = rotatePuzzle(currentPuzzle);
            }
            if (canPlacePuzzleOnCurrentCoordinates(currentPuzzle, area, j, i)) {
              placePuzzleOnCurrentCoordinates(currentPuzzle, area, j, i);
              nextTry(area, puzzles, puzzleIndex + 1);
              removePuzzleFromCurrentCoordinates(currentPuzzle, area, j, i);
            }
          }
        }
      }
    } else {
      found = true;
      printArea(area);
      return area;
    }
  }
}

function solve(x, y, puzzles) {
  const area = generateArea(x, y);
  nextTry(area, puzzles, 0);
}

module.exports = {
  generateArea: generateArea,
  printArea: printArea,
  printPuzzle: printPuzzle,
  rotatePuzzle: rotatePuzzle,
  canPlacePuzzleOnCurrentCoordinates: canPlacePuzzleOnCurrentCoordinates,
  placePuzzleOnCurrentCoordinates: placePuzzleOnCurrentCoordinates,
  removePuzzleFromCurrentCoordinates: removePuzzleFromCurrentCoordinates,
  solve: solve,
};
