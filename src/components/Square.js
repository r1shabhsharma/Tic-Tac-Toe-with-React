import React from 'react'

function Square({ value, chooseSquare }) {
    return (
        <div className="square" onClick={chooseSquare}>
            <div className="value">
                {value}
            </div>
        </div>
    )
}

export default Square;