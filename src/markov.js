// src/markov.js
class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let text = [key];

    for (let i = 1; i < numWords; i++) {
      let nextWords = this.chains[key];
      if (!nextWords) {
        break;
      }
      key = nextWords[Math.floor(Math.random() * nextWords.length)];
      if (key === null) {
        break;
      }
      text.push(key);
    }

    return text.join(' ');
  }
}

module.exports = { MarkovMachine };