import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import useQueries from "../../utils/useQueries";


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
        <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'pink' }}>
            <TextField id="add-item" label="Create a New To-do..." variant="standard" type="text" value={newTodoTitle} onChange={handleInputChange} />
            <Button variant="text" onClick={handleCreateTodo}>Create</Button>
        </Box>
    );
};

export default Input