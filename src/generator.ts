export default function* resultsGenerator(
  iterable: [string, number][],
  start = 0,
  end: number = iterable.length,
  step = 1,
): Generator<[string, number]> {
  for (let i = start; i < end; i += step) {
    yield iterable[i];
  }
}
