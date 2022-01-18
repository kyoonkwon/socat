import React, { useState, useEffect, useRef} from 'react';
import SeaImg from './image/background.jpg';
import Fish from './Fish';
import Fishing from './Fishing';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Paper, Typography, Button } from '@material-ui/core'
import fishImg1 from './image/fish1.png'
import fishImg2 from './image/fish2.png'
import fishImg3 from './image/fish3.png'
import fishImg4 from './image/fish4.png'
import fishImg5 from './image/fish5.png'
import ReactHowler from 'react-howler';
import BGM from './BGM.mp3';

const useStyles = makeStyles(() => ({
    root: {

    },
}))

function GameMain(props) {
    //init
    const interval = useRef();

    const [isStart, setIsStart] = useState(true);
    const [result, setResult] = useState(0);
    const [isMove, setIsMove] = useState(true); 
    const [minDis, setMinDis] = useState(145000);
    const [maxDis, setMaxDis] = useState(155000);
    const [modalOpen, setOpen] = useState(false);
    const [modalImg, setModalImg] = useState(0);
    const [fishcoin, setFishCoin] = useState(1);
    const [Ppress, setPpress] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if(isStart) {
            document.addEventListener('keydown', handleKeyP)
            document.addEventListener('keydown', handleKeySpace)
            interval.current = setInterval(() => {
                setIsMove(true)
            })
        }
        return () => {
            clearInterval(interval.current)
            document.removeEventListener('keydown', handleKeyP)
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
    
    // p 누르면 무조건 잡힘
    const handleKeyP = (e) => {
        if (e.keyCode === 80) {
            setPpress(true)
            checkConflict()
        }
    }

    // fish, fishing rod conflict
    function checkConflict() {
        
        const fish1 = document.querySelector('img#fish1');
        const fish2 = document.querySelector('img#fish2');
        const fish3 = document.querySelector('img#fish3');
        const fish4 = document.querySelector('img#fish4');
        const fish5 = document.querySelector('img#fish5');
        const fishing = document.querySelector('img#fishing');                

        console.log("fish: "+fish1)
        console.log("fishing: "+fishing)

        if(Ppress === true) {
            let num = Math.floor(Math.random() * 5) + 1
            setFishCoin(num)
            if(num === 1){
                setModalImg(fish1)
            } else if(num === 2) {
                setModalImg(fish2)
            } else if(num === 3) {
                setModalImg(fish3)
            } else if(num === 4) {
                setModalImg(fish4)
            } else if(num === 5) {
                setModalImg(fish5)
            } 
            handleOpen()
        }
        if( fish1 !== null && fishing !== null) {
            let dis = Math.pow(fish1.x - fishing.x, 2) + Math.pow(fish1.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                setFishCoin(1)
                setModalImg(fish1)
                handleOpen();
                //alert(fish1.id + " 낚시 성공!")
                //setResult 으로 낚은 물고기 보여주기
            }
        }
        if( fish2 !== null && fishing !== null) {
            let dis = Math.pow(fish2.x - fishing.x, 2) + Math.pow(fish2.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                setFishCoin(2)
                setModalImg(fish2)
                handleOpen();
                //alert(fish2.id+ " 낚시 성공!")
                //setResult 으로 낚은 물고기 보여주기    
            }
        }
        if( fish3 !== null && fishing !== null) {
            let dis = Math.pow(fish3.x - fishing.x, 2) + Math.pow(fish3.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                setFishCoin(3)
                setModalImg(fish3)
                handleOpen();
                //alert(fish3.id+" 낚시 성공!")
                //setResult 으로 낚은 물고기 보여주기    
            }
        }
        if( fish4 !== null && fishing !== null) {
            let dis = Math.pow(fish4.x - fishing.x, 2) + Math.pow(fish4.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                setFishCoin(4)
                setModalImg(fish4)
                handleOpen();
                //alert(fish4.id+" 낚시 성공!")
                //setResult 으로 낚은 물고기 보여주기    
            }
        }
        if( fish5 !== null && fishing !== null) {
            let dis = Math.pow(fish5.x - fishing.x, 2) + Math.pow(fish5.y - fishing.y, 2)
            console.log("dis: "+dis)
            if(dis >= minDis && dis <= maxDis){
                setFishCoin(5)
                setModalImg(fish5)
                handleOpen();
                //alert(fish5.id+" 낚시 성공!")
                //setResult 으로 낚은 물고기 보여주기    
            }
        }       
    }

    function saveFish(){
        console.log("Save!")
    }

    const buttonStyle = {"width" : 120 ,"height" : 70, "margin" : 10,  "backgroundColor": "#21b6ae", "box-shadow" : "5px 5px 5px 5px gray"}; 
    const iconStyle = {"width" : 110 ,"height" : 60}
    
    return (
            
            <div id="fish_game" style={{width:"100%", height:"100%", backgroundImage:"url(img/background.jpg)"}}>
                    
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg1} fishId="1"/>
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg2} fishId="2"/>
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg3} fishId="3"/>
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg4} fishId="4"/>
                    <Fish setFishImg= {props.setFishImg} fishImg={fishImg5} fishId="5"/>
                    <Fishing /> 
                    <ReactHowler src={BGM} playing={true}/>
                    
                    <Modal
                        open={modalOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box display="flex" style={modalStyle} alignContent='vertical' textAlign='center' >
                            <Paper>
                                <Typography variant='h4' component='h2' align="center">
                                    낚시 성공!
                                </Typography>
                                <Typography variant='h6' component='h2' align="center">
                                    {"획득 코인: " + `${fishcoin}`}
                                </Typography>
                                <img src={modalImg.src} style={{width: '200px', height: '200px'}}/>
                                <Button variant="outlined" onclick={saveFish}>Save</Button>
                            </Paper>
                        </Box>
                    </Modal>
            </div>
            
    )
}
export default GameMain;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    justifyContent:"center",
    margin:"10px 10px",
  };