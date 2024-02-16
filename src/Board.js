import Square from "./Square";
import React, { useState} from "react";

export default function Board(props) {
    const sizeArr = props.size;
    const PLAYERS = props.players;
    const playersSize = PLAYERS.length

    const [nextPlayer, setNextPlayer] = useState(props.initPlayer);
    const [squares, setSquares] = useState(Array.from(({ length: sizeArr }), () => Array(sizeArr).fill(null)));
    const [winner, setWinner] = useState(null);
    const [status, setStatus] = useState(`Следующий игрок: ${PLAYERS[nextPlayer]}`);
    const [winningCombination, setWinningCombination] = useState([]);

    function handleClick(row, col) {                               
        if (squares[row][col] || winner) {
            return 
        }        
        const nextSquares = squares.map(i => i.slice());
        nextSquares[row][col] = PLAYERS[nextPlayer]
        setSquares(nextSquares);
        const isNextPlayer = ((nextPlayer === playersSize - 1) ? 0 : nextPlayer + 1);
        setNextPlayer(isNextPlayer);
        const win = calculateWinner(nextSquares,setWinningCombination)
        if (win) {
            setStatus( "Победитель - " + win);
            setWinner(win);
        } else if (!nextSquares.some((el)=> el.some((el)=> el === null))) {
            setStatus("Ничья!")
        } else {
            setStatus( "Следующий игрок: " + PLAYERS[isNextPlayer]);
        }
    } 
    return (
        <>
        <div className="board">
            {
                squares.map((_, row) =>
                    <div className="board-row" key={row}>
                        {
                            squares.map((_, col) => 
                                <Square key={`${row}.${col}`}
                                        index={row * sizeArr + col}
                                        value={squares[row][col]}
                                        onSquareClick={() => handleClick(row, col)}
                                        winningCombination={winningCombination} />
                            )
                        }
                    </div>
                )
            }
        </div>
        <div className="status-content">
            <div className="status">{status}</div>
        </div>
        </>
    )
}

function isNull(arr) {
    return !arr
}
function isPositive(arr) {
    if (arr.some(isNull)) return null
    if (arr.every((el)=> el === arr[0])) return true
    else return null
}

function calculateWinner(squares, setWinningCombination) {
    const size = squares.length
    const arr = squares.flat();
    let winIndex=[];
    
    // по горизонтали и вертикали
    for (let i = 0; i < size; i++) {
        if (isPositive(squares[i])) {
            for(let k = size*i; winIndex.length !== size; k++){
                winIndex.push(k)
            }
            setWinningCombination(winIndex)
            return squares[i][0]
        }
        else winIndex=[]
        let arr3=[];
        for (let j=0; j<size; j++) {
            winIndex.push(j*size+i)
            arr3.push(squares[j][i])
        }
        if (isPositive(arr3)) {
            setWinningCombination(winIndex)
            return arr3[0]
        }
        else winIndex=[]
    }
    
    // по диагонали
    let arr1 = [];
    for (let i=0; i<arr.length; i+=size+1) {
        winIndex.push(i)
        arr1.push(arr[i]);
    }
    if (isPositive(arr1)) {
        setWinningCombination(winIndex)
        return arr1[0]
    }
    else winIndex = []
    
    // по другой диагонали
    let arr2 = [];
    for (let i=size-1; i<arr.length-1; i+=size-1) {
        winIndex.push(i)
        arr2.push(arr[i]);
    }
    if (isPositive(arr2)) {
        setWinningCombination(winIndex)
        return arr2[0]
    }
    return null;
}