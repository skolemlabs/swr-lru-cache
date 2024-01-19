import { Arbitrary } from 'fast-check';
import { State } from 'swr';

/** Arbitrary Cache State */
declare const arbitraryState: () => Arbitrary<State<unknown, unknown>>;

export { arbitraryState };
