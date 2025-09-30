const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Sort by file path manually
    return tests.sort((a, b) => a.path.localeCompare(b.path));
  }
}

module.exports = CustomSequencer;
