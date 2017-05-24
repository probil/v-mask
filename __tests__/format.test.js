import format from '../src/format'

describe('General', () => {
  test('Should do nothing if mask is `undefined`', () => {
    let input = 'Some test string with numbers 123 and mask ##';
    let expected = input;

    let actual   = format(input);

    expect(actual).toBe(expected);
  });
});

describe('One-symbol mask for numeric input -> #', () => {
  test('Should return empty string for mask `#` and input `A`', ()  => {
    let input = 'A';
    let expected = '';
    let mask = '#';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('Should return `5` for mask `#` and input `5` ', () => {
    let input = '5';
    let expected = '5';
    let mask = '#';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });
});

describe('One-symbol mask for alphabetical input -> A', () => {
  test('Should return empty string for mask `A` and input `1`', () => {
    let input = '1';
    let expected = '';
    let mask = 'A';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('Should return `a` for mask `A` and input `a`', () => {
    let input = 'a';
    let expected = 'a';
    let mask = 'A';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  })
});

describe('One-symbol mask for alphanumeric input -> N', () => {
  test('Should return `A` for mask `N` and input `A`', () => {
    let input = 'A';
    let expected = 'A';
    let mask = 'N';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `a` for mask `N` and input `a`', () => {
    let input = 'a';
    let expected = 'a';
    let mask = 'N';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `1` for mask `N` and input `1`', () => {
    let input = '1';
    let expected = '1';
    let mask = 'N';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return empty string for mask `N` and input `-`', () => {
    let input = '-';
    let expected = '';
    let mask = 'N';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  })
});

describe('One-symbol mask for any input -> X', () => {
  test('Should return `A` for mask `X` and input `A`', () => {
    let input = 'A';
    let expected = 'A';
    let mask = 'X';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `a` for mask `X` and input `a`', () => {
    let input = 'a';
    let expected = 'a';
    let mask = 'X';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `1` for mask `X` and input `1`', () => {
    let input = '1';
    let expected = '1';
    let mask = 'X';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });
  test('Should return `-` for mask `X` and input `-`', () => {
    let input = '-';
    let expected = '-';
    let mask = 'X';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  })
});

describe('Optional character mask', () => {

  test('Should return `(12) 1234-1234` for mask `(##) ####-####?#` and input `1212341234`', () => {
    let input = '1212341234'
    let expected = '(12) 1234-1234'
    let mask = '(##) ####-####?#'

    let actual = format(input, mask)

    expect(actual).toBe(expected)
  })

  test('Should return `(12) 1234-12345` for mask `(##) ####-####?#` and input `12123412345`', () => {
    let input = '12123412345'
    let expected = '(12) 1234-12345'
    let mask = '(##) ####-####?#'

    let actual = format(input, mask)
    
    expect(actual).toBe(expected)
  })
})

describe('Real-word masks', () => {
  test('[Time] Should return `11:15:15` for mask `##:##:##` and input `111515`', () => {
    let input = '111515';
    let expected = `11:15:15`;
    let mask = '##:##:##';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[HourMinute] Should return `20h15m` for mask `##h##m` and input `2015`', () => {
    let input = '2015';
    let expected = `20h15m`;
    let mask = '##h##m';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[Date&Time] Should return `27/10/2016 23:15` for mask `##/##/#### ##:##` and input `271020162315`' , () => {
    let input = '271020162315';
    let expected = '27/10/2016 23:15';
    let mask = '##/##/#### ##:##';
    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[CreditCard] Should return `4444 4444 4444 4444` for mask `#### #### #### ####` and input `4444444444444444`', () => {
    let input = '4444444444444444';
    let expected = '4444 4444 4444 4444';
    let mask = '#### #### #### ####';

    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[PhoneNum] Should return `(999) 999-9999` for mask `(###) ###-####`  and input `9999999999`', () => {
    let input = '9999999999';
    let expected = '(999) 999-9999';
    let mask = '(###) ###-####';

    let actual = format(input, mask);

    expect(actual).toBe(expected);
  });

  test('[PhoneNumUS] Should return `+1 (999) 999-9999` for mask `+1 (###) ###-####`  and input `9999999999`', () => {
    let input = '9999999999';
    let expected = '+1 (999) 999-9999';
    let mask = '+1 (###) ###-####';

    let actual = format(input, mask);

    expect(actual).toBe(expected);
  })

  test('[CPF] Should return `390.533.447-05` for mask `###.###.###-#`  and input `39053344705`', () => {
    let input = '39053344705';
    let expected = '390.533.447-05';
    let mask = '###.###.###-##';

    let actual = format(input, mask);

    expect(actual).toBe(expected);
  })
});
