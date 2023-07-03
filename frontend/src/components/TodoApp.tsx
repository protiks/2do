import useQueries from "../../utils/useQueries"
import Input from "./Input"
import List from "./List"
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import BasicTabs from "./Tabs"


const ToDoApp = () => {
    const { status, data } = useQueries()

    if (status === 'loading') {
        return (
            <>loading</>
        )
    }

    return (
        <Box sx={{
        }}>
            <Grid
                container
                justifyContent="center"
            >
                <BasicTabs />
            </Grid>
        </Box>
    )
}

export default ToDoApp
