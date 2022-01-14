import React, { Component } from "react";
import CatFeed from "./contracts/CatFeed.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import Coin from "./contracts/coin.json";

import "./App.css";

const testServer = False;

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      if(testServer)
        var web3 = await getWeb3();
      
      else
        var web3 = new Web3(new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/81bc08bfdedf4d17a8c00fc36c92805a'
    ));

      const accounts = await window.ethereum.enable();

      //await web3.eth.getAccounts();
      // const networkId = await web3.eth.net.getId();

      // const deployedNetwork = CatFeed.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   CatFeed.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      const coinNetwork = "0x75ED1b9A7C1345e6AaFFca8931BA9B7A4990C3cb";
      const coinAbi = Coin.abi;

      const instance = new web3.eth.Contract(
        coinAbi,
        coinNetwork,
        {from: accounts[0]}
      );

      
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const {accounts, contract } = this.state;

    var x = await contract.methods.balanceOf(accounts[0]).call();
    console.log(x);

    var y = await contract.methods.transfer("0x3c151402Ca4A8BA77168dB889C37312cC4E29228",50).call();
    //var z = await contract.methods.approve("0x3c151402Ca4A8BA77168dB889C37312cC4E29228", 5000).call({from:accounts[0]});


    console.log(y);
    // var isRegistered = await contract.methods.hasCat().call();
    // if(isRegistered){
    //   var res = await contract.methods.getMyCat().call();
    //   this.setState({ storageValue: res });
    // }
  };

  changeKitty = async () => {
    const {accounts, contract} = this.state;

    const isRegistered = await contract.methods.hasCat().call();;
    if(isRegistered){
      await contract.methods.feed().send({from:accounts[0]});
      var res = await contract.methods.getMyCat().call();
      this.setState({ storageValue: res });
    } else {
      alert("분양을 먼저 받으세요.")
    }
  }

  registerKitty = async () => {
    const {accounts, contract} = this.state;

    const isRegistered = await contract.methods.hasCat().call();;
    if(!isRegistered){
      await contract.methods.registerCat().send({from:accounts[0]});
      var res = await contract.methods.getMyCat().call();
      this.setState({ storageValue: res });
    } else {
      alert("이미 분양받았습니다.");
    }

  }

  render() {

    console.log(this.state.storageValue);
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <img alt="cat" src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${this.state.storageValue.kittyId}.svg`} style={{"width":"300px"}} />
        <button onClick={this.registerKitty}>고양이 분양받기</button>
        <button onClick={this.changeKitty}>고양이 바꾸기</button>
      
      </div>
    );
  }
}

export default App;
