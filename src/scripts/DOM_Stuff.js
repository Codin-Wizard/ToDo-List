import Project from "./Projects";
import CreateTodos from "./CreateTodos";
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

        // Function to handle project creation and close overlay
    function handleProjectCreation() {
        if (newProjectName.value.trim()) { // Only proceed if input is not empty
            Project.addNewProject(newProjectName.value);

            const overlay = document.getElementById('overlay');
            document.body.removeChild(createNewProject);
            document.body.removeChild(overlay);
        }
    }

    // Click event for confirmation button
    confirmProjectName.addEventListener('click', handleProjectCreation);

    // Keydown event for Enter key, attached only to the newProjectName input or createNewProject form
    createNewProject.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleProjectCreation();
        }
    });
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
    const content = document.getElementById('main-content');
    const projectHeader = document.createElement('h1');
    projectHeader.id = 'project-name' 

    const todoList = document.createElement('div'); // Container for the todos
    todoList.classList.add('todo-list');
    


    //Sett overskriften til prosjekt navnet
    projectHeader.textContent = `${project.name}`;
    
     // Display current todos for the project
     project.todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.textContent = `Todo: ${todo.title}, Description: ${todo.description}`;
        todoList.appendChild(todoItem);
    });

    const addTodo = document.createElement('div');
    addTodo.classList.add('click', 'add-task')

    

    addTodo.textContent = 'Add Task'
    addTodo.addEventListener('click', () => {
        createTodosForProject(project);
    })
    //Fjern alt fra siden også legg til alt
    content.innerHTML = '';
    content.append(projectHeader,todoList,addTodo)
}

// Function to render a project and its todos in the DOM
export function renderProjectToDOM(project) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    projectElement.id = `project-${project.name}`; // Set the id based on the project name

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
function createTodosForProject(project) {
    // Create a div to hold the form
    const content = document.getElementById('main-content')
    const addTodo = document.createElement('div');
    addTodo.classList.add('details');
    
    // Title input
    const todoTitle = document.createElement('input');
    todoTitle.type = 'text';
    todoTitle.placeholder = 'Task Title';

    // Description input
    const todoDescription = document.createElement('textarea');
    todoDescription.placeholder = 'Task Description';

    // Due Date input
    const todoDueDate = document.createElement('input');
    todoDueDate.type = 'date';

    // Priority input
    const todoPriority = document.createElement('select');
    const priorityOptions = ['High', 'Medium', 'Low'];
    priorityOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        todoPriority.appendChild(option);
    });

    // Add Button to create a new todo
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Todo';

    // Append form elements to the addTodo div
    addTodo.appendChild(todoTitle);
    addTodo.appendChild(todoDescription);
    addTodo.appendChild(todoDueDate);
    addTodo.appendChild(todoPriority);
    addTodo.appendChild(addButton);

    // Append the entire form to the DOM (you can append this wherever you want in your UI)
    createOverlayFor(addTodo)
    document.body.append(addTodo)

    // Event listener to create a new todo on button click
    addButton.addEventListener('click', () => {
        const newTodo = new CreateTodos(
            todoTitle.value,
            todoDescription.value,
            todoDueDate.value,
            todoPriority.value
        );
        const overlay = document.getElementById('overlay');
        document.body.removeChild(addTodo)
        document.body.removeChild(overlay)
        // Add the newly created todo to the project
        project.addTodo(newTodo);

        // Clear the form after adding the todo
        todoTitle.value = '';
        todoDescription.value = '';
        todoDueDate.value = '';
        todoPriority.value = 'Medium'; // Reset to a default value

        updateTodoDisplay(project)
    });
}

function updateTodoDisplay(project) {
    const content = document.getElementById('main-content');
    const todoList = document.querySelector('.todo-list');
    
    // Clear the current todo list
    todoList.innerHTML = '';
    
    // Re-populate the todo list with updated todos
    project.todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.textContent = `Todo: ${todo.title}, Description: ${todo.description}`;
        todoList.appendChild(todoItem);
    });
    
    const addTaskButton = document.querySelector('.click');
    if (addTaskButton && !todoList.contains(addTaskButton)) {
        todoList.appendChild(addTaskButton);
    }
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