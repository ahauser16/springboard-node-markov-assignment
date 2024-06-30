// __tests__/markov.test.js
const { MarkovMachine } = require('../src/markov');

describe('MarkovMachine', () => {
  test('constructor correctly splits input text into words and filters out empty strings', () => {
    const mm = new MarkovMachine("the cat  in the  hat ");
    expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
  });

  test('makeChains method correctly builds a map of word chains', () => {
    const mm = new MarkovMachine("the cat in the hat");
    const expectedChains = {
      "the": ["cat", "hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null]
    };
    mm.makeChains();
    expect(mm.chains).toEqual(expectedChains);
  });

  test('makeText method returns a string', () => {
    const mm = new MarkovMachine("the cat in the hat");
    const result = mm.makeText();
    expect(typeof result).toBe('string');
  });

  test('makeText method returns a string of approximately the requested length', () => {
    const numWords = 50;
    const mm = new MarkovMachine("the cat in the hat");
    const result = mm.makeText(numWords);
    const wordCount = result.split(' ').length;
  
    // Allowing a margin of error since the last word might not have a follow-up
    // Adjust the lower bound to account for shorter outputs
    const acceptableLowerBound = Math.floor(numWords * 0.8); // Example: 80% of numWords
    expect(wordCount).toBeLessThanOrEqual(numWords);
    expect(wordCount).toBeGreaterThanOrEqual(acceptableLowerBound);
  });

  test("makeText method's output only contains words that are present in the input text or null", () => {
    const inputText = "the cat in the hat";
    const mm = new MarkovMachine(inputText);
    const result = mm.makeText();
    const resultWords = result.split(' ');

    const inputWords = inputText.split(' ').concat([null]); // Adding null as a valid "word"

    resultWords.forEach(word => {
      expect(inputWords).toContain(word);
    });
  });

  // Add more tests here
});