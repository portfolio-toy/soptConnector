import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();
  const cheatingCount = useRef(0);

  const onClickScreen = () => {
    if(state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭.');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    } else if(state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
      cheatingCount.current++;
    } else if(state ==='now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current -startTime.current];
      })
    }
  };
  const onReset = () => {
    setResult([]);
  };
  const renderAverage = () => {
    return result.length === 0 
      ? null 
      : <>
      <div>
        평균시간 :  {result.reduce((a,c) => a+ c) / result.length}ms
      </div>
      <button onClick={onReset}>리셋</button>
      </>
  }
  return (
    <Fragment>
      <h2>이곳은 반응속도 게임장입니다.</h2>
      <div id="screen" className={state} onClick={onClickScreen}>{message}</div>
      <div>
        부정행위 횟수 :  {cheatingCount.current} 번
      </div>
      {renderAverage()}
      <div>
        <Link to="/Game" className="btn btn-dark my-1">
          다른 게임하기
        </Link>
      </div>
    </Fragment>
  );
};

export default ResponseCheck;
