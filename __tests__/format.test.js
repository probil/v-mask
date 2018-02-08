import format from '../src/format';

describe('General', () => {
  test('Should do nothing if mask is `undefined`', () => {
    const input = 'Some test string with numbers 123 and mask ##';
    const expected = input;

    const actual = format(input);

    expect(actual).toBe(expected);
  });
});

describe('One-symbol mask for numeric input -> #', () => {
  test('Should return empty string for mask `#` and input `A`', () => {
    const input = 'A';
    const expected = '';
    const mask = '#';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('Should return `5` for mask `#` and input `5` ', () => {
    const input = '5';
    const expected = '5';
    const mask = '#';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
});

describe('One-symbol mask for alphabetical input -> A', () => {
  test('Should return empty string for mask `A` and input `1`', () => {
    const input = '1';
    const expected = '';
    const mask = 'A';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('Should return `a` for mask `A` and input `a`', () => {
    const input = 'a';
    const expected = 'a';
    const mask = 'A';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
});

describe('One-symbol mask for alphanumeric input -> N', () => {
  test('Should return `A` for mask `N` and input `A`', () => {
    const input = 'A';
    const expected = 'A';
    const mask = 'N';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `a` for mask `N` and input `a`', () => {
    const input = 'a';
    const expected = 'a';
    const mask = 'N';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `1` for mask `N` and input `1`', () => {
    const input = '1';
    const expected = '1';
    const mask = 'N';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return empty string for mask `N` and input `-`', () => {
    const input = '-';
    const expected = '';
    const mask = 'N';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
});

describe('One-symbol mask for any input -> X', () => {
  test('Should return `A` for mask `X` and input `A`', () => {
    const input = 'A';
    const expected = 'A';
    const mask = 'X';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `a` for mask `X` and input `a`', () => {
    const input = 'a';
    const expected = 'a';
    const mask = 'X';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `1` for mask `X` and input `1`', () => {
    const input = '1';
    const expected = '1';
    const mask = 'X';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `-` for mask `X` and input `-`', () => {
    const input = '-';
    const expected = '-';
    const mask = 'X';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
});

describe('Optional character mask', () => {
  test('Should return `(12) 1234-1234` for mask `(##) ####-####?#` and input `1212341234`', () => {
    const input = '1212341234';
    const expected = '(12) 1234-1234';
    const mask = '(##) ####-####?#';

    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('Should return `(12) 1234-12345` for mask `(##) ####-####?#` and input `12123412345`', () => {
    const input = '12123412345';
    const expected = '(12) 1234-12345';
    const mask = '(##) ####-####?#';

    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
});

describe('Real-word masks', () => {
  test('[Time] Should return `11:15:15` for mask `##:##:##` and input `111515`', () => {
    const input = '111515';
    const expected = '11:15:15';
    const mask = '##:##:##';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[HourMinute] Should return `20h15m` for mask `##h##m` and input `2015`', () => {
    const input = '2015';
    const expected = '20h15m';
    const mask = '##h##m';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[Date&Time] Should return `27/10/2016 23:15` for mask `##/##/#### ##:##` and input `271020162315`', () => {
    const input = '271020162315';
    const expected = '27/10/2016 23:15';
    const mask = '##/##/#### ##:##';
    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[CreditCard] Should return `4444 4444 4444 4444` for mask `#### #### #### ####` and input `4444444444444444`', () => {
    const input = '4444444444444444';
    const expected = '4444 4444 4444 4444';
    const mask = '#### #### #### ####';

    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[PhoneNum] Should return `(999) 999-9999` for mask `(###) ###-####`  and input `9999999999`', () => {
    const input = '9999999999';
    const expected = '(999) 999-9999';
    const mask = '(###) ###-####';

    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[PhoneNumUS] Should return `+1 (999) 999-9999` for mask `+1 (###) ###-####`  and input `9999999999`', () => {
    const input = '9999999999';
    const expected = '+1 (999) 999-9999';
    const mask = '+1 (###) ###-####';

    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[CPF] Should return `390.533.447-05` for mask `###.###.###-#`  and input `39053344705`', () => {
    const input = '39053344705';
    const expected = '390.533.447-05';
    const mask = '###.###.###-##';

    const actual = format(input, mask);

    expect(actual).toBe(expected);
  });
});
