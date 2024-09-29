import "./style.css";
import CreateTodos from './scripts/CreateTodos.js';
import Project from "./scripts/Projects.js";

const project = new Project('skole')
// Opprett en ny instans av klassen
const myTodo = new CreateTodos('Dette','gjøre ferdifg','02/10/2025','');


project.addTodo(myTodo)

project.displayProject();
console.log(project.showTodos()); 