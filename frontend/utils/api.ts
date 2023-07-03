export enum http {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
const headers = {
    'Content-Type': 'application/json',
};

export const getTodo = async () => {
    const response = await fetch('/todos');
    const responseData = await response.json();
    console.log(responseData)
    return responseData;
};

export const createItem = async (item: string) => {
    if (typeof item !== 'string') {
        console.log('Item should be a string.');
        return;
    }

    if (item.trim() === '') {
        console.log('Cannot create an empty todo.');
        return;
    }

    const response = await fetch('/todos', {
        method: http.POST,
        headers,
        body: JSON.stringify({ todo: item }),
    });
    const createdTodo = await response.json();
    return createdTodo;
};

export const updateTodo = async (data: { id: string, title: string, complete: boolean }) => {
    const { id, title, complete } = data
    console.log('%cUpdating todo...', 'color: blue', id, title);
    console.log('title:', title)
    const response = await fetch(`/todos/${id}`, {
        method: http.PATCH,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, complete }),
    });

    if (!response.ok) {
        const errorMessage = `Error updating todo: ${response.status} ${response.statusText}`;
        console.log(`%c${errorMessage}`, 'color: red');
        throw new Error(errorMessage);
    }

    console.log('%cTodo updated successfully!', 'color: green');
};


export const deleteTodo = async (id: string) => {
    const response = await fetch(`/todos/${id}`, {
        method: http.DELETE,
    });

    if (!response.ok) {
        throw new Error(`Error deleting todo: ${response.status} ${response.statusText}`);
    }
};

