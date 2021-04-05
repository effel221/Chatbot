import React, {useEffect, useState} from 'react';
import {TweetSettingsAdded} from './Interfaces';
import { SocketClient }  from "@cognigy/socket-client";
import {useSelector, useDispatch} from 'react-redux'
import {Grid, Container, Button, FormControl, TextField} from "@material-ui/core";
import { AddComment } from '@material-ui/icons';
import ErrorIcon from '@material-ui/icons/Error';

import './App.scss'
import Loader from "./Loader";


const App = () => {
    const [loading, setLoading] = useState(false);
    const [loadWsError, setLoadWsError] = useState(false);
    const currentUser = useSelector(state => state);
    const dispatch = useDispatch()


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
                console.log("Text: " + output.text + "   Data: " + output.data);
            });

            // establish a socket connection (returns a promise)
            await client.connect();

            // send a message with text, text and data, data only
            client.sendMessage("hello there");
            client.sendMessage("hello there", { color: "green" });
            client.sendMessage("", { color: "green" });
        } catch(e) {
            setLoadWsError(true);
        }
    };


    useEffect(() => {
        setLoading(true);
        openConnection().then(() => setLoading(false));
    },[]);

    return (
        <Container fixed>
            <Grid container>
                <Grid container item xs={12} className="chat-area">
                    {loading && <Loader/>}
                    {loadWsError && <span className="chat-init-error"><ErrorIcon></ErrorIcon> Something went wrong</span>}
                </Grid>
                <Grid container item xs={10}>
                    <FormControl fullWidth>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Write Your message here..."
                        multiline
                        rowsMax={4}
                        variant="filled"
                        className="chat-input"
                    />
                        </FormControl>
                </Grid>
                <Grid container item xs={2}>
                    <Button variant="contained" fullWidth color="primary" startIcon={<AddComment/>}>Send</Button>
                </Grid>
            </Grid>
        </Container>

    );
};

export default App;
