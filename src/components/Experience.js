import React from 'react';
import FadeIn from 'react-fade-in';
import JobList from './JobList';
import Box from '@mui/material/Box';
import '../styles/Experience.css';

const Experience = () => { 
    return (
        <Box id="experience" >
            <FadeIn delay={200}>
                <div className='section-header'>
                    <span className='section-title'>
                        / Experience
                    </span>
                </div>
                <JobList></JobList>
            </FadeIn>
        </Box>
    );
}

export default Experience;