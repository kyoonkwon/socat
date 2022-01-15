import React from "react";
import { Button } from "@material-ui/core";

const Card = (props) => {
    return (
        <div  >
            <div className="flip-card" style = {{"borderRadius": "100"}}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src="https://img1.kbcard.com/ST/img/cxc/kbcard/upload/img/product/09273_img.png" alt="Avatar" style={{"width":"180px", "height":"120px"}}></img>
                    </div>
                    <div className="flip-card-back">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNM4wH9iM0YXyG_XzAw-JMWE15meMGhiCtPA&usqp=CAU" alt="Avatar" style={{"width":"180px", "height":"120px"}}></img>
                    </div>
                </div>
            </div>
            <Button variant="outlined" style= {{"marginTop" : 15}} onClick={(e)=> {this.setState({disabled : true})}}>
                <p>
                    {props.name} <br></br>
                    PRICE : {props.price}
                </p>
            </Button>
        </div>
    )
}
// 화면을 뒤집었을 때 결제 되도록함
// class FishingRod extends Component {
//     constructor(props) {
//         super(props);
//     }
// }
const FishingRod = () => {
    //20개 중에서 선택
    const randomNumber = Math.round(Math.random() * 20 + 1);
    console.log(randomNumber);
    return (
        <div style={{"display":"flex","justify-content":"space-around","columnGap" : "40px", "flex-direction" : "row", "marginTop" : 50}}>
            <Card name = "beginner" price = "5"/>
            <Card name = "intermediate" price = "10"/>
            <Card name = "expert" price = "15"/>
        </div>
    )
}

export default FishingRod;