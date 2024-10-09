import { updateProjectDisplay } from "./DOM_Stuff";
const projects = [];

export default class Project {
  constructor(name) {
    this.name = name; // Navnet på prosjektet
    this.todos = []; // En tom liste for å holde på alle todos
  }

  // Legg til en ny todo i prosjektet
  addTodo(todo) {
    this.todos.push(todo); // Legg til todo-objektet i todos-listen
  }

  displayProject() {
    updateProjectDisplay(this);
  }

  // Function to add a new project to the projects array
  static addNewProject(projectName) {
    const newProject = new Project(projectName);
    projects.push(newProject);
    newProject.displayProject(); // Display the new project in the DOM
    return newProject; // Return the created project
  }

  static getProjects() {
    return projects;
  }
}
