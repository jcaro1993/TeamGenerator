// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber, title) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.title = "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber
    }
    getRole() {
        return this.title;
    }
}

module.exports = Manager;