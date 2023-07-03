import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteTodo, getTodo, updateTodo } from './api';

const useQueries = () => {
    const queryClient = useQueryClient()

    const { status, data } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodo,
    })

    const { mutate: addItem } = useMutation(
        (title: string) => createItem(title),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['todos']);
            },
        }
    );
    const { mutate: updateItem } = useMutation(
        (data: { id: string; title: string, complete?: boolean }) =>
            updateTodo(data),
        {
            onSuccess: () => { queryClient.invalidateQueries(['todos']); }
        }
    );

    const { mutate: deleteItem } = useMutation(
        (id: string) =>
            deleteTodo(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['todos'])
            }
        }
    );


    return {
        data,
        status,
        addItem,
        updateItem,
        deleteItem,
    };
};

export default useQueries;
