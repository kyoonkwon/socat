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
  const [mode, setMode] = useState(3);
  const [web3, setWeb3] = useState(0);
  const [accounts, setAccounts] = useState(0);
  const [instance, setInstance] = useState(0);
  const [owner, setOwner] = useState(0);
  const [userSSC, setUserSSC] = useState(0);
  const [userETH, setUserETH] = useState(0);
  const [fishImg, setFishImg] = useState(0);
  const [script, setScript] = useState("안녕 반갑다냥");
  const [savedFishImage,setSavedFishImage] = useState([]);
  const [fishId,setFishId] = useState(0);
  const [newFish, setNewFish] = useState(1);
  const [notifyChange, setNotifyChange] = useState(0);

  useEffect(() => {
    getContract();
  }, []);

  useEffect(() => {
    if(instance !== 0)
      getAccounts();
  }, [instance])

  useEffect(() => {
    console.log(notifyChange);
  }, [notifyChange])

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
    setUserSSC(SSC);
    setUserETH(ETH);
  }
  const buttonStyle = {"width" : 120 ,"height" : 70, "margin" : 10, "backgroundColor": "#21b6ae"};
  const iconStyle = {"width" : 110 ,"height" : 60, "backgroundColor": "white"}
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} style = {{"fontFamily" : "BMJUA", "backgroundColor" : "#C9F3F8", color:"black"}}>
             {`SOCAT`}
          </Typography>
        </AppBar>
      </Box>
      <Grid container style={{margin:"0 auto", width:"100%"}} direction="row" justifyContent="center" spacing={3}>

        <Grid item direction="column"  xs={3}>
          <Grid item style={{height:"500px"}}>
            <Profile setNotifyChange={setNotifyChange} script={script} web3={web3} accounts={accounts} instance={instance} owner={owner} setMode={setMode} fishId={fishId}/>
          </Grid>
          <Grid item>
            <Inventory notifyChange={notifyChange} accounts={accounts} instance={instance}  savedFishImage = {savedFishImage} setSavedFishImage={setSavedFishImage} setFishId={setFishId} userSSC={userSSC} userETH={userETH}/>
          </Grid>
        </Grid>


        <Grid item xs={6} direction="column">
          <Paper style={{height:"630px", display:"flex"}}>
            <Grid container style={{margin:"0 auto"}} direction="row">
              {
                mode === 0 ?
                <GameMain setNotifyChange={setNotifyChange} web3={web3} accounts={accounts} instance={instance} owner={owner} setMode={setMode} setFishImg={setFishImg} setFishId={setFishId}/>
                : mode === 1 ?
                  <FishingRod setUserSSC={setUserSSC} web3={web3} accounts={accounts} instance={instance} owner={owner} setMode={setMode} setRod={setRod}/> 
                  : mode == 2? <Exchange updateBalance={getAccounts} web3={web3} accounts={accounts} instance={instance} owner={owner} savedFishImage = {savedFishImage} fishId={fishId}/>
                    :
                    <Grid direction="column" style={{width:"100%", height:"100%"}} justifyContent="flex-start">
                      <Grid style={{height:"100px"}}>
                          <Typography variant='h3' style = {{"fontFamily" : "BMJUA", paddingTop:"10px"}}>블록체인이란</Typography>
                      </Grid>
                      <Grid style={{height:"500px"}}>
                          <p>
                            
                            - 중앙 서버가 아닌 네트워크에 참가하는 모든 공동체가 거래를 기록하고 관리
                            - 각 거래는 블록의 형태로 저장되며 이 거래가 체인처럼 연결되어 블록체인이라고 부름
                            -  거래를 통하여 블록이 생성되면 이를 검증하는 과정이 필요함. 
                            - 거래 발생을 인지한 노드들이 해시값을 찾아서 기존의 블록체인과 연결을 하게 되고, 가장 먼저 해시값을 찾은 노드에게 보상이 주어짐(채굴)
                            - 비트코인은 탈중앙화된
                          </p>
                      </Grid>
                    </Grid>
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
