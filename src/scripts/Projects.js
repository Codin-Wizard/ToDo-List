import { appendProjectToDOM } from './DOM_Stuff'; 

export default class Project {
    constructor(name) {
        this.name = name; // Navnet på prosjektet
        this.todos = [];  // En tom liste for å holde på alle todos
    }

    // Legg til en ny todo i prosjektet
    addTodo(todo) {
        this.todos.push(todo); // Legg til todo-objektet i todos-listen
    }

    displayProject(){
        appendProjectToDOM(this)
    }
    
}