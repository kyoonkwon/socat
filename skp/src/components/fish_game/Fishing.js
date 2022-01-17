import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RodImg from './image/m_RodImg.png'
import { Button } from "@material-ui/core";
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
    root: {
  
    },
    character: {
      position: 'fixed',
      width:'60px',
      height:'450px',
      zIndex: '-1',
      left: '45%',
    },
  }))

  function Fishing(props) { 
    // init
    const updateTime = 20;
    const initLeft = 50;
    const initTop = 5;
    const speed = 25;
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
          if(!isMove && top >= -300) {
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
            //console.log("Left: " + left)
          }
        }
    }

    //right arrow
    const handleKeyRight = (e) => {
        if (e.keyCode === 39) {
          if(!isMove && left <= 270) {
            isMove = !isMove;
            moveRight();
            //console.log("Right: " + left)
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
    }

    const moveLeft = () => {
      setLeft(left-speed);        
    }
    // 렌더링
    return (
      <div>
        <img id="fishing" src = {RodImg} className={classes.character} style={{marginLeft: `${left}`+'px', marginTop: `${top}`+'px'}} />
      </div>
    )
}
export default Fishing;