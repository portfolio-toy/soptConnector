import React, { Fragment, useState, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import TRY from './Try';
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};
const NumberBaseball = memo(() => {
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런');
      setTries([...tries, { try: value, result: '홈런!' }]);
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer}입니다.`);
        alert('게임을 다시 시작합니다');
        setAnswer(getNumbers());
        setValue('');
        setResult('');
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
          setResult(`${strike} 스트라이크 ,${ball} 볼입니다`);
          setTries([
            ...tries,
            {
              try: value,
              result: `${strike} 스트라이크 ,${ball} 볼입니다`,
            },
          ]);
          setValue('');
        }
      }
    }
    inputRef.current.focus();
  };
  const onClick = (e) => {
    setAnswer(getNumbers());
    setValue('');
    setResult('');
    setTries([]);
  };
  const inputRef = useRef();
  return (
    <Fragment>
      <h2>이곳은 숫자야구 게임장입니다.</h2>
      <div>{result}</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          ref={inputRef}
          maxLength={4}
          value={value}
          onChange={(e) => onChange(e)}
        />
        <button>입력!</button>
      </form>
      <div>시도 횟수 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <TRY key={`${i + 1}차 시도 : `} tryInfo={v} />;
        })}
      </ul>
      <button className="btn btn-dark my-1" onClick={(e) => onClick(e)}>
        다음문제
      </button>
      <Link to="/Game" className="btn btn-dark my-1">
        다른 게임하기
      </Link>
    </Fragment>
  );
});

export default NumberBaseball;
