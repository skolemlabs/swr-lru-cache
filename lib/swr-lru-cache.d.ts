import { Cache, State } from 'swr';

/**
 * SwrLruCache is a Least Recently Used (LRU) cache implementing the SWR {@link Cache}
 * interface. It manages fetched data and errors while limiting the number of
 * stored items. This optimizes memory usage by evicting the least accessed
 * items when capacity is reached.
 */
declare class SwrLruCache<Data = unknown, Error = unknown> implements Cache<Data> {
    private readonly capacity;
    private readonly cache;
    constructor(capacity: number);
    /**
     * Returns an iterable iterator over the keys in the cache.
     *
     * @returns {IterableIterator<string>} - An iterator of the cache keys.
     */
    keys(): IterableIterator<string>;
    /**
     * Retrieves the data and error associated with the given key from the cache.
     *
     * @param {string} key - The key of the cache entry to retrieve.
     * @returns {State<Data, Error> | undefined} - The cache entry, or undefined if not found.
     */
    get(key: string): State<Data, Error> | undefined;
    /**
     * Sets the data and error associated with the given key in the cache.
     * If the cache size exceeds its capacity after the insertion, the least recently used item is removed.
     *
     * @param {string} key - The key of the cache entry to set.
     * @param {State<Data, Error>} value - The value to be stored in the cache.
     */
    set(key: string, value: State<Data, Error>): void;
    /**
     * Removes the cache entry associated with the given key.
     * @param {string} key - The key of the cache entry to delete.
     */
    delete(key: string): void;
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
    private setMostRecentlyUsed;
}

export { SwrLruCache };
