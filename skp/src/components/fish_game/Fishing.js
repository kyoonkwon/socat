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
      left: '160px',
    },
  }))

  function Fishing(props) { 
    // init
    const updateTime = 20;
    const initLeft = 50;
    const initTop = -20;
    const speed = 20;
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

        return () => {
            for(let i=0; i< timeOutList.length; ++i) {
                clearTimeout(timeOutList[i])
            }
            document.removeEventListener('keydown', handleKeyLeft)
            document.removeEventListener('keydown', handleKeyRight)
            document.removeEventListener('keydown', handleKeyUp)
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    /* 키보드 이벤트 */
    // up arrow
    const handleKeyUp = (e) => {
        if (e.keyCode === 38) {
          if(!isMove && top >= -255) {
            isMove = !isMove;
            moveUp();
            console.log("Top: " + top)
          }
        }
    }

    // down arrow
    const handleKeyDown = (e) => {
        if (e.keyCode === 40) {
          if(!isMove && top <= -5) {
            isMove = !isMove;
            moveDown();
            console.log("Down: " + top)
          }
        }
    } 

    // left arrow
    const handleKeyLeft = (e) => {
        if (e.keyCode === 37) {
          if(!isMove && left >= -155) {
            isMove = !isMove;
            moveLeft();
            console.log("Left: " + left)
          }
        }
    }

    //right arrow
    const handleKeyRight = (e) => {
        if (e.keyCode === 39) {
          if(!isMove && left <= 270) {
            isMove = !isMove;
            moveRight();
            console.log("Right: " + left)
          }
        }
    }

    const moveUp = () => {
        setTop(top-speed);
    }

    const moveDown = () => {
        setTop(top+speed);
    }

    const moveRight = () => {
      setLeft(left+speed);
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
      setLeft(left-speed);
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
        
    }
    // 렌더링
    return (
      <div>
        <img id="fishing" src = {RodImg} className={classes.character} style={{marginLeft: `${left}`+'px', marginTop: `${top}`+'px'}} />
      </div>
    )
}
export default Fishing;