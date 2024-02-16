const SelectPlayer = ({onClick, players}) => {
    const handleClick = (index) => event =>
        {
            const playerButtons = document.getElementsByClassName("player-button");
            for (let i = 0; i < playerButtons.length; i++) {
                playerButtons[i].style.backgroundColor = '#ebe9e6';
            }
            event.target.style.backgroundColor = '#a6cee3';
            onClick(index); 
        }

    return (
        <div className="player-selector">
            <div>
                Выберите кто ходит первый...
            </div>
            <div className="players-list">
                {
                    players.map( (item, index) =>
                        <button
                            className="player-button"
                            key={index}
                            onClick={handleClick(index)}
                        >
                            { item }
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default SelectPlayer;
