import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'
import * as serviceWorker from './serviceWorker';

import calculateWinner from './calculate-winner';

//custom hook 
function useToggle(initialState = false) {
    const [state, setState] = React.useState(initialState);
    const toggle = () => setState(s => !s);
    return [state, toggle]
}

//reducer
function gameReducer(state, action) {
    const { squares, xIsNext } = state;
    switch (action.type) {
        case 'SELECT_SQUARE':
            {
                const { square } = action
                if (calculateWinner(squares) || squares[square]) {
                    return state;
                }
                const squaresCopy = [...squares]
                squaresCopy[square] = xIsNext ? 'X' : 'O';
                return {
                    squares: squaresCopy,
                    xIsNext: !xIsNext
                }
            }
        case 'RESET_SQUARE':
            {
                const squaresCopy = Array(9).fill(null)
                return {
                    squares: squaresCopy,
                    xIsNext: !xIsNext
                }
            }
        default:
            {
                throw new Error(`action type : ${action.type}`)
            }
    }
}


function Board() {
    // Data of the array
    //[null,null,null,
    // null,null,null,
    // null,null,null,]
    const [state, dispatch] = React.useReducer(gameReducer, {
        squares: Array(9).fill(null),
        xIsNext: true
    })

    const { squares, xIsNext } = state;

    const [squares, setSquares] = React.useState(Array(9).fill(null))
        // const [xIsNext,toggleXIsNext] = useToggle(true)

    function selectSquare(square) {
        // squares[square]='X'
        // const squaresCopy = [...squares]
        // if( squaresCopy[square] === null){
        //   squaresCopy[square]=xIsNext? 'X' :'O';
        //   setSquares(squaresCopy)
        //   // setXIsNext(x=> !x);
        //   toggleXIsNext();
        // }
        // setXIsNext(!xIsNext); this may give stale version of our state so use state updater function to use the fresher value of state 
        // if(calculateWinner(squares) || squares[square]){
        //     return null;
        //   }
        // setSquares(s=>{
        //   const squaresCopy = [...s]
        //     squaresCopy[square]=xIsNext? 'X' :'O';
        //     toggleXIsNext();
        //     return (squaresCopy)
        //     // setXIsNext(x=> !x);
        //   }
        // )

        dispatch({ type: 'SELECT_SQUARE', square })
    }

    function getStatus(squares, xIsNext) {
        const winner = calculateWinner(squares)
        if (winner) {
            return `Winner : ${winner}`

        } else if (squares.every(s => Boolean(s))) {
            return `Scratch : Cat's game`

        } else {
            return `Next Turn : ${xIsNext? 'X' :'O'}`
        }
    }

    function resetAll() {
        setSquares((Array(9).fill(null)))
            // dispatch({type:'RESET_SQUARES'})
    }

    const status = getStatus(squares, xIsNext)

    return ( <
        div >
        <
        button onClick = {
            () => resetAll()
        } > Play again < /button>

        <
        div className = "board-row" >
        <
        button className = "square"
        onClick = {
            () => selectSquare(0)
        } > { squares[0] } < /button> <
        button className = "square"
        onClick = {
            () => selectSquare(1)
        } > { squares[1] } < /button> <
        button className = "square"
        onClick = {
            () => selectSquare(2)
        } > { squares[2] } < /button> < /
        div > <
        div className = "board-row" >
        <
        button className = "square"
        onClick = {
            () => selectSquare(3)
        } > { squares[3] } < /button> <
        button className = "square"
        onClick = {
            () => selectSquare(4)
        } > { squares[4] } < /button> <
        button className = "square"
        onClick = {
            () => selectSquare(5)
        } > { squares[5] } < /button> < /
        div > <
        div className = "board-row" >
        <
        button className = "square"
        onClick = {
            () => selectSquare(6)
        } > { squares[6] } < /button> <
        button className = "square"
        onClick = {
            () => selectSquare(7)
        } > { squares[7] } < /button> <
        button className = "square"
        onClick = {
            () => selectSquare(8)
        } > { squares[8] } < /button> < /
        div > <
        div className = "status" > { status } < /div> < /
        div >
    )
}


function Game() {
    return ( <
        div className = "game" >
        <
        Board / >
        <
        /div>
    )
}

ReactDOM.render( < Game / > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();