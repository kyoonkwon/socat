import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RodImg from './image/m_RodImg.png'
import styled from 'styled-components'

const useStyles = makeStyles(theme => ({
    root: {
  
    },
    character: {
      position: 'absolute',
      width:'60px',
      height:'400px',
      left: '150px',
    },
  }))

  const FishingRod = (props) => { 
    // init
    const updateTime = 20;
    const initLeft = 50;
    const initTop = 10;
    const speed = 10;
    const moveSize = 200;
    const [left, setLeft] = useState(initLeft);
    const [top, setTop] = useState(initTop);
    var isMove = false;
    const timeOutList = [];
    
    const classes = useStyles();

    useEffect(() => {
        document.addEventListener('keydown', handleKeyUp)
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keydown', handleKeyLeft)
        document.addEventListener('keydown', handleKeyRight)

        // error : return 안으로 안들어감
        return () => {
            for(let i=0; i< timeOutList.length; ++i) {
                clearTimeout(timeOutList[i])
            }
            document.removeEventListener('keydown', handleKeyLeft)
            document.removeEventListener('keydown', handleKeyRight)
        }
    })

    /* 키보드 이벤트 */
    // up arrow
    const handleKeyUp = (e) => {
        if (e.keyCode === 38) {
          if(!isMove) {
            isMove = !isMove;
            moveUp();
            console.log("click left")
          }
        }
    }

    // down arrow
    const handleKeyDown = (e) => {
        if (e.keyCode === 40) {
          if(!isMove) {
            isMove = !isMove;
            moveDown();
            console.log("click right")
          }
        }
    } 

    // left arrow
    const handleKeyLeft = (e) => {
        if (e.keyCode === 37) {
          if(!isMove) {
            isMove = !isMove;
            moveLeft();
            console.log("click left")
          }
        }
    }

    //right arrow
    const handleKeyRight = (e) => {
        if (e.keyCode === 39) {
          if(!isMove) {
            isMove = !isMove;
            moveRight();
            console.log("click right")
          }
        }
    }

    const moveUp = () => {
        setTop(top-5);
    }

    const moveDown = () => {
        setTop(top+5);
    }

    const moveRight = () => {

        setLeft(left+5);
        /*
        console.log("Right")
        
        for(let i=0; i< 2*moveSize/speed + 1; i++){
            //console.log("test: "+2*moveSize/speed + 1) // 401
            let timeOut = setTimeout(() => {
                console.log("test: " + timeOut)
                if( i < moveSize / speed) {
                    console.log("a"+i)
                    setLeft(initLeft + speed*i);
                }
                else {
                    console.log("b"+i)
                    setLeft(initLeft + speed*(2 * moveSize/speed - i));
                }
                if( i >= 2 * moveSize / speed )
                    isMove = false;
            }, updateTime * i)
            timeOutList.push(timeOut)
        }
    */
    }

    const moveLeft = () => {
        /*
        console.log("Left")
        for(let i=0; i<2*moveSize/speed + 1; i++){
            let timeOut = setTimeout(() => {
                if( i < moveSize / speed) {
                    console.log("a"+i)
                    setLeft(initLeft - speed*i);
                }
                else {
                    console.log("b"+i)
                    setLeft(initLeft - speed*(2 * moveSize/speed - i));
                }
                if( i === 2 * moveSize / speed)
                    isMove = false;
            }, updateTime * i)
            timeOutList.push(timeOut)
        }
    */
        setLeft(left-5);
    }
    // 렌더링
    return (
      <div>
        <img id="FishingRod" src = {RodImg} className={classes.character} style={{marginLeft: `${left}`+'px', marginTop: `${top}`+'px'}} />
      </div>
    )
}
export default FishingRod;