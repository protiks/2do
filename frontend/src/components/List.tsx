import { Box } from "@mui/material";
import Item from "./Item";

export type Todo = {
    id: string;
    title: string;
    complete: boolean;
};

type Props = {
    todos: Todo[];
};

const List: React.FC<Props> = ({ todos }) => {
    console.log(todos)
    return (
        <Box sx={{}}>
            {todos.map((todo) => (
                <Box m={2}>
                    <Item
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        complete={todo.complete}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default List