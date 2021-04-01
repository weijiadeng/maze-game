// TODO: define interface
export class UnionFind {
  partsCount;
  rank;
  parent;

  constructor(elementNum) {
    this.partsCount = elementNum;
    this.parent = Array.apply(null, { length: elementNum }).map(
      Number.call,
      Number
    );
    this.rank = Array.apply(0, { length: elementNum });
  }

  // Find the parent of the given index
  find(index) {
    while (index !== this.parent[index]) {
      this.parent[index] = this.parent[this.parent[index]];
      index = this.parent[index];
    }
    return index;
  }

  // Union the left element and right element, so that they become connected
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

export function partialApply(fn, ...args) {
  // Reference: https://medium.com/@jnkrtech/partial-function-application-in-javascript-and-flow-7f3ca87074fe
  return fn.bind(null, ...args);
}

// Returns random integer smaller than max.
export function genRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function compareNumbers(a, b) {
  return a - b;
}
