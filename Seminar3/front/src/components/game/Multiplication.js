import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Multiplication = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (first * second === parseInt(value)) {
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      setResult("정답입니다");
    } else {
      setValue('');
      setResult("땡");
    }
    inputRef.current.focus();
  }
  const onClick = (e) => {
    setFirst(Math.ceil(Math.random() * 9));
    setSecond(Math.ceil(Math.random() * 9));
    setValue("");
    setResult("");
  }
  const inputRef = useRef();
  return (
    <Fragment>
      <h2>이곳은 구구단 게임장입니다.</h2>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input ref={inputRef} value={value} onChange={(e) => onChange(e)} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
      <button className="btn btn-dark my-1" onClick={(e) => onClick(e)}>
        다음문제
      </button>
      <Link to="/Game" className="btn btn-dark my-1">
        다른 게임하기
      </Link>
    </Fragment >
  );
};

export default Multiplication;