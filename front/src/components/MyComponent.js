import React, { Component } from 'react';
import PropsTypes from 'prop-types';

class MyComponent extends Component {
  static defaultProps = {
    name: "남궁권",
    phone: "010-1133-1313"
  }
  static PropsTypes = {
    name: PropsTypes.string,
    phone: PropsTypes.string
  }
  render() {
    const { name, phone } = this.props;
    return (
      <div>
        <h1>안녕하세요, 제 이름은 {name} 입니다.</h1>
        <div>그리고 제 핸드폰 번호는 {phone} 입니다.</div>
      </div>
    );
  }
}

export default MyComponent;

// import React from 'react';
// import PropsTypes from 'prop-types';

// const MyComponent = ({ name, phone }) => {
//   return (
//     <div>
//       <h1>안녕하세요, 제 이름은 {name} 입니다.</h1>
//       <div>그리고 제 핸드폰 번호는 {phone} 입니다.</div>
//     </div>
//   );
// };
// MyComponent.defaultProps = {
//   name: "남궁권",
//   phone: "010-1133-1313"
// }

// MyComponent.PropsTypes = {
//   name: PropsTypes.string,
//   phone: PropsTypes.string
// }
// export default MyComponent;