export default function Square({value, onSquareClick, index, winningCombination}) {
    const isWinningSquare = winningCombination.includes(index);
    return (
        <button
        className={`square ${isWinningSquare ? 'winning' : ''}`}
        onClick={onSquareClick}
        >
        {value}
        </button>
    );
}
