export function newProjectUI() {
    const createNewProjectButton = document.getElementsByClassName('new-project');

    createNewProjectButton.addEventListener('click', () => {
        const createNewProject = document.createElement('div');
        createNewProject.classList.add('details');
        createNewProject.textContent = 'Create a new project'

        createOverlayFor(createNewProject)

        createNewProject.append(exitPopup(details))

        document.body.append(createNewProject)
    })
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

// Function to render a project and its todos in the DOM
export function renderProjectToDOM(project) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = `Project: ${project.name}`;
    projectElement.appendChild(projectTitle);

    const todoList = document.createElement('ul');

    // Iterate over todos and create list items
    project.todos.forEach(todo => {
        //Kaller funksjon til å se detaljer
        const detailsButton = viewDetails(todo);
        const todoItem = document.createElement('li');
        todoItem.textContent = `Todo: ${todo.title}, Description: ${todo.description}`;
        todoList.append(todoItem, detailsButton);
    });

    projectElement.appendChild(todoList);
    return projectElement;
}

// Function to append a project to the DOM
export function appendProjectToDOM(project) {
    const main = document.getElementById('main-content'); // Get the main-content element
    const projectElement = renderProjectToDOM(project);  // Render project HTML
    main.appendChild(projectElement);  // Append to DOM
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