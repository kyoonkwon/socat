import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import fishImg from './image/fish.png'

const useStyles = makeStyles(theme => ({
    root : {

    } ,
    character: {
        position: 'absolute',
        width: '80px',
        height: '120px',
        left: '150px',
    },
}))

export default function Fish(props) {
    
    let [img, changeImg] = useState('🐟')

    return (
        <span>
            🐟
        </span>
    )
}