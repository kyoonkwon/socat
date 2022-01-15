import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RodImg from './image/RodImg.png'

const useStyles = makeStyles(theme => ({
    root: {
  
    },
    character: {
      position: 'absolute',
      width:'80px',
      height:'120px',
      left: '150px',
    },
  }))

  const FishingRod = () => { 
    // init
    const updateTime = 20;
    const initLeft = 50;
    const speed = 10;
    const moveSize = 200;
    const [left, setLeft] = useState(initLeft);
    var isMove = false;
    const timeOutList = [];
    
    const classes = useStyles();

    useEffect(() => {
        document.addEventListener('keyleft', handleKeyLeft)
        document.addEventListener('keyright', handleKeyRight)
        return () => {
            for(let i=0; i< timeOutList.length; ++i) {
                clearTimeout(timeOutList[i])
            }
            document.removeEventListener('keyleft', handleKeyLeft)
            document.removeEventListener('keyright', handleKeyRight)
        }
    })
    /* 키보드 이벤트 */
    //right arrow
    const handleKeyRight = (e) => {
        if (e.keyCode === 39) {
          if(!isMove) {
            isMove = !isMove;
            moveRight();
          }
        }
    }

    // left arrow
    const handleKeyLeft = (e) => {

        if (e.keyCode === 37) {
          if(!isMove) {
            isMove = !isMove;
            moveLeft();
          }
        }
    }
    /*
    // down arrow
    const handleKeyDown = (e) => {

        if (e.keyCode === 40) {
          
        }
    }

    // up arrow
    const handleKeyDown = (e) => {

      if (e.keyCode === 38) {
        if (!isJump){
          isJump = !isJump;
          jump();
        }
      }
    }
    */
    
    const moveRight = () => {
        for(let i=0; i<2*moveSize/speed + 1; i++){
            let timeOut = setTimeout(() => {
                if( i < moveSize / speed) {
                    setLeft(initLeft + speed*i);
                }
                else {
                    setLeft(initLeft + speed*(2 * moveSize/speed - i));
                }
                if( i === 2 * moveSize / speed)
                isMove = false;
            }, updateTime * i)
            timeOutList.push(timeOut)
        }
    }

    const moveLeft = () => {
        for(let i=0; i<2*moveSize/speed + 1; i++){
            let timeOut = setTimeout(() => {
                if( i < moveSize / speed) {
                    setLeft(initLeft - speed*i);
                }
                else {
                    setLeft(initLeft - speed*(2 * moveSize/speed - i));
                }
                if( i === 2 * moveSize / speed)
                isMove = false;
            }, updateTime * i)
            timeOutList.push(timeOut)
        }
    }
    // 렌더링
    return (
      <div>
        <img id="FishingRod" src = {RodImg} className={classes.character} style={{left:left}} />
      </div>
    )
  }
export default FishingRod;