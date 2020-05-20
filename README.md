# PUZZLE SOLVER

This is a demo application for solving the puzzle problem.

- Node application (should be run through `npm` or `yarn`) or via `node` itself
- Program uses brute force algorithm with nested loops and recursion (VERY INEFFICIENT, but problem description stated it does not have to be optimized)
- Program also uses puzzle rotation
- Due to memory consciousness, program uses direct board manipulation and needed implementation of additional methods
- Program prints board area when first solution is found
- Program does not print anything when no solution can be found

## Contents

- `index.js` file contains inputs for puzzle solver
- `/src/solver.js` file contains functionality needed to solve the problem
- `/test/test.js` file contains tests for solver with various cases

## If you want to run it

- clone the repo
- run `yarn install`
- run `yarn start` to test solution from the problem description

## If you want to test unsolvable case

- open `index.js` file and uncomment last puzzles
- run `yarn start` again

## If you want to run the tests

- run `yarn test` to see the result of the tests
