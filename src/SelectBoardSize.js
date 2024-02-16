import {useState} from 'react'
import { maxSize, minSize } from './GameConstants';

const SelectBoardSize = ({onClick, initPlayer}) => {
    const [value, setValue] = useState(3);
    const isDisabled = initPlayer || value < minSize || value > maxSize;
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleClick = () => { 
        onClick(+value)
    }

    return (<>
        <div>
            Выберите размер игрового поля от {minSize} до {maxSize}:
        </div>
        <input type='number' min={minSize} max={maxSize} id='inputBoardSize' value={value} onChange={handleChange}></input>
        <button id='startButton' disabled={isDisabled} onClick={() => handleClick(value)}>START</button>
    </>)
}

export default SelectBoardSize