import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RAnimate } from '../.';
import 'animate.css'

const App = () => {
  return (
    <div>
      db
      <RAnimate 
        tag='div' 
        clsPrefix='animate__'
        // cls='animated bounce infinite'
        cls='animated backInDown'
        initialVisible={false}
        getVisibleWhenAnimateEnd={(cls: string) => {
          if (cls.includes('Out')) {
            return false
          }
          return true;
        }}
      >
        我是王世安，66666
      </RAnimate>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
