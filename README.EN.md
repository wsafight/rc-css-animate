# rc-css-animate

Minimal react animation components. You need to use css to achieve animation
effects. Component only provides explicit and implicit control and animation
completion callback.

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

| parameter                | desc                                                                                                                               | type                     | default |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :------ |
| tag                      | String (div) or React component                                                                                                    | any                      | div     |
| clsPrefix                | css animation class prefix                                                                                                         | string                   | ''       |
| animateCls                      | css animation class （If there is a prefix, the prefix will be added）                                                               | string                   | ''      |
| className | tag component className  | string | '' |
| style | tag component  style  | CSSProperties ｜ undefined | undefined |
| childredn                | Subcomponents, no need to pass                                                                                                     | ReactNode                | -       |
| initialVisible           | Whether to display initially                                                                                                       | boolean                  | true    |
| onAnimationEnd           | animation end callback                                                                                                             | () => void               | null    |
| getVisibleWhenAnimateEnd | Get whether the component displays the function after the animation ends, if it returns false, the component will not be displayed | (cls: string) => boolean | null    |

```tsx
import React from "react";
import ReactCssAnimate from "rc-css-animate";
// Import animate.css auxiliary animation
import "animate.css";

function App() {
  return (
    <div className="App">
      <ReactCssAnimate
        tag="div"
        clsPrefix="animate__"
        // current animation
        animateCls="animated backInDown infinite"
        // The className and style of the current tag
        className=''
        style={{}}
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
import React from "react";
import ReactCssAnimate, { setPrefixCls } from "rc-css-animate";
import "animate.css";

// Set the global prefix, which will be overwritten by the current component
setPrefixCls("animate__");

function Block(props) {
  // Don't forget to put style, className and children
  const { className, children, style } = props;
  return (
    <div
      className={className}
      style={{
        background: "red",
        padding: 100,
        ...style
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
        animateCls="animated backInDown infinite"
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
import { CompatibleRAnimate as ReactCssAnimate } from "rc-css-animate";
```

## Changelog

- 1.0.0 Separate className and animateCls, provide style configuration
- 0.0.4 Support global configuration prefix
- 0.0.3 Basically usable, support RAnimate and CompatibleRAnimate components
