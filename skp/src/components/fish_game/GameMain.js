import React, { useState, useEffect, useRef } from 'react';
import SeaImg from './image/background.jpg';
import Fish from './Fish';
import Fishing from './Fishing';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    root: {

    },
    button: {
        border: '1px solid black',
        magin: '50px 0 0 50px',
        position: 'absolute',
        width: '1000px',
        height: '50px',
        fontWeight: 'bold',
        fontSize: '50px',
        textTransform: 'initial'
    }
}))

function GameMain() {
    //init
    const interval = useRef();

    const [isStart, setIsStart] = useState(false);
    const [result, setResult] = useState(0);
    const [isMove, setIsMove] = useState(false);

    useEffect(() => {
        if(isStart) {
            interval.current = setInterval(() => {
                setIsMove(true)
            })
        }
        return () => {
            clearInterval(interval.current)
        }
    });

    const classes = useStyles();

    // game start
    const handleClickStartButton = () => {
        setIsStart(true)
    }
    // fish, fishing rod conflict
    const checkConflict = () => {
        let fish = document.querySelector('img#fish');
        let fishing = document.querySelector('img#fishing');

        if( fish !== null && fishing !== null) {
            let dis = Math.pow(fish.x - fishing.x, 2) + Math.pow(fish.y - fishing.y, 2)
            if(dis < 3000){
                alert("낚시 성공!!")
                //setResult 으로 낚은 물고기 보여주기
                setIsStart(false)             
            }
        }
    }

    return (
        <div>
            {
                isStart ?
                <div id="fish_game" text-align="center">
                    <Fish />
                    <Fishing />
                    <img src={SeaImg} width="500" height="500"/>
                    <div className={classes.timer}>
                        <div>낚시 게임!</div>
                    </div>
                </div>
                :
                <div>
                    <Button onClick={handleClickStartButton} className = {classes.button} >
                        Click to Start Game!
                    </Button>    
                </div>               
            }
        </div>
    )
}
export default GameMain;