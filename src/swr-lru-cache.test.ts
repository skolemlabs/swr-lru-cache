import fc, { Arbitrary } from "fast-check";
import type { State } from "swr";

import { SwrLruCache } from "./swr-lru-cache";

/** Arbitrary Cache State */
export const arbitraryState = (): Arbitrary<State<unknown, unknown>> => {
  return fc.record({
    data: fc.option(fc.anything()),
    error: fc.option(fc.anything()),
    isValidating: fc.option(fc.boolean()),
    isLoading: fc.option(fc.boolean()),
  });
};
describe("SwrLruCache", () => {
  describe("get", () => {
    it("should return undefined for non-existent keys", () => {
      fc.assert(
        fc.property(fc.string(), (key) => {
          const subject = new SwrLruCache(10);
          expect(subject.get(key)).toBeUndefined();
        }),
      );
    });

    it("should return the value for an existing key", () => {
      fc.assert(
        fc.property(fc.string(), arbitraryState(), (key, value) => {
          const subject = new SwrLruCache(10);
          subject.set(key, value);
          expect(subject.get(key)).toEqual(value);
        }),
      );
    });
  });

  describe("set", () => {
    it("should store a key-value pair", () => {
      fc.assert(
        fc.property(fc.string(), arbitraryState(), (key, value) => {
          const subject = new SwrLruCache(10);
          subject.set(key, value);
          expect(subject.get(key)).toEqual(value);
        }),
      );
    });

    it("should evict the least recently used item when capacity is exceeded", () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 100 }),
          arbitraryState(),
          (capacity, value) => {
            const subject = new SwrLruCache(capacity);

            for (let i = 0; i < capacity + 1; i++) {
              subject.set(i.toString(), value);
            }

            expect(subject.get("0")).toBeUndefined();
            expect(subject.get("1")).toEqual(value);
          },
        ),
      );
    });
  });

  describe("delete", () => {
    it("should delete a key-value pair", () => {
      fc.assert(
        fc.property(fc.string(), arbitraryState(), (key, value) => {
          const subject = new SwrLruCache(10);
          subject.set(key, value);
          subject.delete(key);
          expect(subject.get(key)).toBeUndefined();
        }),
      );
    });
  });

  describe("keys", () => {
    it("should return all keys in the subject", () => {
      fc.assert(
        fc.property(
          fc.array(fc.tuple(fc.string(), arbitraryState()), {
            minLength: 20,
          }),
          (keyValues) => {
            const uniqueKeys = Array.from(
              new Set(keyValues.map(([key]) => key)),
            );
            const subject = new SwrLruCache(uniqueKeys.length);

            keyValues.forEach(([key, value]) => subject.set(key, value));

            const cacheKeys = Array.from(subject.keys());
            expect(cacheKeys).toEqual(expect.arrayContaining(uniqueKeys));
            expect(cacheKeys.length).toEqual(uniqueKeys.length);
          },
        ),
      );
    });
  });
});
