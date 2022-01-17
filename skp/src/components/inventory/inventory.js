import React from "react";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


let posX = 0;
let posY = 0;

let originalX = 0;
let originalY = 0;


function Inventory(props) {

    const cellStyle = {height : "50px", border: "1px solid black", margin : "0 auto", justifyContent : "center" ,alignItems:"center", backgroundImage : "url(img/kb.png)", backgroundSize : "100%"};
//    let rod = props.rod;
//    const cellStyle = {border: "1px solid black", margin : "0 auto", justifyContent : "center" ,alignItems:"center", backgroundImage : `url(img/fish${rod}.png)`, backgroundSize : "100%"};
   return (
    <div>
    <Table>
        <TableBody>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {cellStyle} ></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell  alt = {"noImage"} style = {cellStyle}></TableCell>
            </TableRow>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {cellStyle} ></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell  alt = {"noImage"} style = {cellStyle}></TableCell>
            </TableRow>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {cellStyle} ></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell  alt = {"noImage"} style = {cellStyle}></TableCell>
            </TableRow>
            <TableRow>
                    <TableCell alt = {"noImage"} style = {cellStyle} ></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell alt = {"noImage"} style = {cellStyle}></TableCell>
                    <TableCell  alt = {"noImage"} style = {cellStyle}></TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </div>
   )
}

export default Inventory; 