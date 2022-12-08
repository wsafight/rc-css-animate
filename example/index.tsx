import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RAnimate, CompatibleRAnimate } from '../.';
import 'animate.css'

const App = () => {
  return (
    <div>
      db
      <RAnimate 
        tag='div' 
        clsPrefix='animate__'
        cls='animated bounce infinite'
        // cls='animated backInDown'
        initialVisible={false}
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

      <CompatibleRAnimate
        tag='div' 
        clsPrefix='animate__'
        cls='animated bounce infinite'
        // cls='animated backInDown'
        initialVisible={false}
        getVisibleWhenAnimateEnd={(cls: string) => {
          if (cls.includes('Out')) {
            return false
          }
          return true;
        }}
      >
        123123      
      </CompatibleRAnimate>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
