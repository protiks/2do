import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import useQueries from "../../utils/useQueries";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';

const Input = () => {
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const { addItem } = useQueries();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const handleCreateTodo = () => {
        addItem(newTodoTitle);
        setNewTodoTitle("");
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'center' }} p={2}>
            <Box m={'auto'} >
                <TextField sx={{ minWidth: 300 }} id="add-item" label="Add a new task" variant="filled" type="text" value={newTodoTitle} onChange={handleInputChange} />
            </Box>
            <Box m={'auto'} >
                <Button sx={{
                    minHeight: 55,
                    // ":hover": {
                    //     boxShadow: 2,

                    // }
                }} variant="text" onClick={handleCreateTodo}><AddBoxTwoToneIcon /></Button>
            </Box>
        </Box >
    );
};

export default Input