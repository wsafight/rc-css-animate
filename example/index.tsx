import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RAnimate, setPrefixCls } from '../.';
import 'animate.css'

setPrefixCls('animate__')

const App = () => {
  return (
    <div>
      db
      <RAnimate 
        tag='div' 
        cls='animated bounce infinite'
        // cls='animated backInDown'
        initialVisible={true}
        getVisibleWhenAnimateEnd={(cls: string) => {
          if (cls.includes('Out')) {
            return false
          }
          return true;
        }}
      >
        <div  onClick={() => {
          alert('123')
        }}>
          测试动画
        </div>
      </RAnimate>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
