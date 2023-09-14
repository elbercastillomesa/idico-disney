import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Pages & Components Import
import Navbar from './components/Navbar';
import Movie from './pages/Movie'
import Character from './pages/Character'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`disney-tabpanel-${index}`}
      aria-labelledby={`disney-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography  component={'section'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `disney-tab-${index}`,
    'aria-controls': `disney-tabpanel-${index}`,
  };
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function App() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className='pages'>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="disney-universe-tabs">
                <Tab label="Movies" {...a11yProps(0)} />
                <Tab label="Characters" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Movie />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Character />
            </CustomTabPanel>
          </Box>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;