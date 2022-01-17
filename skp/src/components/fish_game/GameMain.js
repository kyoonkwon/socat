import React, { useState, useEffect, useRef} from 'react';
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
    const [minDis, setMinDis] = useState(92000);
    const [maxDis, setMaxDis] = useState(98000);

    useEffect(() => {
        if(isStart) {
            document.addEventListener('keydown', handleKeySpace)
            interval.current = setInterval(() => {
                setIsMove(true)
            })
        }
        return () => {
            clearInterval(interval.current)
            document.removeEventListener('keydown', handleKeySpace)
        }
    });

    const classes = useStyles();

    // space 누를때 conflict 체크하기
    const handleKeySpace = (e) => {
        if (e.keyCode === 32) {
            checkConflict()
        }
    }

    // game start
    const handleClickStartButton = () => {
        setIsStart(true)
    }

    // fish, fishing rod conflict
    const checkConflict = () => {

        let fish = document.querySelector('img#fish');
        let fishing = document.querySelector('img#fishing');
        console.log("fish: "+fish)
        console.log("fishing: "+fishing)
        if( fish !== null && fishing !== null) {
            let dis = Math.pow(fish.x - fishing.x, 2) + Math.pow(fish.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                alert("낚시 성공!")
                /*
                if(window.confirm("낚시 성공!!\n\n물고기를 저장하시겠습니까?") === true){
                    // 저장 
                } else {
                    // 저장 안함          
                }
                */
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