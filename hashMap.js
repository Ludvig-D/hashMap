export default class HashMap {
  loadFacotr = 0.75;
  capacity = 16;
  buckets = [];
  items = 0;

  resizeBucketTable() {
    let addingBuckets = [];
    for (let i = 0; i < this.capacity; i++) {
      addingBuckets = [...addingBuckets, []];
    }
    if (this.items === 1) return (this.buckets = addingBuckets);

    for (let bucket of this.buckets) {
      for (let item of bucket) {
        addingBuckets[item.key % this.capacity] = [
          ...addingBuckets[item.key % this.capacity],
          { key: item.key, value: item.value },
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
    if (key === undefined || value === undefined) return;

    let hashed = this.hash(key);
    let bucket = hashed % this.capacity;

    if (this.buckets.length !== 0 && this.has(key))
      for (let buck of this.buckets[bucket]) {
        if (buck.hashed === hashed) return (buck.value = value);
      }

    this.items++;
    if (this.items > this.capacity * this.loadFacotr)
      this.capacity = this.capacity * 2;

    if (this.buckets.length !== this.capacity) this.resizeBucketTable();

    this.buckets[bucket] = [...this.buckets[bucket], { key: hashed, value }];
    return;
  }

  get() {
    return this.buckets;
  }

  has(key) {
    let hashed = this.hash(key);
    for (let bucket of this.buckets[hashed % this.capacity]) {
      if (bucket.key === hashed) return true;
    }
    return false;
  }

  remove(key) {
    const hashs = this.hash(key);
    const bucket = hashs % this.capacity;

    if (!this.has(key)) return;

    let newBucket = [];
    for (let item of this.buckets[bucket]) {
      if (item.key !== hashs) newBucket = item;
    }

    this.buckets[bucket] = newBucket;
  }

  length() {
    let length = 0;
    for (let bucket of this.buckets) {
      for (let item of bucket) {
        length++;
      }
    }
    return length;
  }

  clear() {
    this.buckets = [];
    this.items = 0;
    this.capacity = 16;
  }

  keys() {
    let arr = [];
    for (let bucket of this.buckets) {
      for (let item of bucket) {
        arr = [...arr, item.key];
      }
    }
    return arr;
  }

  values() {
    let arr = [];
    for (let bucket of this.buckets) {
      for (let item of bucket) {
        arr = [...arr, item.value];
      }
    }
    return arr;
  }

  entries() {
    let arr = [];
    for (let bucket of this.buckets) {
      for (let item of bucket) {
        arr = [...arr, [item.key, item.value]];
      }
    }
    return arr;
  }
}
