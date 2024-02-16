import Board from "./Board"
import SelectPlayer from "./SelectPlayer";
import React, { useState } from "react";
import { PLAYERS } from "./GameConstants";
import SelectBoardSize from "./SelectBoardSize";



export default function App(props) {
  const [value, setValue] = useState('');
  const [size, setSize] = useState(0);
  function handleClick(value) {
    setValue(value)
  }
  function handleClickk(x) {
    setSize(x)
  }

  if (size !== 0 && value !== ''){
    return (
        <div className="game game-board">
          <Board initPlayer={value} size={size} players={PLAYERS}/>
        </div>
      );
  }
  else {
    return (<>
        <div className="game player-selector">
          <SelectPlayer onClick={handleClick} players={PLAYERS}/>
        </div>
        <div>
          <SelectBoardSize onClick={handleClickk} initPlayer={value === ''}/>
        </div>
        </>
      );
  }
}