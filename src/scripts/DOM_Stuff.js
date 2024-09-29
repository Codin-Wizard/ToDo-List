export default class appendProjectToProjects {
    constructor(project) {
        this.project = project;
    }

    appendProject(){
        const main = document.getElementById('main-content');

        return main.append(this.project)
    }
}