import React, {useEffect, useState} from 'react';

import { SocketClient }  from "@cognigy/socket-client";
import {useSelector, useDispatch} from 'react-redux'
import {Grid, Container, Button, FormControl, TextField} from "@material-ui/core";
import { AddComment } from '@material-ui/icons';
import ErrorIcon from '@material-ui/icons/Error';
import {MessageData, WsChatAction, WsChatState, } from '../Components/Interfaces';

import './App.scss'
import Loader from "./Loader";
import {getMessage, sendMessage, setError} from "../redux/actions";


const App = () => {
    const [loading, setLoading] = useState(false);
    const [loadWsError, setLoadWsError] = useState(false);
    const [client, setClient] = useState(null);
    const error = useSelector((state: WsChatState) => state?.error);
    const dispatch = useDispatch();


    const openConnection = async () => {
        try {
            const client = new SocketClient(
                "https://endpoint-demo.cognigy.ai",
                "ce5c41bdbd3cc71fbb81b0f192e46c9b1f306988cc03d9bc5a348ad96d249aba",
                {
                    forceWebsockets: true,
                });
            // register a handler for messages

            client.on("output", (output) => {
                dispatch(getMessage(output));
                console.log("Text: " + output.text + "   Data: " + output.data);
            });

            // establish a socket connection (returns a promise)
            await client.connect();

            setClient(client);
        } catch(e) {
            dispatch(setError(true));
        }
    };


    useEffect(() => {
        setLoading(true);
        openConnection().then(() => setLoading(false));
    },[]);

    const onMSGSubmit = (msg:MessageData) => {
        if (!client) return;
        client.sendMessage(msg.text, msg.data);
        dispatch(sendMessage(msg));
    }

    return (
        <Container fixed>
            <Grid container>
                <Grid container item xs={12} className="chat-area">
                    {loading && <Loader/>}
                    {error && <span className="chat-init-error"><ErrorIcon></ErrorIcon> Something went wrong</span>}
                </Grid>
                <Grid container item xs={10}>
                    <FormControl fullWidth>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Write Your message here..."
                        multiline
                        rowsMax={4}
                        variant="filled"
                        disabled={loading || error}
                        className="chat-input"
                    />
                    </FormControl>
                </Grid>
                <Grid container item xs={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        disabled={loading || error}
                        onClick = {() => onMSGSubmit({text: 'text'}) }
                        startIcon={<AddComment/>}>Send</Button>
                </Grid>
            </Grid>
        </Container>

    );
};

export default App;
