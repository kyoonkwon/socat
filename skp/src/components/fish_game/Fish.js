import React, {useState, useEffect} from 'react';
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

    const Fish = (props) => {
    
        //let [img, changeImg] = useState('🐟')

        const classes = useStyles();
        
        return (
            <div>
                <img id="fish" src= {fishImg} className={classes.character}/>
            </div>
        )

    }
export default Fish;