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
    this.keys++;
    if (this.keys > this.capacity * this.loadFacotr)
      this.capacity = this.capacity * 2;

    if (this.buckets.length !== this.capacity) this.resizeBucketTable();
    let hashed = this.hash(key);
    let bucket = this.buckets[hashed % this.capacity];

    this.buckets[hashed % this.capacity] = [...bucket, { hashed, value }];
    return;
  }

  get() {
    return this.buckets;
  }
}
