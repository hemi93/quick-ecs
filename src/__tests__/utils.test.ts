import { uuidv4 } from '../utils';

describe('utils', () => {
  describe('uuidv4', () => {
    test('generates uuidv4 compliant id', () => {
      const generatedId = uuidv4();
      const match = /^(\w{8}-\w{4}-4\w{3}-\w{4}-\w{12})$/.test(generatedId);

      expect(match).toBe(true);
    });
  });
});
