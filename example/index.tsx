import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import JsonTree from '../src/index';

const App = () => {
  return (
    <div>
      <JsonTree />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
