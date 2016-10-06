
import React from 'react';

import Login from './examples/Login';
import LoginNative from './examples/LoginNative';
import RBLogin from './examples/RBLogin';
import Select from './examples/Select';
import RBSelect from './examples/RBSelect';


export default class Examples extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Login />
        </div>

        <div>
          <LoginNative />
        </div>

        <div>
          <RBLogin />
        </div>

        <div>
          <Select />
        </div>

        <div>
          <RBSelect />
        </div>

      </div>
    );
  }
}
