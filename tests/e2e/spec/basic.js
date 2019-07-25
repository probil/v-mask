import { Selector } from 'testcafe';

// eslint-disable-next-line no-unused-expressions
fixture`Basic`
  .page`./basic.html`;

test('Allows to remove value char-by-char using backspace', async (t) => {
  const el = Selector('input#time-ex');
  await t
    .typeText(el, '2315')
    .expect(el.value).eql('23:15')
    .pressKey('backspace')
    .expect(el.value).eql('23:1') // eslint-disable-line newline-per-chained-call
    .pressKey('backspace')
    .expect(el.value).eql('23:') // eslint-disable-line newline-per-chained-call
    .pressKey('backspace')
    .expect(el.value).eql('23') // eslint-disable-line newline-per-chained-call
    .pressKey('backspace')
    .expect(el.value).eql('2') // eslint-disable-line newline-per-chained-call
    .pressKey('backspace')
    .expect(el.value).eql(''); // eslint-disable-line newline-per-chained-call
});

test('Does nothing if backspace is pressed multiple times on empty field', async (t) => {
  const el = Selector('input#time-ex');
  await t
    .typeText(el, '1')
    .pressKey('backspace')
    .pressKey('backspace')
    .pressKey('backspace')
    .expect(el.value).eql(''); // eslint-disable-line newline-per-chained-call
});
