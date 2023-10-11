function Card({ style, index, eventHandler }) {
    // Return JSX for a card, using style, index, and eventHandler as props.
    return (
        <div id={index} key={index}
            name="card"
            className="col-sm-2 card"
            style={style}
            onClick={eventHandler}
        >&nbsp;
        </div>
    );
}

export default Card;