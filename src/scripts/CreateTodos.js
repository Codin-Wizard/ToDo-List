export default class CreateTodos {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    text() {
        const title = this.title;
        const description = this.description;

        return `The title is ${title}, and text is ${description}`;
    }
}

