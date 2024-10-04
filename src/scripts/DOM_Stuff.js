import Project from "./Projects";

export function newProjectUI() {
    const createNewProjectButton = document.getElementById('new-project');

    createNewProjectButton.addEventListener('click', () => {
        // Create the overlay for the new project form
        const createNewProject = document.createElement('div');
        createNewProject.classList.add('details');
        createNewProject.textContent = 'Create a new project'

        createOverlayFor(createNewProject)

        // Create input field for project name
        const newProjectName = document.createElement('input');
        newProjectName.type = 'text';
        newProjectName.placeholder = 'Project name';

        // Create input field for project name
        const confirmProjectName = document.createElement('button');
        confirmProjectName.textContent = 'ENTER';

        confirmProjectName.addEventListener('click', () => {
            Project.addNewProject(newProjectName.value);

            const overlay = document.getElementById('overlay');
            document.body.removeChild(createNewProject)
            document.body.removeChild(overlay)
        })

        createNewProject.append(newProjectName,confirmProjectName,exitPopup(createNewProject))

        document.body.append(createNewProject)
    })
    return createNewProjectButton
}

//En funkjson til å se details i hver todo
function viewDetails(todo) {
    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.textContent = 'VIEW DETAILS';

    viewDetailsButton.addEventListener('click', () => {
        const details = document.createElement('div');
        details.classList.add('details');
        details.textContent = `Todo: ${todo.title}, Description: ${todo.description}, ${todo.calcDueDate()}`
      
        createOverlayFor(details);

        details.append(exitPopup(details))

        document.body.append(details)
    })
    return viewDetailsButton;
}

function projectOnClick(project){
    const projectName = document.getElementById('project-name');
    const todoList = document.createElement('div');
    projectName.textContent = `${project.name}`;


}

// Function to render a project and its todos in the DOM
export function renderProjectToDOM(project) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = `${project.name}`;
    projectElement.appendChild(projectTitle);

    projectElement.addEventListener('click', () => {
        projectOnClick(project)
    })

    return projectElement;
}

// Function to append a project to the DOM
export function appendProjectToDOM(project) {
    const main = document.getElementById('projects'); // Get the main-content element
    // Check if the project already exists in the DOM
    const existingProject = document.getElementById(`project-${project.name}`);
    if (existingProject) {
        // If it exists, update the existing project
        updateTodoDisplay(existingProject, project);
    } else {
        // If it doesn't exist, render and append the project
        const projectElement = renderProjectToDOM(project);
        main.appendChild(projectElement);
    }
}
function createTodosForProject() {

}
// Function to update the todo display for an existing project
function updateTodoDisplay(projectElement, project) {
    const todoList = projectElement.querySelector(`#todos-${project.name}`);
    
    // Clear existing todos (optional)
    todoList.innerHTML = '';

    // Re-render todos
    project.todos.forEach(todo => {
        const detailsButton = viewDetails(todo); // Assuming this returns a button for viewing details
        const todoItem = document.createElement('li');
        todoItem.textContent = `Todo: ${todo.title}, Description: ${todo.description}`;
        todoList.append(todoItem, detailsButton);
    });
}

function createOverlayFor(popup){
    //Lager en grå overlay for å sette detaljer i fokus
    const overlay = document.createElement('div');
    overlay.id = 'overlay';


    overlay.addEventListener('click', () => {
        document.body.removeChild(popup)
        document.body.removeChild(overlay);
    })

    // Append the overlay to the body
    document.body.appendChild(overlay);

    return overlay;

}

//Lager en knapp i detalje
function exitPopup(popup) {
    const exitButton = document.createElement('button');
    exitButton.textContent = 'CANCEL';

    exitButton.addEventListener('click', () => {
        const overlay = document.getElementById('overlay');
        document.body.removeChild(popup)
        document.body.removeChild(overlay)
    })

    return exitButton;
}