import { useEffect, useState } from 'react';
import './App.css';
import GameMain from './components/fish_game/GameMain';
import FishingRod from './components/fishingshop/FishingRod';
import getWeb3 from './getWeb3';
import CatBase from './contracts/CatBase.json';
import Profile from './components/catProfile';
import Exchange from './components/exchange';
import Inventory from './components/inventory/inventory';
import {Grid, Button, Paper} from '@mui/material'
import {Box, AppBar, Typography} from '@material-ui/core';
import {GiBoatFishing, GiFishingPole} from "react-icons/gi";
import {BsCurrencyExchange} from 'react-icons/bs';

function App(props) {

  const [rod,setRod] = useState(0);
  const [mode, setMode] = useState(2);
  const [web3, setWeb3] = useState(0);
  const [accounts, setAccounts] = useState(0);
  const [instance, setInstance] = useState(0);
  const [owner, setOwner] = useState(0);
  const [userSSC, setUserSSC] = useState(0);
  const [userETH, setUserETH] = useState(0);
  const [fishImg, setFishImg] = useState(0);
  const [script, setScript] = useState("안녕 반갑다냥");

  useEffect(() => {
    getContract();
  }, []);

  useEffect(() => {
    if(instance !== 0)
      getAccounts();
  }, [instance])

  function clickFishing() {
    setMode(0);
    setScript("오늘은 낚시 좀 성공해봐라냥");
  }

  function clickShop() {
    setMode(1);
    setScript("컨트롤이 안좋으면 장비라도 좋은 걸 좀 뽑아봐라냥");
  }

  function clickExchange() {
    setMode(2);
    setScript("SHOW ME THE MONEY");
  }


  async function getContract(){

    var web3, accounts, instance, owner;
    web3 = await getWeb3();
    accounts = await web3.eth.getAccounts();
    
    var networkId = await web3.eth.net.getId();
    var network =  CatBase.networks[networkId];
    
    instance = new web3.eth.Contract(
      CatBase.abi,
      network && network.address,
      {from: accounts[0]}
    );
    
    owner = await instance.methods.getOwner().call();
    
    setWeb3(web3);
    setAccounts(accounts);
    setInstance(instance);
    setOwner(owner);
  }

  async function getAccounts(){
    var SSC = await instance.methods.balanceOf(accounts[0]).call();
    var ETH = await web3.eth.getBalance(accounts[0]);
    console.log(SSC)
    setUserSSC(SSC);
    setUserETH(ETH);
  }

  const buttonStyle = {"width" : 120 ,"height" : 70, "margin" : 10, "backgroundColor": "#21b6ae"};
  const iconStyle = {"width" : 110 ,"height" : 60, "backgroundColor": "white"}

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} style = {{"font-family" : "BMJUA", "backgroundColor" : "#C9F3F8", color:"black"}}>
             {`소소코인 잔고 ${(userSSC / (10 ** 18))}    이더리움 잔고 ${userETH / (10 ** 18)}`}
          </Typography>
        </AppBar>
      </Box>

      <Grid container style={{margin:"0 auto"}} direction="row" justifyContent="center" spacing={3}>

        <Grid item direction="column" spacing={2} xs={3}>
          <Grid item style={{height:"500px"}}>
            <Profile script={script} web3={web3} accounts={accounts} instance={instance} owner={owner} setMode={setMode}/>
          </Grid>
          <Grid item>
            <Paper elevation={3} style={{height:"200px", marginTop:"20px", padding:"0 0 0 0"} }>
              <Inventory style={{height:"200px", marginTop:"20px", padding:"0 0 0 0"}} accounts={accounts} instance={instance}  setSavedFishImage={setSavedFishImage}/>
            </Paper>
          </Grid>
        </Grid>


        <Grid item xs={6} direction="column" justifyContent="flex-start" spacing={3}>
          <Paper style={{height:"630px", display:"flex", alignItems:"center"}}>
          <Grid container style={{margin:"0 auto"}} direction="row">
            {
              mode === 0 ?
              <GameMain web3={web3} accounts={accounts} instance={instance} owner={owner} setMode={setMode} setFishImg={setFishImg}/>
              : mode === 1 ?
                <FishingRod setUserSSC={setUserSSC} web3={web3} accounts={accounts} instance={instance} owner={owner} setMode={setMode} setRod={setRod}/> 
                : <Exchange updateBalance={getAccounts} web3={web3} accounts={accounts} instance={instance} owner={owner} savedFishImage = {savedFishImage}/>
              }
          </Grid>
          </Paper>

          <Grid item>
            <Button variant="text" style = {buttonStyle}  onClick={clickFishing}> <GiBoatFishing style = {iconStyle}/>  </Button>
            <Button variant="text" style = {buttonStyle}  onClick={clickShop}> <GiFishingPole style = {iconStyle}/> </Button>
            <Button variant="text" style = {buttonStyle}  onClick={clickExchange}> <BsCurrencyExchange style = {iconStyle}/> </Button>
          </Grid>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default App;
