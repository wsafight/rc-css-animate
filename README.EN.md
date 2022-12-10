# rc-css-animate

Minimal react animation components. You need to use css to achieve animation effects. Component only provides explicit and implicit control and animation completion callback.

## Install

```bash
npm install rc-css-animate
```

or

```bash
yarn install rc-css-animate
```

## Usage

### parameter

| parameter                       | desc                | type                       | default  |
| :----------------------- | :---------------------------------- | :----------------------- | :--- |
| tag                      | String (div) or React component    | any                      | div  |
| clsPrefix                | css animation class prefix     | string                   | -    |
| cls                      |css animation class （If there is a prefix, the prefix will be added）              | string                   | -    |
| childredn                |Subcomponents, no need to pass    | ReactNode                | -    |
| initialVisible           | Whether to display initially             | boolean                  | true |
| onAnimationEnd           | animation end callback   | () => void               | null |
| getVisibleWhenAnimateEnd | Get whether the component displays the function after the animation ends, if it returns false, the component will not be displayed | (cls: string) => boolean | null |

```tsx
import React, { createRef, useEffect } from "react";
import ReactCssAnimate from "rc-css-animate";
// Import animate.css auxiliary animation
import "animate.css";

function App() {
  return (
    <div className="App">
      <ReactCssAnimate
        tag='div'
        clsPrefix="animate__"
        // current animation
        cls="animated backInDown infinite"
        initialVisible={false}
        getVisibleWhenAnimateEnd={(cls) => {
          // If there is an Out in the current className
          // Return false to stop displaying after the animation ends
          if (cls.includes("Out")) {
            return false;
          }
          return true;
        }}
        // animation end callback
        onAnimationEnd={() => {
          console.log("done");
        }}
      >
        <div>
          test animate
        </div>
      </ReactCssAnimate>
    </div>
  );
}

export default App;
```

Pass in using your own defined components

```tsx
function Block(props) {
  // Don't forget to put className and children
  const { className, children } = props;
  return (
    <div
      className={className}
      style={{
        background: "red",
        padding: 100,
      }}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ReactCssAnimate
        tag={Block}
        clsPrefix="animate__"
        // current animation
        cls="animated backInDown infinite"
        initialVisible={false}
        getVisibleWhenAnimateEnd={(cls) => {
          // If there is an Out in the current className
          // Return false to stop displaying after the animation ends
          if (cls.includes("Out")) {
            return false;
          }
          return true;
        }}
        // animation end callback
        onAnimationEnd={() => {
          console.log("done");
        }}
      >
        <div>
          test animate
        </div>
      </ReactCssAnimate>
    </div>
  );
}
```

A version that does not support hooks

```ts
// Import compatible components
import { CompatibleRAnimate as ReactCssAnimate } from 'rc-css-animate'
```
