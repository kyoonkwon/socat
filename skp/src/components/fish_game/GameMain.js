import React, { useState, useEffect, useRef } from 'react';
import SeaImg from './image/background.jpg';
import Fish from './Fish';
import FishingRod from './FishingRod';
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
    const updateTime = 20;
    const interval = useRef();

    const [isStart, setIsStart] = useState(false);
    const [time, setTime] = useState(0);
    const [result, setResult] = useState(0);
    const [isMove, setIsMove] = useState(false);

    useEffect(() => {
        if(isStart) {
            interval.current = setInterval(() => {
                if(Math.floor(time)%2 === 1){
                    setIsMove(true)
                } else {
                    setIsMove(false)
                }
                setTimeout(time + updateTime * 0.001)
                checkConflict();
            }, updateTime)
        }
        return () => {
            clearInterval(interval.current)
        }
    }, [time, isStart]);

    const classes = useStyles();

    // game start
    const handleClickStartButton = () => {
        setIsStart(true)
    }
    // fish, fishing rod conflict
    const checkConflict = () => {
        let fish = document.querySelector('img#fish');
        let fishingRod = document.querySelector('img#fishingRod');

        if( fish !== null && fishingRod !== null) {
            let dis = Math.pow(fish.x - fishingRod.x, 2) + Math.pow(fish.y - fishingRod.y, 2)
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
                    <FishingRod />
                    <img src={SeaImg} width="500" height="500"/>
                    <div className={classes.timer}>
                        <div>낚시 게임!</div>
                        <div style={{ margin: "0 0 0 50px" }}> 
                        Time : 
                        </div>
			            <div style={{ margin: "0 0 0 10px" }}>
                            {Math.floor(time)}s
                        </div>
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