import React, {useEffect, useState, useCallback, FocusEvent, KeyboardEvent} from 'react';
import {SocketClient} from "@cognigy/socket-client";
import {MessageData, WsChatState,} from '../Components/Interfaces';
import {useSelector, useDispatch} from 'react-redux'
import {getMessage, sendMessage, setError} from "../redux/actions";
import Loader from "./Loader";
import {Grid, Container, Button, FormControl, TextField, Card} from "@material-ui/core";
import {AddComment} from '@material-ui/icons';
import ErrorIcon from '@material-ui/icons/Error';

import './App.scss'


const App = () => {
    const [loading, setLoading] = useState(false);
    const [client, setClient] = useState(null);
    const [inputVal, setInputVal] = useState('');
    const error = useSelector((state: WsChatState) => state?.error);
    const messagesArr = useSelector((state: WsChatState) => state?.messagesArr);
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
            });

            // establish a socket connection (returns a promise)
            await client.connect();

            setClient(client);
        } catch (e) {
            dispatch(setError(true));
        }
    };


    useEffect(() => {
        setLoading(true);
        openConnection().then(() => setLoading(false));
    }, []);

    const onMSGSubmit = (msg: MessageData) => {
        if (!client || msg.text === '') return;
        client.sendMessage(msg.text, msg.data);
        dispatch(sendMessage(msg));
    };

    const handleBlur = useCallback((e?: FocusEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    }, []);

    const handleClick = useCallback((e?: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const target = e.target as HTMLInputElement;
            onMSGSubmit({text: target.value});
        }
    }, [client]);

    return (
        <Container fixed>
            <Grid container>
                <Grid container item xs={12} className="chat-area">
                    {loading && <Loader/>}
                    {error && <span className="chat-init-error"><ErrorIcon></ErrorIcon> Something went wrong</span>}
                    {messagesArr.length > 0 &&
                    <div className="chat-content">
                        {messagesArr.map(({text, isBot}, index) => {
                            const wrapperClassName = isBot ? 'chat-wrap-card chat-bot' : 'chat-wrap-card';
                            return <div key={text + index} className={wrapperClassName}>
                                <Card>
                                    {text}
                                </Card>
                            </div>
                        })}
                    </div>
                    }
                </Grid>
                <Grid container item xs={10}>
                    <FormControl fullWidth>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Write Your message here..."
                            rowsMax={4}
                            variant="filled"
                            disabled={loading || error}
                            className="chat-input"
                            onBlur={handleBlur}
                            onKeyUp={handleClick}
                        />
                    </FormControl>
                </Grid>
                <Grid container item xs={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        disabled={loading || error}
                        onClick={() => onMSGSubmit({text: inputVal})}
                        startIcon={<AddComment/>}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
