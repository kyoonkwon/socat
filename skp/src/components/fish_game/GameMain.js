import React, { useState, useEffect, useRef} from 'react';
import SeaImg from './image/background.jpg';
import Fish, { checkConflict } from './Fish';
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
}))

function GameMain(props) {
    //init
    const interval = useRef();

    var {setFishImg} = props;

    const [isStart, setIsStart] = useState(true);
    const [result, setResult] = useState(0);
    const [isMove, setIsMove] = useState(true);
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

    // fish, fishing rod conflict
    function checkConflict(props) {                
        
        let fish1 = document.querySelector('img#fish1');
        let fish2 = document.querySelector('img#fish2');
        let fish3 = document.querySelector('img#fish3');
        let fishing = document.querySelector('img#fishing');

        // console.log("fish: "+fish2)
        // console.log("fishing: "+fishing)
        if( fish1 !== null && fishing !== null) {
            let dis = Math.pow(fish1.x - fishing.x, 2) + Math.pow(fish1.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                alert("낚시 성공!" + fish1.src)
                //setResult 으로 낚은 물고기 보여주기    
            }
        }
        if( fish2 !== null && fishing !== null) {
            let dis = Math.pow(fish2.x - fishing.x, 2) + Math.pow(fish2.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                alert("낚시 성공!" + fish2.src)
                //setResult 으로 낚은 물고기 보여주기    
            }
        }
        if( fish3 !== null && fishing !== null) {
            let dis = Math.pow(fish3.x - fishing.x, 2) + Math.pow(fish3.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                alert("낚시 성공!" + fish3.src)
                //setResult 으로 낚은 물고기 보여주기    
            }
        }
        
        
    }

    const buttonStyle = {"width" : 120 ,"height" : 70, "margin" : 10,  "backgroundColor": "#21b6ae", "box-shadow" : "5px 5px 5px 5px gray"}; 
    const iconStyle = {"width" : 110 ,"height" : 60}
    
    return (
            
            <div id="fish_game" style={{width:"100%", height:"100%", backgroundImage:"url(img/background.jpg)"}}>
                    {/* <div className={classes.timer}>
                        <div style={{padding: '10px', fontSize: '40px', font: 'bold'   }}>낚시 게임</div>
                    </div> */}
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg1} fishId="1"/>
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg2} fishId="2"/>
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg3} fishId="3"/>
                    <Fishing />
            </div>
                

                             
            
    )
}
export default GameMain;