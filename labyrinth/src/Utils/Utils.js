export class UnionFind {
    partsCount;
    rank;
    path;

    constructor(elementNum) {
        this.partsCount = elementNum;
        this.path = Array.apply(null, { length: elementNum }).map(Number.call, Number)
        this.rank = Array.apply(0, { length: elementNum });
    }

    find(index) {
        while (index !== this.path[index]) {
            this.path[index] = this.path[this.path[index]];
            index = this.path[index];
        }
        return index;
    }

    union(left, right) {
        const leftRoot = this.find(left);
        const rightRoot = this.find(right);
        if (leftRoot === rightRoot) {
            return;
        }
        this.partsCount -= 1;
        if (this.rank[leftRoot] < this.rank[rightRoot]) {
            this.path[leftRoot] = rightRoot;
        } else if (this.rank[leftRoot] > this.rank[rightRoot]) {
            this.path[rightRoot] = leftRoot;
        } else {
            this.path[leftRoot] = rightRoot;
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
