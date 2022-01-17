import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button"

import {Card, CardMedia, CardContent, CardActions} from "@material-ui/core"
import {Typography} from "@material-ui/core"
import {Modal, Box, Paper, TextField} from "@material-ui/core"
import { GiWindowBars } from "react-icons/gi";


export default function Profile(props) {

    const [cat, setCat] = useState(undefined);
    const [prevCats, setPrevCats] = useState([]);
    var {setMode} = props;
    const [modalOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [script, setScript] = useState("안녕~ 반갑다냥")
    const [catName, setCatName] = useState("");

    useEffect(()=> {
        getCat();
    }, [props.instance]);

    useEffect(() => {
    }, [prevCats])

    useEffect(() => {
        console.log(props.script)
        setScript(props.script);
    }, [props.script])
    

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
        setScript("우웩. 이걸 밥이라고 준거냥")
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
        handleOpen();
    }

    async function registerCat(){
        if(catName === ""){
            window.alert("이름을 입력해주세요!")
            return;
        }
        await props.instance.methods.registerCat(catName).send();
        var cat = await props.instance.methods.getMyCat().call();
        setCat(cat);
    }

    const fontStyle = {"font-family" : "BMJUA", margin:"0 auto"}
    return(
        <>
            <Card style={{width:"100%", margin:"0 auto", height:"100%"}} elevation={3}>
                {cat ?
                <CardMedia
                    component="img"
                    image={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${cat.kittyId}`}
                    alt="mycat"
                    style={{height:"70%"}}
                    /> : <></>
                }
                <CardContent style={{height:"5%"}}>
                    {cat ? 
                        <div className="task-tooltip">
                            {script}
                        </div>
                        : <></>  
                    }
                    <Typography style = {{"font-size" : "20px", "font-family" : "BMJUA", marginTop:"5px"}}>
                        {cat ? `이름: ${cat.name} (${cat.price} ETH)` : "분양을 먼저 받아주세요"}
                    </Typography>
                </CardContent>
                <CardActions style={{height:"15%"}}>
                    {cat ?
                        <>
                        <Button variant="contained" onClick={changeCat} style={fontStyle}>물고기 먹이기</Button>
                        <Button variant="contained" onClick={getPrevCats} style={fontStyle}>고양이 변천사</Button>
                        </>
                        : 
                        <>
                        <TextField onChange={v => setCatName(v.target.value)}/>
                        <Button variant="contained" onClick={registerCat} style={fontStyle}>분양받기</Button>
                        </>
                    }

                </CardActions>
            </Card>


            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box display="flex" style={modalStyle}>
                    {prevCats.map((elem, idx) => {
                    return(
                    <Paper key={idx} style={{width:"150px"}}>
                        <img src={`https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${elem}`} />
                    </Paper>)
                })}
                </Box>
            </Modal>
        </>
    )
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    justifyContent:"center",
    margin:"10px auto"
  };
