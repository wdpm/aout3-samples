// / const { Observable, Subject, from, interval } = require("rxjs");
const Samples = require("./timing-samples");
// const util = require("util");

describe("monkey patching ", () => {
  let originalTimeOut;
  beforeEach(() => (originalTimeOut = setTimeout));
  afterEach(() => (setTimeout = originalTimeOut));

  test("calculate1", (done) => {
    setTimeout = (callback, ms) => callback();
    Samples.calculate1(1, 2, (result) => {
      expect(result).toBe(3);
      done();
    });
  });
});

describe("calculate1 - with jest", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  })

  test("fake timeout with callback", (done) => {
    Samples.calculate1(1, 2, (result) => {
      expect(result).toBe(3);
      done();
    });
    // Without advanceTimerstoNextTimer our fake setTimeout will be stuck forever
    jest.advanceTimersToNextTimer();
  }, 30000);
});

describe("calculate2 - Promises", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  })

  test("fake timeout with Promise", (done) => {
    Samples.calculate2(1, 2).then((result) => {
      expect(result).toBe(3);
      done()
    });
    jest.advanceTimersToNextTimer();
  }, 30000);
});

describe("calculate with intervals", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  })

  test("calculate 4 with input and output functions for intervals", () => {
    const inputFn = () => ({x: 1, y: 2});
    const results = [];
    Samples.calculate4(inputFn, (result) => results.push(result));

    jest.advanceTimersToNextTimer();
    jest.advanceTimersToNextTimer();

    expect(results[0]).toBe(3);
    expect(results[1]).toBe(3);
  });
});

// describe("calculate 5 with Observable intervals", () => {
//   // beforeEach(jest.clearAllTimers);
//   beforeEach(jest.useFakeTimers);

//   test("calculate5 with single interval on observable can be asserted", (done) => {
//     const inputFn = () => ({ x: 1, y: 2 });
//     Samples.calculate5(inputFn).subscribe(
//       (result) => {
//         expect(result).toBe(3);
//         done()
//       }
//     );

//     jest.advanceTimersToNextTimer();
//   });

//   test("calculate5 with two intervals on observable can be asserted", () => {
//     let accumulator = 0;
//     const inputFn = () => ({ x: 1, y: 2 });

//     Samples.calculate5(inputFn).subscribe((result) => (accumulator += result));

//     jest.advanceTimersToNextTimer();
//     jest.advanceTimersToNextTimer();
//     expect(accumulator).toBe(6);
//   });
// });
// describe("usesObservableThatCompletes", () => {
//   test("send a fake observable", async () => {
//     const inputs$ = from([1, 2]);
//     const result = await Samples.calculate6(inputs$);
//     expect(result).toBe(3);
//   });
// });
// 