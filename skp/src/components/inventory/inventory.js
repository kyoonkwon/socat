import React, {useEffect} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


let posX = 0;
let posY = 0;

let originalX = 0;
let originalY = 0;

function Inventory(props) {
    let list = new Array();

    const cellStyle = {height : "20px", border: "1px solid black", backgroundImage : `url(img/fish1.png)`, backgroundSize : "contain"};
    
    async function clickEvent(id) {
        listFish();
        console.log(id);
        console.log(list[id-1]);
        if (list[id-1] == undefined) {
                props.setSavedFishImage(0);
        } else {
                props.setSavedFishImage(list[id-1]);
        }
        
    }
    useEffect(() => {
        console.log(props)
        if(props.instance !== 0){
                listFish();
        }
            
    }, [props.instance])



    async function listFish(){
        let fishList = await props.instance.methods.getFish().call();
        console.log(fishList);
        for (let i = 1; i < fishList.length; i++) {
                for(let j = 0; j < fishList[i]; j++) {
                        list.push(i);
                }
        }
        console.log(list);
    }



//    let rod = props.rod;
//    const cellStyle = {border: "1px solid black", margin : "0 auto", justifyContent : "center" ,alignItems:"center", backgroundImage : `url(img/fish${rod}.png)`, backgroundSize : "100%"};
   return (
    <div>
    <Table>
        <TableBody>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[0]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(1)} ></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[1]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(2)} onClick = {x=>clickEvent(2)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[2]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(3)} onClick = {x=>clickEvent(3)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[3]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(4)} onClick = {x=>clickEvent(4)}></TableCell>
            </TableRow>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[4]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(5)} onClick = {x=>clickEvent(5)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[5]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(6)} onClick = {x=>clickEvent(6)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[6]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(7)} onClick = {x=>clickEvent(7)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[7]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(8)} onClick = {x=>clickEvent(8)}></TableCell>
            </TableRow>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[8]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(9)} onClick = {x=>clickEvent(9)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[9]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(10)} onClick = {x=>clickEvent(10)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[10]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(11)} onClick = {x=>clickEvent(11)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[11]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(12)} onClick = {x=>clickEvent(12)}></TableCell>
            </TableRow>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[12]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(13)} onClick = {x=>clickEvent(13)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[13]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(14)} onClick = {x=>clickEvent(14)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[14]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(15)} onClick = {x=>clickEvent(15)}></TableCell>
                    <TableCell alt = {"noImage"} style = {{height : "20px", border: "1px solid black", backgroundImage : `url(img/fish${list[15]}.png)`, backgroundSize : "contain"}} onClick = {x=>clickEvent(16)} onClick = {x=>clickEvent(16)}></TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </div>
   )
}

export default Inventory; 