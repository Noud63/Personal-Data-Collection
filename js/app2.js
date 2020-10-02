// Person class
export class Person {
    constructor(name, yearOfBirth, city, id){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.city = city;
        this.id = id;
    }

    age() {
        const now = new Date().getFullYear();
        return now - this.yearOfBirth;
    }
}

