import util from 'util';
import CustomPromise from '../index.js';

const resolveMessage = 'Resolved!';

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise);
});

test('then()', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    setTimeout(() => resolve(resolveMessage), 100);
  });
  expect(util.inspect(resolvedPromise).toLowerCase()).toContain('pending');
  const resolveString = await resolvedPromise
    .then(async (message) => `Another ${message}`);
  expect(util.inspect(resolvedPromise).toLowerCase()).not.toContain('pending');
  expect(resolveString).toEqual(`Another ${resolveMessage}`);

  // eslint-disable-next-line jest/valid-expect-in-promise
  const resolveChainResult = await resolvedPromise
    .then((message) => `New another ${message}`)
    .then((message) => message.split(' '))
    .then((array) => array.reverse())
    .then((array) => array.join(''));
  expect(resolveChainResult).toEqual(`New another ${resolveMessage}`.split(' ').reverse().join(''));
});
