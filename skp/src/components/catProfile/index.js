import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button"

import {Card, CardMedia, CardContent, CardActions} from "@material-ui/core"
import {Typography} from "@material-ui/core"
import {Box, Paper} from "@material-ui/core"



export default function Profile(props) {

    const [cat, setCat] = useState(undefined);
    const [prevCats, setPrevCats] = useState([]);

    useEffect(()=> {
        getCat();
    }, [props.instance]);

    useEffect(() => {
    }, [prevCats])
    

    async function getCat(){
        if(props.instance){
            var cat = await props.instance.methods.getMyCat().call();
            setCat(cat);
        }
    }

    async function changeCat(){
        await props.instance.methods.feed().send();
        var cat = await props.instance.methods.getMyCat().call();
        setCat(cat);
    }

    async function getPrevCats(){
        var logs = await props.instance.getPastEvents("FeedCat", { fromBlock: 1});
        var ids = []
        for(var i=logs.length-1;i>=0;i--){
            var rv = logs[i].returnValues
            if(rv.feeder = props.accounts[0]){
                ids.push(rv.beforeId);
            }
            if(ids.length > 4) break;
        }
        console.log(ids);
        setPrevCats(ids);
    }

    async function registerCat(){
        await props.instance.methods.registerCat().send();
        var cat = await props.instance.methods.getMyCat().call();
        setCat(cat);
    }

    return(
        <div>
            <Card style={{width:"400px", margin:"0 auto"}}>
                {cat ?
                <CardMedia
                    component="img"
                    image={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${cat.kittyId}.svg`}
                    alt="mycat"
                    /> : <></>
                }
                <CardContent>
                    <Typography>
                        {cat ? `이름: ${cat.name} (${cat.price} SSC)` : "분양을 먼저 받아주세요"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={registerCat} style={{margin:"0 auto"}}>분양받기</Button>
                    <Button variant="contained" onClick={changeCat} style={{margin:"0 auto"}}>물고기 먹이기</Button>
                    <Button variant="contained" onClick={getPrevCats} style={{margin:"0 auto"}}>고양이 변천사</Button>
                </CardActions>
            </Card>
            <Box display="flex" style={{justifyContent:"center", margin:"10px auto"}}>
                {prevCats.map((elem, idx) => {
                    return(
                    <Paper key={idx} style={{width:"150px"}}>
                        <img src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${elem}.svg`} />
                    </Paper>)
                })}
            </Box>
        </div>
    )
}