import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Ball from './Ball';
const getWinNumbers = () => {
  const candidate = Array(45).fill().map((v,i) => i+1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p-c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);
  
  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
      for(let i = 0;i<winNumbers.length -1;i++){
        timeouts.current[i] = setTimeout(() => {
           setWinBalls((prevBalls) =>[...prevBalls, winNumbers[i]]);
         }, (i+1)*1000);
       }
       timeouts.current[6] = setTimeout(() => {
         setBonus(winNumbers[6]);
         setRedo(true); // 한 번 더 버튼을 보여주기 위해
       },7000);
    return () => { // componentWillUnmount 역할
        timeouts.current.forEach((v) => {
          clearTimeout(v);
        });
    }
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
   // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate가  둘 다 수행
   // 바뀌는 값을 넣어주면 된다.

   useEffect(() => {
     console.log("로또 번호를 생성합니다.");
   }, [winNumbers]);
  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  };
  

  return (
    <Fragment>
      <h2>이곳은 로또추첨장입니다.</h2>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button className="btn" onClick={onClickRedo}>한번 더!</button>}
      <div>
        <Link to="/Game" className="btn btn-dark my-1">
          다른 게임하기
        </Link>
      </div>
    </Fragment>
  );
};

export default Lotto;
