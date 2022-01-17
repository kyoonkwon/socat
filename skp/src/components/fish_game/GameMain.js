import React, { useState, useEffect, useRef} from 'react';
import SeaImg from './image/background.jpg';
import Fish from './Fish';
import Fishing from './Fishing';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {AiFillHome} from "react-icons/ai";
import fishImg1 from './image/fish1.png'
import fishImg2 from './image/fish2.png'
import fishImg3 from './image/fish3.png'

const useStyles = makeStyles(() => ({
    root: {

    },
    // button: {
    //     border: '1px solid black',
    //     magin: '50px 0 0 50px',
    //     position: 'absolute',
    //     width: '1000px',
    //     height: '50px',
    //     fontWeight: 'bold',
    //     fontSize: '50px',
    //     textTransform: 'initial'
    // }
}))

function GameMain(props) {
    //init
    const interval = useRef();

    var {setFishImg} = props;

    const [isStart, setIsStart] = useState(true);
    const [result, setResult] = useState(0);
    const [isMove, setIsMove] = useState(false);
    const [minDis, setMinDis] = useState(140000);
    const [maxDis, setMaxDis] = useState(160000);

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
            console.log("click")
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
                setIsStart(true)              
            }
        }        
    }

    const buttonStyle = {"width" : 120 ,"height" : 70, "margin" : 10,  "backgroundColor": "#21b6ae", "box-shadow" : "5px 5px 5px 5px gray"}; 
    var {setMode} = props;
    const iconStyle = {"width" : 110 ,"height" : 60}

    return (
        <div>
            {
                //isStart ?
                    <div id="fish_game">
                        <div>
                            {/* <div className={classes.timer}>
                                <div style={{padding: '10px', fontSize: '40px', font: 'bold'   }}>낚시 게임</div>
                            </div> */}
                            <Fish setFishImg= {props.setFishImg} fishImg={fishImg1}/>
                            <Fish setFishImg= {props.setFishImg} fishImg={fishImg2}/>
                            <Fish setFishImg= {props.setFishImg} fishImg={fishImg3}/>
                            <Fishing />
                            <img src={SeaImg} width="500" height="500" style={
                            { position: 'fixed',
                                zIndex:'-2',
                                left: '35%',
                            }}/>
                        </div>
                        <Button variant="text" style= {buttonStyle, {marginTop: '520px'}} onClick={() => {setMode(1);}}><AiFillHome style = {iconStyle}/></Button>
                    </div>
                
                //:
                //<div>
                    
                //     {/* <Button onClick={handleClickStartButton} className = {classes.button} >
                //         Click to Start Game!
                //     </Button>     */}
                //</div>  
                             
            }
        </div>
    )
}
export default GameMain;