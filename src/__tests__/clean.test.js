import { clean } from '../format';

describe('format.js - clean function', () => {
  it('should return the entry value without the mask', () => {
    // time with seconds
    expect(clean('11:15:15', '##:##:##')).toBe('111515');
    // hours and minutes
    expect(clean('20h15m', '##h##m')).toBe('2015');
    // date-time
    expect(clean('27/10/2016 23:15', '##/##/#### ##:##')).toBe('271020162315');
    // credit card
    expect(clean('4532 4782 5524 7634', '#### #### #### ####')).toBe('4532478255247634');
    // phone number
    expect(clean('(999) 999-9999', '(###) ###-####')).toBe('9999999999');
    // phone number (US)
    expect(clean('+1 (999) 999-9999', '+1 (###) ###-####')).toBe('9999999999');
    // CPF
    expect(clean('390.533.447-05', '###.###.###-##')).toBe('39053344705');
    // CPNJ
    expect(clean('53.288.196/0001-28', '##.###.###/####-##')).toBe('53288196000128');
    // Social Security number
    expect(clean('365-03-8704', '###-##-####')).toBe('365038704');
  });
});
