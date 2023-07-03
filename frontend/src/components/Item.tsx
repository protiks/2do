import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useQueries from "../../utils/useQueries";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

type Props = {
    id: string;
    title: string;
    complete: boolean;
};

const Item: React.FC<Props> = ({ id, title, complete }) => {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [checked, setChecked] = useState(complete);
    console.log('checked', checked)
    console.log('', complete)
    const { updateItem, deleteItem } = useQueries()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUpdatedTitle(value);
    };

    const handleUpdate = () => {
        console.log({ id, title: updatedTitle })
        updateItem({ id, title: updatedTitle, complete: checked })
    }

    const handleDelete = () => {
        deleteItem(id)
    }

    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        handleUpdate();
    }, [updatedTitle, checked]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }} key={id}>
            <TextField
                sx={{ marginRight: 2 }}
                id={id}
                type="text"
                value={updatedTitle}
                onChange={handleInputChange}
            />
            <Box m={'auto'}>
                <Checkbox checked={checked} onChange={handleCheckBox} />
                <Button variant="text" onClick={handleDelete}><HighlightOffTwoToneIcon /></Button>
            </Box>
        </Box>
    );
};

export default Item