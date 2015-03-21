# Setup

    npm install jsxtransformify -save

# Usage

    browserify -t jsxtransformify widget.js -o output.js


## Example

### docblock

Only files with the /** @jsx DOM */ docblock will be parsed.

### React

```jsx
/** @jsx react.createElement */

var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

Transformed into JS:

```javascript
var profile = react.createElement('div', null, [
  react.createElement('img', { src: "avatar.png", class: "profile" }),
  react.createElement('h3', null, [[user.firstName, user.lastName].join(' ')])
]);
```

### virtual-dom

```jsx
/** @jsx h */
var h = require('virtual-dom/h');

var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

```javascript
var h = require('virtual-dom/h');

var profile = h('div', null, [
  h('img', { src: "avatar.png", class: "profile" }),
  h('h3', null, [[user.firstName, user.lastName].join(' ')])
]);
```

