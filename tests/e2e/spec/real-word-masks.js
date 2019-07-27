import { Selector } from 'testcafe';

// eslint-disable-next-line no-unused-expressions
fixture`Real-world masks`
  .page`./real-word-masks.html`;

test('Time and date input', async (t) => {
  const el = Selector('input#time-and-date-ex');
  await t
    .typeText(el, '271020162315')
    .expect(el.value).eql('27/10/2016 23:15');
});

test('Time input', async (t) => {
  const el = Selector('input#time-ex');
  await t
    .typeText(el, '111515')
    .expect(el.value).eql('11:15:15');
});

test('Hours and minutes input', async (t) => {
  const el = Selector('input#hours-and-minutes-ex');
  await t
    .typeText(el, '2015')
    .expect(el.value).eql('20h15m');
});

test('Credit card input', async (t) => {
  const el = Selector('input#credit-cart-ex');
  await t
    .typeText(el, '4444444444444444')
    .expect(el.value).eql('4444 4444 4444 4444');
});

test('Phone number input', async (t) => {
  const el = Selector('input#phone-number-ex');
  await t
    .typeText(el, '9999999999')
    .expect(el.value).eql('(999) 999-9999');
});

test('US phone number', async (t) => {
  const el = Selector('input#us-phone-number-ex');
  await t
    .typeText(el, '9999999999')
    .expect(el.value).eql('+1(999)-999-9999');
});

test('CPF input', async (t) => {
  const el = Selector('input#cpf-ex');
  await t
    .typeText(el, '39053344705')
    .expect(el.value).eql('390.533.447-05');
});

test('CPNJ input', async (t) => {
  const el = Selector('input#cpnj-ex');
  await t
    .typeText(el, '53288196000128')
    .expect(el.value).eql('53.288.196/0001-28');
});

test('Social Security number input', async (t) => {
  const el = Selector('input#social-security-number-ex');
  await t
    .typeText(el, '365038704')
    .expect(el.value).eql('365-03-8704');
});
