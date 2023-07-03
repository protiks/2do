import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from './List';
import useQueries from '../../utils/useQueries';
import Input from './Input';
import { Grid } from '@mui/material';
import TabPanel from './TabPanel';



const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const BasicTabs = () => {
    const { data } = useQueries()
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const completedTodos = data.filter((todo: { complete: boolean; }) => todo.complete);
    const pendingTodos = data.filter((todo: { complete: boolean; }) => !todo.complete);

    const handleClear = () => {
        console.log("clear")
    }

    return (
        <Grid>
            <Box sx={{
                borderRadius: 5, marginTop: '15vh', minHeight: 600,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                ":hover": {
                    boxShadow: 20,

                }
            }}>
                <Input />
                <Box sx={{
                    borderBottom: 1, borderColor: 'divider', ":hover": {
                        boxShadow: 1,

                    }
                }}>
                    <Box sx={{ paddingLeft: 5, justifyContents: 'center' }}>
                        <Tabs sx={{ justifyContents: 'center' }} value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="All" {...a11yProps(0)} />
                            <Tab label="Pending" {...a11yProps(1)} />
                            <Tab label="Completed" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </Box>
                <TabPanel value={value} index={0}>
                    <List todos={data} key='all' />
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <List todos={pendingTodos} key='pending' />
                </TabPanel>
                <TabPanel value={value} index={2} key='completed'>
                    <List todos={completedTodos} />
                </TabPanel>
            </Box >
        </Grid >
    );
}

export default BasicTabs 