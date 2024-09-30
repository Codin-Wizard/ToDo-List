import "./style.css";
import CreateTodos from './scripts/CreateTodos.js';
import Project from "./scripts/Projects.js";
import { newProjectUI } from "./scripts/DOM_Stuff.js";

const project = new Project('skole')
// Opprett en ny instans av klassen
const myTodo = new CreateTodos('Dette','gjøre ferdifg','02/10/2025','');

newProjectUI();
project.addTodo(myTodo)

project.displayProject();
console.log(project.showTodos()); 