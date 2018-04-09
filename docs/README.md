<a name="Store"></a>

## Store : [<code>Store</code>](#Store)
A Store holds an object as it's internal state.
The state can be read with `.getState(keyPath, defaultValue)`
State can be set by reducers in the `.reducers` array.
Trigger the reducers to run with `.action(obj)`.
Once the reducers run, `.onChange` is called with the new state.

**Kind**: global class  

* [Store](#Store) : [<code>Store</code>](#Store)
    * [.action(actionObj)](#Store+action) ⇒ <code>Object</code>
    * [.get(path, defaultValue)](#Store+get) ⇒ <code>Object</code>

<a name="Store+action"></a>

### store.action(actionObj) ⇒ <code>Object</code>
Performs an action on the store.
Triggers the onChange callbacks with the new state.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Object</code> - returns the new state.  

| Param | Type | Description |
| --- | --- | --- |
| actionObj | <code>Object</code> | is added to each reducer along with the current state. |

<a name="Store+get"></a>

### store.get(path, defaultValue) ⇒ <code>Object</code>
Returns the value at path.
If the value doesn't exist, it will return defaultValue or undefined.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Refrence:**: https://lodash.com/docs/4.17.4#get  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | path of the property to get. |
| defaultValue | <code>Object</code> | value to return if there is no value at path. |

