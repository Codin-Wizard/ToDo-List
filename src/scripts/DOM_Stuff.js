function viewDetails(todo) {
    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.textContent = 'VIEW DETAILS';

    viewDetailsButton.addEventListener('click', () => {
        const details = document.createElement('div');
        details.classList.add('details');
        details.textContent = `Todo: ${todo.title}, Description: ${todo.description}, ${todo.calcDueDate()}`

        const exitDetails = document.createElement('button');
        exitDetails.textContent = 'CANCEL';
        exitDetails.addEventListener('click', () => {
            body.removeChild(details)
        })

        details.append(exitDetails)
        const body = document.querySelector('body');

        body.append(details)
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