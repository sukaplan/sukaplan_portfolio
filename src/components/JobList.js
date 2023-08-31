import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FadeIn from 'react-fade-in';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function JobList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const experienceItems = {
        Intertech: {
        jobTitle: "Expert Software Engineer @",
        duration: "JAN 2022 - PRESENT",
        desc: [
          `Assisted in the software development and maintenance of the Securities module of the company's
          banking application, inter-Securities`,
          `Worked with the microservice module of Securities and participated in the creation of customized
          dashboard applications for banking solutions, using Asp.Net Core and React.Js`,
          `Utilized strategic engineering solutions to improve the application`,
          `Practiced agile development methodologies`
            ]
        },
        infoTRON: {
            jobTitle: "Software Engineer Intern @",
            duration: "JAN 2022 - PRESENT",
            desc: [
              `Worked with the Department of Simulation and Virtual Reality Technologies`,
              `Performed unit tests on the virtual environment project on Unity using C# language`,
              `Assisted in controlling and creating user-manuals and program documents.`
                ]
        },
        KarşıyakaMunicipality: {
            jobTitle: "Software Engineer Intern @",
            duration: "JAN 2022 - PRESENT",
            desc: [
              `Trained with the database administrator using Oracle Database`,
              `Assigned to work with the IT team and assisted in the performance issues of triggers and stored
              functions`,
              `Obtained solid understanding of database design and management`
                ]
        },
        DokuzEylulUniversity: {
            jobTitle: "Software Engineer Intern @",
            duration: "JAN 2022 - PRESENT",
            desc: [
              `Implemented a Smart Home Systems that monitors the temperature, outdoor pressure and RFID
              door lock controlling system using Arduino Uno microcontroller board`,
             `Connected the smart home system data to Ubidots using WiFi module and created a specialized
              monitoring dashboard`,
              `Implemented an automated system with ultrasonic distance sensor to turn on LED lights for the
              smart home`]
        },


    };
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.default',
      color: 'text.primary', display: 'flex', height: 300 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab label={key} {...a11yProps(i)} />
        ))}
      </Tabs>
      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel value={value} index={i}>
          <span className="joblist-job-title">
            {experienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company">{key}</span>
          <div className="joblist-duration">
            {experienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {experienceItems[key]["desc"].map(function (descItem, i) {
              return (
                <FadeIn delay={`${i + 2}00`}>
                  <li key={i}>{descItem}</li>
                </FadeIn>
              );
            })}
          </ul>
        </TabPanel>
        ))}
    </Box>
  );
}
