# `swr-lru-cache`

## A drop in LRU Cache for `SWR`

`swr-lru-cache` is a Least Recently Used (LRU) cache implementation for Vercel's
[`SWR`](https://swr.vercel.app/) (Stale-While-Revalidate) library. It optimizes
memory usage by limiting the number of stored items and evicting the least
accessed items when capacity is reached.

### Installation

In the root of your application add the following:

```typescript
import { SWRConfig } from 'swr'
import { SwrLruCache } from 'swr-lru-cache';

// ...

function App() {
// ...

  return (
    <SWRConfig value={{ provider: () => new SwrLruCache(250) }}>
      // ...
    </SWRConfig/>
  );
}
```
