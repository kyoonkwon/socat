import React, {  useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import ReactCardFlip from 'react-card-flip';
import {Grid} from '@mui/material';


function FlipCard(props){
  const {setRod} = props;
  let rod = 0;
  const [isFlipped, setIsFlipped] = useState(false);

  async function newRod() { 
    var acc = await props.instance.methods.balanceOf(props.accounts[0]).call();
    await props.instance.methods.newRod(props.index, props.price+ "000000000000000000").send();
    const check = await props.instance.methods.getRod().call();
    console.log(acc);
    acc = await props.instance.methods.balanceOf(props.accounts[0]).call();
    props.setUserSSC(acc);
    console.log(acc);
    rod = check;
    setIsFlipped(!isFlipped);
  }

  function handleClick(e) {
    setRod(rod);
    e.preventDefault();
    setIsFlipped(!isFlipped);
  }
  const buttonStyle = {"width" : "80%", "fontFamily" : "BMJUA", "fontSize" : 20};
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="front">
        <div>
            <img src={props.url} alt="Avatar" style={{"width":"80%"}}></img>
        </div>
          <Button style = {buttonStyle} variant="outlined" onClick={newRod}>{props.name}<br></br> 코인 : {props.price}</Button>
        </div>
      <div className="back">
        <div>
            <img src={props.rodUrl} alt="Avatar" style={{"width":"80%"}}></img>
        </div>
          <Button style = {buttonStyle} variant="outlined" onClick={handleClick}>{props.rand}</Button>
      </div>
    </ReactCardFlip>
  );
}
function FishingRod(props) {      
  var {setMode} =props;

  const rand1 = Math.floor(Math.random() * 4 + 1);
  const rand2 = Math.floor(Math.random() * 6 + 1);
  const rand3 = Math.floor(Math.random() * 5 + 3);
  return (
          <Grid direction="column" style={{marginBottom:'50px'}}>
            <Grid style={{height:"100px"}}>
              <Typography variant='h3' style = {{"fontFamily" : "BMJUA", paddingTop:"10px"}}>~ 낚시대 뽑기 ~</Typography>
            </Grid>
            <Grid container direction="row" style={{height:"400px", alignItems:"center"}}>
              <Grid item xs={4}>
                <FlipCard setUserSSC = {props.setUserSSC} name = "쪽 박" price = "5" url = "img/kb.png" rodUrl = {`img/rod${rand1}.webp`} setMode = {setMode} instance = {props.instance} index = "1" setRod = {props.setRod} rand = {rand1} accounts = {props.accounts}></FlipCard>
              </Grid>
              <Grid item xs={4}>  
                <FlipCard setUserSSC = {props.setUserSSC} name = "중 박" price = "10" url = "img/lotte.jpg" rodUrl = {`img/rod${rand2}.webp`} setMode = {setMode} instance = {props.instance} index = "2" setRod = {props.setRod} rand = {rand2} accounts = {props.accounts}></FlipCard>
              </Grid>
              <Grid item xs={4}>  
                <FlipCard setUserSSC = {props.setUserSSC} name = "대 박" price = "15" url = "img/shinhan.png" rodUrl = {`img/rod${rand3}.webp`} setMode = {setMode} instance = {props.instance} index = "3" setRod = {props.setRod} rand = {rand3} accounts = {props.accounts}></FlipCard>
              </Grid>
            </Grid>
          </Grid>
  );
}
export default FishingRod;