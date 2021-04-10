import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const WordReply = () => {
  const [word, setWord] = useState('남궁권');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (word[word.length - 1].match(value[0])) {
      setWord(value);
      setValue('');
      setResult('정답입니다');
    } else {
      setValue('');
      setResult('땡');
    }
    inputRef.current.focus();
  };
  // const onClick = (e) => {
  //   setWord(Math.ceil(Math.random() * 9));
  //   setSecond(Math.ceil(Math.random() * 9));
  //   setValue('');
  //   setResult('');
  // };
  const inputRef = useRef();
  return (
    <Fragment>
      <h2>이곳은 끝말잇기 게임장입니다.</h2>
      <div>{word}</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input ref={inputRef} value={value} onChange={(e) => onChange(e)} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
      {/* <button  className="btn btn-dark my-1" onClick={(e) => onClick(e)}>
        다음문제
      </button> */}
      <div>
        <Link to="/Game" className="btn btn-dark my-1">
          다른 게임하기
        </Link>
      </div>
    </Fragment>
  );
};

export default WordReply;
