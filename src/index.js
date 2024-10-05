import "./style.css";
import CreateTodos from './scripts/CreateTodos.js';
import Project from "./scripts/Projects.js";
import { newProjectUI } from "./scripts/DOM_Stuff.js";

const project = Project.addNewProject('skole');
const project1 = Project.addNewProject('jobb'); // Create a new project
// const myTodo = new CreateTodos('Dette', 'gjøre ferdig', '02/10/2025', ''); // Create a new todo

document.addEventListener('DOMContentLoaded', () => {
    newProjectUI(); // Only set up the UI once when the DOM is fully loaded
});

// Retrieve all projects
const allProjects = Project.getProjects();
console.log(allProjects); 

const test = document.getElementById('test')
test.addEventListener('click', () => {
    console.log(allProjects); 
})