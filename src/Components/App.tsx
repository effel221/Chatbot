import React, {useEffect, useState} from 'react';
import {TweetSettingsAdded} from './Interfaces';
import { useDispatch } from "react-redux"
import {Grid, Container, Button, FormControl, TextField} from "@material-ui/core";
import { AddComment } from '@material-ui/icons';

import './App.scss'


const App = () => {
    return (
        <Container fixed>
            <Grid container xs={12}>
                <Grid container item xs={12} className="chat-area">

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
