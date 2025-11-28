export default class HashMap {
  loadFacotr = 0.75;
  capacity = 16;
  buckets = [];
  keys = 0;

  resizeBucketTable() {
    let addingBuckets = [];
    for (let i = 0; i < this.capacity; i++) {
      addingBuckets = [...addingBuckets, []];
    }
    if (this.keys === 1) return (this.buckets = addingBuckets);

    let newBucket = this.buckets;
    for (let i = 0; i < newBucket.length; i++) {
      for (let j = 0; j < newBucket[i].length; j++) {
        addingBuckets[newBucket[i][j].hashed % this.capacity] = [
          ...addingBuckets[newBucket[i][j].hashed % this.capacity],
          { hashed: newBucket[i][j].hashed, value: newBucket[i][j].value },
        ];
      }
    }
    this.buckets = addingBuckets;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    let hashed = this.hash(key);
    let bucket = hashed % this.capacity;

    if (this.buckets.length !== 0 && this.has(key))
      for (let i = 0; 0 < this.buckets[bucket].length; i++) {
        if (this.buckets[bucket][i].hashed == hashed)
          return (this.buckets[bucket][i].value = value);
      }

    this.keys++;
    if (this.keys > this.capacity * this.loadFacotr)
      this.capacity = this.capacity * 2;

    if (this.buckets.length !== this.capacity) this.resizeBucketTable();

    this.buckets[bucket] = [...this.buckets[bucket], { hashed, value }];
    return;
  }

  get() {
    return this.buckets;
  }

  has(key) {
    let hashs = this.hash(key);
    let e = this.buckets[hashs % this.capacity];
    for (let i = 0; i < e.length; i++) {
      if (this.buckets[hashs % this.capacity][i].hashed === hashs) return true;
    }
    return false;
  }

  remove(key) {
    const hashs = this.hash(key);
    const bucket = hashs % this.capacity;

    if (!this.has(key)) return;

    let newBucket = [];
    for (let i = 0; i < this.buckets[bucket].length; i++) {
      if (this.buckets[bucket][i].hashed !== hashs)
        newBucket = this.buckets[bucket][i];
    }

    this.buckets[bucket] = newBucket;
  }

  length() {
    let length = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      for (let j = 0; j < this.buckets[i].length; j++) {
        if (this.buckets[i][j] != undefined) length++;
      }
    }
    return length;
  }
}
