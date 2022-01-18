import React, {useEffect, useState} from "react";
import { ImageList, ImageListItem,ImageListItemBar } from '@mui/material';
import {Typography} from '@material-ui/core';
import '../../App.css';


let posX = 0;
let posY = 0;

let originalX = 0;
let originalY = 0;

function Inventory(props) {
    let list = props.savedFishImage;
    console.log(list);    
    const [clicked, setClicked] = useState(null);
   
    async function clickEvent(x) {
        if (x === undefined) props.setFishId(0);    
        else {
                setClicked(x);
                props.setFishId(list[x]);
        }
    }
    useEffect(() => {
        console.log(props)
        if(props.instance !== 0){
                listFish();
        }
            
    }, [props.instance, props.notifyChange])



    async function listFish(){
        list = [];
        let fishList = await props.instance.methods.getFish().call();
        console.log(fishList);
        for (let i = 1; i < fishList.length; i++) {
                for(let j = 0; j < fishList[i]; j++) {
                        list.push(i);
                }
        }
        props.setSavedFishImage(list); 
        console.log(list);
    }
   const fishStyle = { border: "1px solid black", borderRadius : "10px"};
   const clickedStyle = {border: "3px solid black", borderRadius : "10px"};
   return (
    <div style={{"maringTop" : "50px"}}>
        <Typography component="div" sx={{ flexGrow: 1 }} style = {{"fontSize":"20px","fontFamily" : "BMJUA", "backgroundColor" : "#C9F3F8", color:"black"}}>
             {`소소코인 잔고 ${(props.userSSC / (10 ** 18))}    이더리움 잔고 ${props.userETH / (10 ** 18)}`}
          </Typography>
        <ImageList cols={4} >  
                {list.map((elem, idx) => {
                        return(
                        <ImageListItem onClick={x => {clickEvent(idx)}} style = {clicked===idx ? clickedStyle : fishStyle} key={`${idx}`}><img src={`img/fish${elem}.png`} alt={"noImage"} loading="lazy"/> </ImageListItem>)
                })}
        </ImageList>
    </div>
   )
}

export default Inventory; 