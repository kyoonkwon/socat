import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fishImg from './image/fish.png'

const useStyles = makeStyles(theme => ({
    root : {

    } ,
    character: {
        position: 'absolute',       
        width: '80px',
        height: '80px'
    },
    }))

    function Fish(props) {
    
        //let [img, changeImg] = useState('🐟')

        const interval = useRef();

        const speed = 20;
        const initFishTop = 0;
        const initFishLeft = 50;
        const [dir, setDir]= useState(0); 
        const [time, setTime] = useState(10); // 한 방향으로 움직이는 시간
        const [fishLeft, setFishLeft] = useState(initFishLeft); // 물고기 좌우 위치
        const [fishTop, setFishTop] = useState(initFishTop); // 물고기 좌우 위치

        const classes = useStyles();

        useEffect(() => {
            interval.current = setInterval(() => {
                moveFish()
            }, 1000)

            return () => {
                clearInterval(interval.current)
            }
        })

        const randomDir = () => {
            var i = Math.floor(Math.random()*4)
        
            if( i === 0 ) {
                setDir(0) // 오른쪽
            }
            else if ( i === 1 ) {
                setDir(1) // 왼쪽
            }
            else if ( i === 2 ) {
                setDir(2)  // 위
            }
            else {
                setDir(3) // 아래
            }
            //console.log("Dir: "+ i)
        }

        const randomTime = () => {
            var i = Math.random() * 40000
            setTime(i)
            //console.log("Time: "+ i)
        }

        const moveFish = () => {
            randomDir(); // 방향설정
            randomTime(); // 시간설정
            //top -5 -> 425
            //left -5 -> 420
            
            //오른쪽
            if(dir === 0) {
                for(let i=0; i<(time/speed); ++i) {
                    if(fishLeft > 420) {
                        setFishLeft(400)
                        break;
                    }
                    setFishLeft(fishLeft + speed)
                    //console.log("Left!!: " + fishLeft)
                }
            }
            // 왼쪽 
            else if (dir === 1) {
                for(let i=0; i<(time/speed); ++i) {
                    if(fishLeft < -5) {
                        setFishLeft(0)
                        break;
                    }
                    setFishLeft(fishLeft - speed)
                    //console.log("Right!!: " + fishLeft)
                }
            }
            // 위
            else if (dir === 2) {
                for(let i=0; i<(time/speed); ++i) {
                    if(fishTop > 425) {
                        setFishTop(400)
                        break;
                    }
                    setFishTop(fishTop + speed)
                    //console.log("Top!!: " + fishTop)
                }
            }
            // 아래
            else if (dir === 3){
                for(let i=0; i<(time/speed); ++i) {  
                    if(fishTop < -5) {
                        setFishTop(0)
                        break;
                    }
                    setFishTop(fishTop - speed)
                    //console.log("Down!!: " + fishTop)
                }
            }
        }
        
        return (
            <div>
                <img id="fish" src= {fishImg} className={classes.character}
                style={{marginLeft: `${fishLeft}`+'px', marginTop: `${fishTop}`+'px' }}/>
            </div>
        )

    }
export default Fish;