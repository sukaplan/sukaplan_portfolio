import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/Contact.css';

export default function Contact ()
{
    return (
        <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center" id="contact">
            <Grid xs>  
                    <a href={'https://github.com/sukaplan'} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon style={{ fontSize: 35 }}></GitHubIcon>
                    </a>
                    
            </Grid>
            <Grid xs>   
            <a href={'mailto:suukaplan@outlook.com'}>
                    <EmailRoundedIcon style={{ fontSize: 35 }}></EmailRoundedIcon>
                    </a>
            </Grid>
            <Grid xs> 
                    <a href={'https://www.linkedin.com/in/su-kaplan/'} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon style={{ fontSize: 35 }}></LinkedInIcon>

                    </a>
            </Grid>
        </Grid>
    );
}
    