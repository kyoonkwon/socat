import React, { Component } from "react";
import { Button } from "@material-ui/core";
import ReactCardFlip from 'react-card-flip';

class FlipCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFlipped: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
          <div className="front">
            <div>
                <img src={this.props.url} alt="Avatar" style={{"width":"360px", "height":"240px"}}></img>
            </div>
                <Button  variant="outlined" style= {{"marginTop" : 50}} onClick={this.handleClick}>{this.props.name}<br></br> Price : {this.props.price}</Button>
            </div>
          <div className="back">
            <div>
                <img src={this.props.rodUrl} alt="Avatar" style={{"width":"360px", "height":"240px"}}></img>
            </div>
            <Button  variant="outlined" style= {{"marginTop" : 50}} onClick={this.handleClick}>{this.props.name}<br></br> Price : {this.props.price}</Button>
            </div>
        </ReactCardFlip>
      );
    }
  }

class FishingRod extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }
    
      render() {
        const rand1 = Math.floor(Math.random() * 4 + 1);
        const rand2 = Math.floor(Math.random() * 6 + 1);
        const rand3 = Math.floor(Math.random() * 5 + 3);
        console.log(rand1);
        console.log(rand2);
        console.log(rand3);
        const FishingRodStyle = {"display":"flex","justifyContent":"space-around","columnGap" : "40px", "flexDirection" : "row", "marginTop" : 50};
        return (
            <div style={FishingRodStyle}>
                <FlipCard name = "Beginner" price = "5" url = "img/kb.png" rodUrl = {`img/rod${rand1}.webp`}></FlipCard>
                <FlipCard name = "Intermediate" price = "10" url = "img/lotte.jpg" rodUrl = {`img/rod${rand2}.webp`}></FlipCard>
                <FlipCard name = "Expert" price = "15" url = "img/shinhan.png" rodUrl = {`img/rod${rand3}.webp`}></FlipCard>
            </div>
          
        );
      }
    
}
export default FishingRod;