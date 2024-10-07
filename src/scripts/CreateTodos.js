export default class CreateTodos {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
    }

    text() {
        const title = this.title;
        const description = this.description;

        return `The title is ${title}, and text is ${description}`;
    }

    calcDueDate() {
        if(!this.dueDate) return 'No due date';

        const currentDay = new Date(); //Dagens dato
        const dueDate = new Date(this.dueDate); //Antar at duedate er i framtiden

        // Beregn differansen i millisekunder mellom forfallsdato og dagens dato
        const differenceInTime = dueDate - currentDay;

        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        
        if(differenceInDays == 0) return 'Due today'

        return `In ${differenceInDays} days.`;
    }

    getPriority() {
        
    }
}

