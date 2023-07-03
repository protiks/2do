class Todo {

	id: string;
	title: string;
	complete: boolean;

	constructor(id: string, title: string, complete: boolean) {
		this.id = id;
		this.title = title;
		this.complete = complete;
	}
}

export default Todo;