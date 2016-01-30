title: Om + ClojureScript
author:
  name: Korneliusz Caputa
  twitter: elkorn
  url: http://elkorn.io
output: index.html
controls: true

--


# Om + ClojureScript
## React with less hassle

--

### Core ideas of React

- Components with one-way data flow
- Use of virtual DOM
- Abstraction over rendering methods (dom, string, canvas, native backends)

--

### Om

- A ClojureScript interface to React
- Not just bindings
- Additional elements to fill out gaps in React in an idiomatic CLJS way

--

### Om - features added

- Global state management
- Components may have arbitrary data dependencies, not limited to props & state
- Component construction can be intercepted (debugging win)
- Provides stream of all application state change deltas via :tx-listen.

--

### Om - key wins

- UI is represented as EDN (extensible data notation)
- CLJS data structures are immutable by default
  - speed benefits -> it is obvious which parts need to be re-rendered
  - memory benefits -> structural sharing, no copying
  - UI snapshotting and undo almost for free
  - much better testability

--

### Hello World from React

```
import ReactDOM from 'react-dom';
import { Component } from 'react';

const appState = {
    name: 'Whitney'
};

class HelloMessage extends Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
    <HelloMessage name={appState.name} />, 
    document.getElementById('app')
);
```

--

### Hello World from Om

```
(defonce app-state {:name "Whitney"})

(defn hello-message [data owner]
  (om/component
   ((dom/h1
     nil
     (str/join ["Hello" (:name data)]))))
  )

(om/root
  hello-message
  app-state
  {:target (. js/document (getElementById "app"))}
  )
```

--

### Non-obvious difference?

- In the pure React app, changing the `name` property of `appState` will not cause any changes in the UI.

- In Om, changing `:name` will cause the component to be updated.

--

### Immutable global app state (1/2)

- cohesive state ownership (don't have to think that much about state ownership)
- easy to maintain
- enables things (change tracking, undo etc.) 
- works well with tech. like Falcor or Relay

--

### Immutable global app state (2/2)

- Since it is immutable, there are tools prepared to work with it, namely Om cursors. 

### Component-local state

- standard hierarchical component state
- for determinign component tree visibility, mouse dragging, text editing etc., not "domain" state
- can be used by `(om/set-state! owner :key value)` and `(om/get-state owner :key)`

--

### Cursors

- Serve as 'windows' into pieces of a bigger structure.
- Enable clean modification of state, respecting immutability.
- The state passed to `om/root` gets a root cursor that is provided to child components.
- Functions for traversing the state structure: `get` and `get-in`.

--

# Demo

--

### Clojure goodies - async channels

- Very useful for event handling
- A well-defined construct instead of an ambient/implicit 'fog' of events flying aronud

- I have an example in the demo app...

--

### Clojure goodies - full-stack Clojure

- Having full-stack JS has some minor benefits, but it's not really that awesome.
- Full-stack Clojure seems to be much more interesting.
  - Much more powerful language
  - Similar protocols -> very little boilerplate

--

# Thx

--

### Resources

To watch:

- https://www.youtube.com/watch?v=4-oyZpLRQ20 (Om + D3 for data visualization, awesome practical presentation)
- https://www.youtube.com/watch?v=j-kj2qwJa_E (Figwheel - livereload on steroids)
- https://www.youtube.com/watch?v=G7Z_g2fnEDg (Devcards - TDD++)
- https://www.youtube.com/watch?v=xz389Ek2eS8 (Om Next - upcoming version of Om)

--

### Resources

To read:

- Tutorials and docs are on https://github.com/omcljs/om
- Overview post http://swannodette.github.io/2015/12/23/year-in-review/
