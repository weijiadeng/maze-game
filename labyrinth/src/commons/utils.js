// An implementation of the UnionFind data structure, using path splitting
// and union by rank optimization.
// This is a classic data structure, for more details: https://en.wikipedia.org/wiki/Disjoint-set_data_structure
// Only supports consecutive integers starting from 0 as the elements
export class UnionFind {
  // Number of disjointed sets
  partsCount;
  // rank array, used for union by rank optimization
  rank;
  // parent array, store the disjointed sets information, if two elements shares
  // the same parent, they are connected.
  parent;
  // Initialize the UnionFind structure, all elements are disjoined.
  // Input is the number of elements, only support elements that are consecutive integers
  // starting from 0, so only the number of elements is needed.
  constructor(elementNum) {
    this.partsCount = elementNum;
    // This is to make the parent array a list of consecutive integers starting from 0.
    // i.e., if the elementNum is 5, the parent array will be [0,1,2,3,4]
    this.parent = Array.apply(null, { length: elementNum }).map(
      Number.call,
      Number
    );
    this.rank = Array.apply(0, { length: elementNum });
  }

  // Find the parent of the given element, use path splitting
  // Input: element, must be a integer in the range [0, elementNum]
  // Output: the parent element of the input element
  find(index) {
    while (index !== this.parent[index]) {
      this.parent[index] = this.parent[this.parent[index]];
      index = this.parent[index];
    }
    return index;
  }

  // Union the left element and right element, so that they become connected
  // Input: two elements that are going to be connected, must be
  // integers in the range [0, elementNum]
  // Output: Nothing
  // State change: the two input elements become connected.
  union(left, right) {
    const leftRoot = this.find(left);
    const rightRoot = this.find(right);
    if (leftRoot === rightRoot) {
      return;
    }
    this.partsCount -= 1;
    if (this.rank[leftRoot] < this.rank[rightRoot]) {
      this.parent[leftRoot] = rightRoot;
    } else if (this.rank[leftRoot] > this.rank[rightRoot]) {
      this.parent[rightRoot] = leftRoot;
    } else {
      this.parent[leftRoot] = rightRoot;
      this.rank[rightRoot] += 1;
    }
  }
}

// Random shuffle an array, the input array will be muted.
// Input: an array
// Output: the shuffled array
export function shuffleArray(targetArray) {
  // Reference: https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
  const length = targetArray.length;
  for (let i = length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = targetArray[i];
    targetArray[i] = targetArray[j];
    targetArray[j] = tmp;
  }
  return targetArray;
}

// Partial apply a function
// Input: a function and the default arguments. The default parameters must be the first n arguments.
// Output: a new function with the default arguments inputted.
export function partialApply(fn, ...args) {
  // Reference: https://medium.com/@jnkrtech/partial-function-application-in-javascript-and-flow-7f3ca87074fe
  return fn.bind(null, ...args);
}

// Returns random integer smaller than max.
// Input: the upper bound
// Output: a random integer within the range [0, max)
export function genRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function compareNumbers(a, b) {
  return a - b;
}
