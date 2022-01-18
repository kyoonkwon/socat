
import {useState} from 'react';
import { Typography } from '@material-ui/core';
import {Grid, Paper} from '@mui/material';
import {Radio, TextField, Button} from '@mui/material';


export default function Exchange(props) {

    const [selectedValue, setSelectedValue] = useState("0");
    const [coinValue, setCoinValue] = useState("0");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if(event.target.value === "2")
            setCoinValue("0");
    };

    async function exchange(){

        if(selectedValue === "0"){

            await props.instance.methods.ethToSSC().send({value:(coinValue * (10 ** 18)).toString()});
            props.updateBalance();
        } else if (selectedValue === '1'){

            await props.instance.methods.SSCtoEth((coinValue * (10 ** 18)).toString()).send();
            props.updateBalance();
            
        } else {
        }
    }


    return(
        <Grid direction="column" style={{width:"100%", height:"100%"}} justifyContent="flex-start">
            <Grid style={{height:"100px"}}>
                <Typography variant='h3' style = {{"fontFamily" : "BMJUA", paddingTop:"10px"}}> 거래소에 오신 것을 환영합니다</Typography>
            </Grid>
            <Grid style={{height:"500px"}}>
                <Paper style={{height:"100%", width:"95%", margin:"0 auto"}} elevation={5}>

                    <Typography variant='h5' style = {{"fontFamily" : "BMJUA", paddingTop:"20px"}}>거래 종목을 선택해주세요</Typography>
                    <div style={{marginBottom:"30px"}}>
                    <Radio
                        checked={selectedValue === "0"}
                        onChange={handleChange}
                        value="0"
                        name="radio-buttons"
                        aria-label="sdf"
                    />
                    <span style = {{"fontFamily" : "BMJUA"}}>{"ETH > SSC"}</span>
                    <Radio
                        checked={selectedValue === "1"}
                        onChange={handleChange}
                        value={"1"}
                        name="radio-buttons"
                    />
                    <span style = {{"fontFamily" : "BMJUA"}}>{"SSC > ETH"}</span>
                    <Radio
                        checked={selectedValue === "2"}
                        onChange={handleChange}
                        value={"2"}
                        name="radio-buttons"
                    />
                    <span style = {{"fontFamily" : "BMJUA"}}>{"FISH > SSC"}</span>
                    </div>
                    {selectedValue === "0"?
                        <Grid container direction="row" style={{height:"300px"}}>
                            <Grid item xs={5} style={{height:"200px"}}>
                                <img alt="eth" src={"http://wiki.hash.kr/images/thumb/d/d6/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80_%EB%A1%9C%EA%B3%A0.png/200px-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80_%EB%A1%9C%EA%B3%A0.png"}
                                    style={{width:"100%", maxHeight:"200px", maxWidth:"200px"}}>
                                </img>
                            </Grid>
                            <Grid item xs={2} style={{display:"flex", verticalAlign:"center"}}>
                                <Typography variant="h5" style={{margin:"auto", fontFamily : "BMJUA"}}>{" >>>"}</Typography>
                            </Grid>
                            <Grid item xs={5} style={{height:"200px"}}>
                                <img alt="ssc" src={"https://w.namu.la/s/233f5b353d9bd32fed47802d06c99bf2bb563165cfbb1b0916144f7663ddeaad6b65f481e0d1fe67f9e30b7464c0e8d6177028db551cf61248e82be00f93d8e8d852c85251884cc878293790d4f2fad93a6872e384b6ea11501643664191cb42"}
                                    style={{width:"100%", maxHeight:"200px", maxWidth:"200px"}}>
                                </img>
                            </Grid>

                            <Grid item xs={5}>
                                <TextField style={{height:"10%"}} type="number" onChange={v => setCoinValue(v.target.value)}/>
                            </Grid>
                            <Grid item xs={2} style={{display:"flex", verticalAlign:"center"}}>
                            
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>{coinValue} SSC</Typography>
                            </Grid>
                        </Grid>
                    : selectedValue === "1" ?
                        <Grid container direction="row" style={{height:"300px"}}>
                            <Grid item xs={5} style={{height:"200px"}}>
                            <img alt="ssc" src={"https://w.namu.la/s/233f5b353d9bd32fed47802d06c99bf2bb563165cfbb1b0916144f7663ddeaad6b65f481e0d1fe67f9e30b7464c0e8d6177028db551cf61248e82be00f93d8e8d852c85251884cc878293790d4f2fad93a6872e384b6ea11501643664191cb42"}
                                style={{width:"100%", maxHeight:"200px", maxWidth:"200px"}}>
                            </img>
                        </Grid>
                        <Grid item xs={2} style={{display:"flex", verticalAlign:"center"}}>
                            <Typography variant="h5" style={{margin:"auto", fontFamily : "BMJUA"}}>{" >>>"}</Typography>
                        </Grid>
                        <Grid item xs={5} style={{height:"200px"}}>
                            <img alt="eth" src={"http://wiki.hash.kr/images/thumb/d/d6/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80_%EB%A1%9C%EA%B3%A0.png/200px-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80_%EB%A1%9C%EA%B3%A0.png"}
                                style={{width:"100%", maxHeight:"200px", maxWidth:"200px"}}>
                            </img>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField style={{height:"10%"}} type="number" onChange={v => setCoinValue(v.target.value)}/>
                        </Grid>
                        <Grid item xs={2} style={{display:"flex", verticalAlign:"center"}}>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>{coinValue} ETH</Typography>
                        </Grid>

                    </Grid>
                    : 
                    <Grid container direction="row" style={{height:"300px"}}>
                        <Grid item xs={5} style={{height:"200px"}}>
                            <img src = {`img/fish${props.fishId}.png`} alt = "No Image!"elevation={5} style={{margin:"0 auto", width:"100%", height:"100%", maxHeight:"200px", maxWidth:"200px"}}/>
                        </Grid>
                        <Grid item xs={2} style={{display:"flex", verticalAlign:"center"}}>
                            <Typography variant="h5" style={{margin:"auto", fontFamily : "BMJUA"}}>{" >>>"}</Typography>
                        </Grid>
                        <Grid item xs={5} style={{height:"200px"}}>
                            <img alt="ssc" src={"https://w.namu.la/s/233f5b353d9bd32fed47802d06c99bf2bb563165cfbb1b0916144f7663ddeaad6b65f481e0d1fe67f9e30b7464c0e8d6177028db551cf61248e82be00f93d8e8d852c85251884cc878293790d4f2fad93a6872e384b6ea11501643664191cb42"}
                                style={{width:"100%", maxHeight:"200px", maxWidth:"200px"}}>
                            </img>
                        </Grid>

                        <Grid item xs={5}>
                        </Grid>
                        <Grid item xs={2} style={{display:"flex", verticalAlign:"center"}}>
                        
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>{props.fishId} SSC</Typography>
                        </Grid>
                    </Grid>
                    } 
                    <Button onClick={exchange}>교환하기</Button>
                </Paper>
            </Grid>
        </Grid>
    )

}