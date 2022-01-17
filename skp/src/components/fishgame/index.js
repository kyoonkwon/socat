import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button"
import {AiFillHome} from "react-icons/ai";

export default function Fishing(props) {

    var {setMode} = props;
    const buttonStyle = {"width" : 120 ,"height" : 70, "margin" : 10, "backgroundColor": "#21b6ae"};
    const iconStyle = {"width" : 110 ,"height" : 60 , "margin" : 10}
    return(
        <div>
            <Button variant="text" style={buttonStyle} onClick={() => {setMode(1);}}> <AiFillHome style = {iconStyle}/></Button>
        </div>
    )
}