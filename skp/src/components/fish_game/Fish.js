import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fishImg from './image/fish.png'

const useStyles = makeStyles(theme => ({
    root : {

    } ,
    character: {
        position: 'absolute',
        width: '10px',
        height: '10px'
    },
}))

export default function Fish(props) {
    
    let [img, changeImg] = useState('🐟')

    const classes = useStyles();

    return (
        <div>
           <img id="fish" src= {fishImg} 
           height="100" weight="100" classmName={classes.character}/>
        </div>
    )
}