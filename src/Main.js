import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Intro from './components/Intro';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { amber, grey} from '@mui/material/colors';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box id='main' sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
        <Box sx={{paddingLeft: '15%'}}>
        {theme.palette.mode} mode
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
        <Intro/>
        <About />
        <Experience />
        <Contact />
        <Footer />
    </Box>
    
  );
}

export default function Main() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: amber,
                divider: amber[200],
                
                text: {
                  primary: '#141728',
                  secondary:'#141728',
                },
              }
            : {
                // palette values for dark mode
                primary: grey,
                divider: grey[900],
                background: {
                  default: '#141728',
                  paper: '#141728',
                },
                text: {
                  primary: '#f5f2da',
                  secondary: '#f5f2da',
                }}),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
