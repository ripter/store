// from: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
const getValueAtPath = (obj, path, defaultValue = null) =>
  String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((a, c) => (Object.hasOwnProperty.call(a,c) ? a[c] : defaultValue), obj);

/**
 * A Store holds an object as it's internal state.
 * The state can be read with `.getState(keyPath, defaultValue)`
 * State can be set by reducers in the `.reducers` array.
 * Trigger the reducers to run with `.action(obj)`.
 * Once the reducers run, `.onChange` is called with the new state.
 * @type {Store}
 */
class Store {
  constructor(initalState, reducers, onChange) {
    this._state = initalState;
    this._pendingActions = [];

    this.onChange = onChange;
    // Reducers: (state, action, nextAction) => state
    this.reducers = reducers;
  }

  /**
   * Performs an action on the store.
   * Triggers the onChange callbacks with the new state.
   * @param  {Object} actionObj is added to each reducer along with the current state.
   * @return {Object} returns the new state.
   */
  action(actionObj) {
    const { onChange, _pendingActions, _state } = this;
    let state;

    // perform the action on our state.
    state = this.runReducers(_state, actionObj);
    // Run the reduers until all pending actions have been handled.
    while(_pendingActions.length > 0) {
      const nextActionObj = _pendingActions.pop();
      state = this.runReducers(state, nextActionObj);
    }

    // Trigger that we changed.
    if (onChange) { onChange(state); }
    this._state = state;
    return state;
  }

  /**
   * Runs all the reducers and returns the new state.
   * *SideEffect:* allows reducers to add to this._pendingActions
   * @private
   * @param  {Object} state
   * @param  {Object} actionObj
   * @return {Object} new state
   */
  runReducers(state, actionObj) {
    const { reducers, _pendingActions } = this;
    const pushNextAction = (nextActionObj) => {
      _pendingActions.push(nextActionObj);
    };

    return reducers.reduce((acc, reducer) => {
      // call each reducer function.
      // (state, actionObj, nextAction) -> newState
      const newState = reducer(acc, actionObj, pushNextAction);
      // reducers *MUST* return the updated state. Check for errors.
      if (newState == null) { throw new Error(`Store: Reducers must return a state object.\nStore: Got '${newState}' instead.`); }
      return newState;
    }, state);
  }

  /**
   * Returns the value at path.
   * If the value doesn't exist, it will return defaultValue or undefined.
   * @refrence: https://lodash.com/docs/4.17.4#get
   * @param {String} path - path of the property to get.
   * @param {Object} defaultValue - value to return if there is no value at path.
   * @return {Object}
   */
  get(path, defaultValue) {
    const { _state } = this;
    if (!path) { return _state; }
    return getValueAtPath(_state, path, defaultValue);
  }
}

export { Store as default };
