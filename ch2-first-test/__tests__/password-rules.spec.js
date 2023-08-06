const {oneUpperCaseRule} = require('../password-rules');

// v0 独立测试
describe('one uppercase rule', () => {
  test('given no uppercase, it fails', () => {
    const result = oneUpperCaseRule('abc');
    expect(result.passed).toEqual(false);
  });
  test('given one uppercase, it passes', () => {
    const result = oneUpperCaseRule('Abc');
    expect(result.passed).toEqual(true);
  });
  test('given a different uppercase, it passes', () => {
    const result = oneUpperCaseRule('aBc');
    expect(result.passed).toEqual(true);
  });
});

//parameterized 不推荐
describe('v2 one uppercase rule', () => {
  test('given no uppercase, it fails', () => {
    const result = oneUpperCaseRule('abc');
    expect(result.passed).toEqual(false);
  });

  test.each([
    'Abc',
    'aBc'
  ])('given one uppercase, it passes', (input) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(true);
  });
});

//parameterized v3推荐
describe('v3 one uppercase rule', () => {
  test.each([
    ['Abc', true],
    ['aBc', true],
    ['abc', false]
  ])('given %s, %s ', (input, expected) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(expected);
  });
});

// 不推荐
describe('v4 one uppercase rule, with the fancy jest table input', () => {
  test.each`
    input | expected
    ${'Abc'} | ${true}
    ${'aBc'} | ${true}
    ${'abc'} | ${false}
    `('given $input', ({input, expected}) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(expected);
  });
});

// v5 推荐
describe('v5 one uppercase rule, with vanilla JS test.each', () => {
  const tests = {
    Abc: true,
    aBc: true,
    abc: false
  };

  for (const [input, expected] of Object.entries(tests)) {
    test(`given ${input}, ${expected}`, () => {
      const result = oneUpperCaseRule(input);
      expect(result.passed).toEqual(expected);
    });
  }
});
