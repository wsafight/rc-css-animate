# rc-css-animate

Read this in other languages:
[English](https://github.com/wsafight/rc-css-animate/blob/main/README.EN.md)

极简 react 动画组件。需要利用 css 实现动画效果。组件只提供显隐控制和动画完成回调。

开发历程可以参考博客 [手写一个 React 动画组件](https://github.com/wsafight/personBlog/issues/53)

## 安装

```bash
npm install rc-css-animate
```

或者

```bash
yarn install rc-css-animate
```

## 用法

### 参数

| 参数                       | 说明                                  | 类型                       | 默认值  |
| :----------------------- | :---------------------------------- | :----------------------- | :--- |
| tag                      | 字符串（div）或者 React 组件                 | any                      | div  |
| clsPrefix                | css 动画 class 前缀                     | string                   | ''   |
| animateCls                      | css 动画 class（有前缀会添加前缀）              | string                   | ''   |
| className | tag 组件 className  | string | '' |
| style | tag 组件 style  | CSSProperties ｜ undefined | undefined |
| childredn                | 子组件，无需特意传递                          | ReactNode                | -    |
| initialVisible           | 初始是否展现                              | boolean                  | true |
| onAnimationEnd           | 动画结束回调                              | () => void               | null |
| getVisibleWhenAnimateEnd | 获取动画结束后组件是否展现函数，如果返回 false，则不会显示该组件 | (cls: string) => boolean | null |

```tsx
import React from "react";
import ReactCssAnimate from "rc-css-animate";
// 引入 animate.css 辅助动画
import "animate.css";

function App() {
  return (
    <div className="App">
      <ReactCssAnimate
        tag="div"
        clsPrefix="animate__"
        // 当前 tag 的 className 和 style
        className=''
        style={{}}
        // 当前动画
        animateCls="animated backInDown infinite"
        initialVisible={false}
        getVisibleWhenAnimateEnd={(cls) => {
          // 如果当前 className 中有 Out
          // 返回 false 则会在动画结束后不再显示
          if (cls.includes("Out")) {
            return false;
          }
          return true;
        }}
        // 动画结束回调
        onAnimationEnd={() => {
          console.log("done");
        }}
      >
        <div>
          测试动画
        </div>
      </ReactCssAnimate>
    </div>
  );
}

export default App;
```

使用自己定义的组件传入以及设置全局 prefix

```tsx
import React from "react";
import ReactCssAnimate, { setPrefixCls } from "rc-css-animate";
import "animate.css";

// 设置全局 prefix,会被当前组件覆盖
setPrefixCls("animate__");

function Block(props) {
  // 别忘记放入 style、 className 和 children
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
        // 当前动画
        animateCls="animated backInDown infinite"
        initialVisible={false}
        getVisibleWhenAnimateEnd={(cls) => {
          // 如果当前 className 中有 Out
          // 返回 false 则会在动画结束后不再显示
          if (cls.includes("Out")) {
            return false;
          }
          return true;
        }}
        // 动画结束回调
        onAnimationEnd={() => {
          console.log("done");
        }}
      >
        <div>
          测试动画
        </div>
      </ReactCssAnimate>
    </div>
  );
}
```

不支持 hooks 的版本

```ts
// 导入兼容的组件
import { CompatibleRAnimate as ReactCssAnimate } from "rc-css-animate";
```

## 升级日志
- 1.0.1 优化性能，去除不必要的 prefixCls 处理
- 1.0.0 分离 className 和 animateCls,提供 style 配置
- 0.0.4 支持全局配置 prefix
- 0.0.3 基本可用，支持 RAnimate 以及 CompatibleRAnimate 组件
