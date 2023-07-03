import useQueries from "../../utils/useQueries"
import Input from "./Input"
import List from "./List"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"


const ToDoApp = () => {
    const { data, status } = useQueries()
    console.log(data)

    if (status === 'loading') {
        return (
            <>loading</>
        )
    }

    return (
        <Box sx={{ backgroundColor: 'lightblue' }}>
            <Input />
            <List todos={data} />
        </Box>
    )
}

export default ToDoApp
