import format from '../format';

describe('format.js', () => {
  it('should be a function', () => {
    expect(format).toEqual(expect.any(Function));
  });

  it('should do nothing if mask is `undefined` or `null` ', () => {
    const input = 'numbers 123 and mask ##';
    expect(format(input)).toBe(input);
    expect(format(input, null)).toBe(input);
  });

  it('should add delimiter if explicitly typed', () => {
    expect(format('(', '(#')).toBe('(');
  });

  it('should add delimiters and masks', () => {
    expect(format('1234', '(###) #')).toBe('(123) 4');
    expect(format('444444444', '#### - #### - #### - ####')).toBe('4444 - 4444 - 4');
    expect(format('A314444', 'A## - ####')).toBe('A31 - 4444');
  });

  it('should fill mask blanks', () => {
    expect(format('11', '## - ##')).toBe('11 - ');
  });

  it('should not fill if no value is provided', () => {
    expect(format('', '## - ##')).toBe('');
  });

  it('should not fill if wrong value is provided even if it is correct later in mask', () => {
    expect(format('a', '#a')).toBe('');
  });

  it('should fill last characters if they are all delimiters', () => {
    expect(format('1', '#)')).toBe('1)');
    expect(format('564', '(###)!!')).toBe('(564)!!');
  });

  /* === TODO: fix later === *\
  it('should mask numbers', () => {
    expect(format(1234, '##.##')).toBe('12.34');
  });

  it('should return empty string if no input is given', () => {
    expect(format(null, '#')).toBe('');
  });

  it('should accept masked parameter if array', () => {
    expect(format('12', ['#', '-', '#'])).toBe('1-2');
  });
  \* === /TODO: fix later === */

  it('should allow string with and without optional char', () => {
    expect(format('123L', '##?#-A')).toBe('123-L');
    // expect(format('12L', '##?#-A')).toBe('12-L'); TODO: fix later
    expect(format('1212341234', '(##) ####-####?#')).toBe('(12) 1234-1234');
    expect(format('12123412345', '(##) ####-####?#')).toBe('(12) 1234-12345');
  });

  it('should format inputs based on real-work masks', () => {
    // time with seconds
    expect(format('111515', '##:##:##')).toBe('11:15:15');
    // hours and minutes
    expect(format('2015', '##h##m')).toBe('20h15m');
    // date-time
    expect(format('271020162315', '##/##/#### ##:##')).toBe('27/10/2016 23:15');
    // credit card
    expect(format('4532478255247634', '#### #### #### ####')).toBe('4532 4782 5524 7634');
    // phone number
    expect(format('9999999999', '(###) ###-####')).toBe('(999) 999-9999');
    // phone number (US)
    expect(format('9999999999', '+1 (###) ###-####')).toBe('+1 (999) 999-9999');
    // CPF
    expect(format('39053344705', '###.###.###-##')).toBe('390.533.447-05');
    // CPNJ
    expect(format('53288196000128', '##.###.###/####-##')).toBe('53.288.196/0001-28');
    // Social Security number
    expect(format('365038704', '###-##-####')).toBe('365-03-8704');
  });
});
