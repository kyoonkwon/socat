import React, { Component } from "react";
import CatFeed from "./contracts/CatFeed.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import InvenToken from "./contracts/INVENToken.json"

import "./App.css";

const testServer = true;

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, balance: 0 };

  componentDidMount = async () => {
    try {
      if(testServer)
        var web3 = await getWeb3();
      
      else
        var web3 = new Web3(new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/81bc08bfdedf4d17a8c00fc36c92805a'
    ));

    var accounts, instance, catInstance;

      if(testServer){

        accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        const catNetwork = CatFeed.networks[networkId];
        catInstance = new web3.eth.Contract(
          CatFeed.abi,
          catNetwork && catNetwork.address,
          {from: accounts[0]}
        );

        const deployedNetwork = InvenToken.networks[networkId];
        instance = new web3.eth.Contract(
          InvenToken.abi,
          deployedNetwork && deployedNetwork.address,
          {from: accounts[0]}
        );


      } else {
        // accounts = await window.ethereum.enable();
        // const coinNetwork = "0x75ED1b9A7C1345e6AaFFca8931BA9B7A4990C3cb";
        // const coinAbi = Coin.abi;

        // instance = new web3.eth.Contract(
        //   coinAbi,
        //   coinNetwork,
        //   {from: accounts[0]}
        // );
      } 
      this.setState({ web3, accounts, contract: instance, catContract: catInstance }, this.runExample);

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const {accounts, contract, catContract } = this.state;

    var balance = await contract.methods.balanceOf(accounts[0]).call();
    console.log(balance);

    // var z = await contract.methods.approve("0x3c151402Ca4A8BA77168dB889C37312cC4E29228", 500).send();
    // var y = await contract.methods.transferFrom("0x3c151402Ca4A8BA77168dB889C37312cC4E29228", "0x077a82eCa6D4732EFdb739feB77ADbC5afc3B88b", 500).send();
    // var w = await contract.methods.transfer("0x0B8c9Dc74DC0AFAe7fBa5bd662281F592FB99982", 10000).send();

    // console.log(y);
    var isRegistered = await catContract.methods.hasCat().call();
    if(isRegistered){
      var res = await catContract.methods.getMyCat().call();
      this.setState({ storageValue: res, balance: balance});
    }
  };

  changeKitty = async () => {
    const {accounts, catContract} = this.state;

    const isRegistered = await catContract.methods.hasCat().call();;
    if(isRegistered){
      await catContract.methods.feed().send({from:accounts[0]});
      var res = await catContract.methods.getMyCat().call();
      this.setState({ storageValue: res });
    } else {
      alert("분양을 먼저 받으세요.")
    }
  }

  registerKitty = async () => {
    const {accounts, catContract} = this.state;

    const isRegistered = await catContract.methods.hasCat().call();;
    if(!isRegistered){
      await catContract.methods.registerCat().send({from:accounts[0]});
      var res = await catContract.methods.getMyCat().call();
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
        <h1>{`SKP코인 잔고 ${this.state.balance / 100}`}</h1>
        <img alt="cat" src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${this.state.storageValue.kittyId}.svg`} style={{"width":"300px"}} />
        <button onClick={this.registerKitty}>고양이 분양받기</button>
        <button onClick={this.changeKitty}>고양이 바꾸기</button>
      
      </div>
    );
  }
}

export default App;
