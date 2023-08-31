import React from "react";
import { TypeAnimation } from 'react-type-animation';
import FadeIn from 'react-fade-in';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import '../styles/Intro.css';

const Intro = () => {
  return (
    <Box id="intro" sx={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
      p: 3,
    }}> 
        
        <FadeIn delay={200}> 
        <TypeAnimation
            sequence={[
                'Hello',
                1000,
                'Hola',
                1000,
                'Merhaba',
                1000,
                'Hallo',
                1000,
                'Bonjour',
                1000,
                'Ciao',
                1000,
                'Привет',
                1000,
                'こんにちは',
                1000,
                '你好',
                1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '3em', color: '#dcf376'}}
            repeat={Infinity} className="intro-subtitle"
        />
        <div className="intro-title" > Su here. </div>
          <div className="intro-desc">
            Welcome to my page. Feel free to explore!
          </div>
          <div className="intro-contact">
            <a href="mailto:suukaplan@outlook.com">
              <MailIcon id="mailicon"></MailIcon>
              {"Say hi!"}
            </a>
          </div>
          
        </FadeIn>
    </Box>
        
  );
};

export default Intro;
