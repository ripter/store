
# Store
The idea of the store, is that the data/state is only changed in predictable and testable ways. [`reducers`, `action`] This way the logic can be tested and updated as the application grows. New features can be tested by adding or removing reducers or adding new actions. You can be notified when an action happens by setting an `onChange` function.

```
// create the store
// Set the initial state, a Javascript Object
// Then the reducers that make up the logic of how the state changes.
// Finally a function to be called whenever the state changes.
const store = new Store({initial: 'state'}, [
  reduceFunctions,
], onChange);

// trigger a change
store.action({
  type: 'select',
  id: 'one',
});

// get the state
const init = store.get('initial');
```

## [API](https://ripter.github.io/store/)

## Install
```
npm install --save @ripter/store
```
