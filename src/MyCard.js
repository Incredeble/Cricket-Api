import React, { useState } from 'react'
import { Card, CardContent, CardMedia, Typography, makeStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { getMatchDetail } from './Api';

const useStyles = makeStyles({
    root: {
        marginTop: "20px",
        marginBottom: "20px",
        marginRight: "20px",
        marginLeft: "20px",
        position: "relative",
        maxWidth: 400,
        height : 250,
        boxShadow: "2px 2px 5px 5px grey",
    },
    first: {
        width: "100px",
        position: "absolute",
        top: "30px",
        left: "30px",
        textAlign: "left",
        color: "white",
        backgroundColor: "none",
        fontFamily: "Comic Sans MS",
        fontSize: "20px"
    },
    second: {
        width: "120px",
        position: "absolute",
        bottom: "60px",
        textAlign: "right",
        right: "30px",
        color: "white",
        backgroundColor: "none",
        fontFamily: "Comic Sans MS",
        fontSize: "20px"
    },
    media: {
        height: 190,
    },
    ic : {
        right:"1px",
    },
    bton1 : {
        height:30,
        top:"5px",
        bottom:"10px",
        right:"10px",
        backgroundColor: "#1E90FF",
        color: "white",
        border:"2px solid #fff",
        boxShadow: "5px 5px 5px grey",
        mozoxShadow: "10px 10px 5px grey",
        webkitBoxShadow: "5px 5px 5px grey",
        '&:hover': {
            backgroundColor: "#1E90FF",
        }
    },
    bton2 : {
        height: 30,
        top:"5px",
        bottom:"10px",
        left:"10px",
        backgroundColor:"#1E90FF",
        color: "white",
        boxShadow: "5px 5px 5px grey",
        mozoxShadow: "10px 10px 5px grey",
        webkitBoxShadow: "5px 5px 5px grey",
        pointerEvents: "none",
        display:"inline-block",
    },
});

const MyCard = ({ match }) => {
    const [detail, setDetail] = useState({});
    const [open, setOpen] = useState(false);

    const handleClose = (id) => {
        setOpen(false);
    };

    const handleOpen = (id) => {
        setOpen(true);
    };

    const handleClick = (id) => {
        getMatchDetail(id).then((data) => {
            console.log(data);
            setDetail(data);
            handleOpen();
        }).catch((error) => { console.log(error) });
    }

    const getDialog = () => (
        <Dialog open={open} onClose={handleClose}>
            <DialogActions>
                {<Button onClick={handleClose} className={classes.ic} autoFocus><img src={process.env.PUBLIC_URL +  "close.png"} alt="Close" width="20px" height="20px" /></Button>}
            </DialogActions>
            <DialogTitle id="alert-dialog-title">
                {
                    "Match Deatils..."
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography> {detail.state} </Typography>
                    <Typography> Match <span style={{ fontStyle: "italic", fontWeight: "bold" }}> {detail.matchStarted ? "Started" :  "Still nor strted" }{" "} </span> </Typography>
                    <Typography> Score <span style={{ fontStyle: "italic", fontWeight: "bold" }}> {detail.score} </span> </Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );


    const classes = useStyles();
    const getMatchCard = () => {
        return (
            <Card className={classes.root} >
                <CardContent className={classes.media}>
                    <CardMedia
                        alt="v/s"
                        className={classes.media}
                        image={process.env.PUBLIC_URL + "/vs.jpg"}
                        title="Teams"
                    />
                    <Typography gutterBottom
                        variant="h1"
                        component="h1"
                        className={classes.first}>
                        {match["team-1"]}
                    </Typography>
                    <Typography gutterBottom
                        variant="h1"
                        component="h1"
                        className={classes.second}>
                        {match["team-2"]}
                    </Typography>
                    <Typography className="details">
                        <Button onClick={() => { handleClick(match.unique_id); }} className={classes.bton1}>Show Details</Button>
                        <Button className={classes.bton2}>Time {new Date(match.dateTimeGMT).toLocaleString()}</Button>
                    </Typography>
                </CardContent>
            </Card>
        );
    };



    return (
        <>
            {getMatchCard()}
            {getDialog()}
        </>

    )
};

export default MyCard;