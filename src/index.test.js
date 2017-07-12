import expect from 'expect.js';
import Store from './index.js';

describe('Store', () => {
  let store;

  beforeEach(() => {
    store = new Store({
      scene: '🏞',
      board: [
        {id: 'one', checked: true},
        {id: 'two', checked: false},
      ],
    });
  });

  it('can set inital state', () => {
    store = new Store({
      type: '🕹',
    });

    const state = store.getState();
    expect(state.type).to.eql('🕹');
  });

  describe('.getState', () => {
    it('(); returns entire state', () => {
      const state = store.getState();
      expect(state).to.eql({
        scene: '🏞',
        board: [
          {id: 'one', checked: true},
          {id: 'two', checked: false},
        ],
      });
    });

    it('(path); returns value at path', () => {
      const state = store.getState('board[1]');
      expect(state.id).to.eql('two');
    });
  }); // .getState

  describe('.action()', () => {
    beforeEach(() => {
      // setup testing reducers
      store.reducers = [
        setProperty,
        setAndAction,
      ];
    });

    it('can update the state', () => {
      store.action({
        type: 'set',
        key: 'type',
        value: '🕹',
      });
      const state = store.getState();
      expect(state.type).to.eql('🕹');
    });

    it('can trigger another action', (done) => {
      store.onChange = () => {
        const state = store.getState();
        expect(state).to.eql({
          type: '🎈',
          scene: '🌄',
          board: [
            {id: 'one', checked: true},
            {id: 'two', checked: false},
          ],
        });
        done();
      };
      store.action({
        type: 'set&Action',
        key1: 'type', value1: '🎈',
        key2: 'scene', value2: '🌄',
      });

    });
  }); // .action
});

// testing reducers
function setProperty(state, action) {
  const { type, key, value } = action;
  if (type !== 'set') { return state; }

  state[key] = value;
  return state;
}

function setAndAction(state, action, nextAction) {
  const { type, key1, key2, value1, value2 } = action;
  if (type !== 'set&Action') { return state; }

  // Update the state
  state[key1] = value1;
  // Trigger the next action to update state.
  nextAction({
    type: 'set',
    key: key2,
    value: value2,
  });

  return state;
}
