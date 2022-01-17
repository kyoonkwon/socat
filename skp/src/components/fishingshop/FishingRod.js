import React, {  useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import ReactCardFlip from 'react-card-flip';
import {AiFillHome} from "react-icons/ai";

function FlipCard(props){
  const {setRod} = props;
  let rod = 0;
  const [isFlipped, setIsFlipped] = useState(false);

   async function createRod() {
    console.log(props);
    const check = await props.instance.methods.createRod().send();
    console.log(check);
  }
  
  async function getRod() {
    const check = await props.instance.methods.getRod().call();
    console.log(check);
    setIsFlipped(!isFlipped);
  }

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
  const buttonStyle = {"width" : 200 ,"height" : 70, "marginTop" : 70, "font-family" : "BMJUA", "font-size" : 20};
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="front">
        <div>
            <img src={props.url} alt="Avatar" style={{"width":"360px", "height":"240px"}}></img>
        </div>
          <Button style = {buttonStyle} variant="outlined" onClick={newRod}>{props.name}<br></br> 코인 : {props.price}</Button>
        </div>
      <div className="back">
        <div>
            <img src={props.rodUrl} alt="Avatar" style={{"width":"360px", "height":"240px"}}></img>
        </div>
          <Button style = {buttonStyle} variant="outlined" onClick={handleClick}>{props.rand}</Button>
      </div>
    </ReactCardFlip>
  );
}
const iconStyle = {"width" : 110 ,"height" : 60}
function FishingRod(props) {      
  var {setMode} =props;
  const buttonStyle = {"width" : 120 ,"height" : 70, "margin" : 10,  "backgroundColor": "#21b6ae", "box-shadow" : "5px 5px 5px 5px gray"}; 
  const rand1 = Math.floor(Math.random() * 4 + 1);
  const rand2 = Math.floor(Math.random() * 6 + 1);
  const rand3 = Math.floor(Math.random() * 5 + 3);
  const FishingRodStyle = {"display":"flex","justifyContent":"space-around","columnGap" : "40px", "flexDirection" : "row", "marginTop" : 100};
  return (
    <div>
      <Button variant="text" style= {buttonStyle} onClick={() => {setMode(1);}}><AiFillHome style = {iconStyle}/></Button>
      <div style={FishingRodStyle}>
          <FlipCard setUserSSC = {props.setUserSSC} name = "쪽 박" price = "5" url = "img/kb.png" rodUrl = {`img/rod${rand1}.webp`} setMode = {setMode} instance = {props.instance} index = "1" setRod = {props.setRod} rand = {rand1} accounts = {props.accounts}></FlipCard>
          <FlipCard setUserSSC = {props.setUserSSC} name = "중 박" price = "10" url = "img/lotte.jpg" rodUrl = {`img/rod${rand2}.webp`} setMode = {setMode} instance = {props.instance} index = "2" setRod = {props.setRod} rand = {rand2} accounts = {props.accounts}></FlipCard>
          <FlipCard setUserSSC = {props.setUserSSC} name = "대 박" price = "15" url = "img/shinhan.png" rodUrl = {`img/rod${rand3}.webp`} setMode = {setMode} instance = {props.instance} index = "3" setRod = {props.setRod} rand = {rand3} accounts = {props.accounts}></FlipCard>
      </div>
    </div>
  );
}
export default FishingRod;