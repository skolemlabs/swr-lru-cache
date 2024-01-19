"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/swr-lru-cache.ts
var swr_lru_cache_exports = {};
__export(swr_lru_cache_exports, {
  SwrLruCache: () => SwrLruCache
});
module.exports = __toCommonJS(swr_lru_cache_exports);
var SwrLruCache = class {
  constructor(capacity) {
    this.capacity = capacity;
  }
  cache = /* @__PURE__ */ new Map();
  /**
   * Returns an iterable iterator over the keys in the cache.
   *
   * @returns {IterableIterator<string>} - An iterator of the cache keys.
   */
  keys() {
    return [...this.cache.keys()][Symbol.iterator]();
  }
  /**
   * Retrieves the data and error associated with the given key from the cache.
   *
   * @param {string} key - The key of the cache entry to retrieve.
   * @returns {State<Data, Error> | undefined} - The cache entry, or undefined if not found.
   */
  get(key) {
    const value = this.cache.get(key);
    if (value === void 0) {
      return void 0;
    }
    this.setMostRecentlyUsed(key, value);
    return value;
  }
  /**
   * Sets the data and error associated with the given key in the cache.
   * If the cache size exceeds its capacity after the insertion, the least recently used item is removed.
   *
   * @param {string} key - The key of the cache entry to set.
   * @param {State<Data, Error>} value - The value to be stored in the cache.
   */
  set(key, value) {
    this.setMostRecentlyUsed(key, value);
    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
  /**
   * Removes the cache entry associated with the given key.
   * @param {string} key - The key of the cache entry to delete.
   */
  delete(key) {
    this.cache.delete(key);
  }
  /**
   * Set the given key-value pair as the most recently used in the cache.
   *
   * The `delete` method is called before the `set` method to ensure that the
   * key-value pair is moved to the end of the Map's key insertion order.
   * Since the LRU cache evicts the least recently used item based on the
   * insertion order of the keys, calling `delete` first makes sure that the
   * most recently accessed key is placed at the end, thus preserving the LRU
   * eviction strategy.
   *
   * @param {string} key - The key to be set as the most recently used.
   * @param {State<Data, Error>} value - The value associated with the key.
   */
  setMostRecentlyUsed(key, value) {
    this.cache.delete(key);
    this.cache.set(key, value);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SwrLruCache
});
