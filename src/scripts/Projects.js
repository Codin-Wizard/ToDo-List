export default class Project {
    constructor(name) {
        this.name = name; // Navnet på prosjektet
        this.todos = [];  // En tom liste for å holde på alle todos
    }

    // Legg til en ny todo i prosjektet
    addTodo(todo) {
        this.todos.push(todo); // Legg til todo-objektet i todos-listen
    }

    // Vis alle todos i prosjektet
    showTodos() {
        if (this.todos.length === 0) {
            return `Prosjektet ${this.name} har ingen oppgaver.`;
        }
        
        return this.todos.map((todo, index) => {
            return `Oppgave ${index + 1}: ${todo.title} - ${todo.description}`;
        }).join("\n"); // Returnerer en liste over alle oppgaver
    }
}