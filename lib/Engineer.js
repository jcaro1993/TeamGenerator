// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHub, title) {
        super(name, id, email);
        this.gitHub = gitHub;
        this.title = "Engineer";
    }
    getGithub() {
        return this.gitHub
    }
    getRole() {
        return this.title;
    }
}

module.exports = Engineer;