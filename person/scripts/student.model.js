export class Student {
    #id;
    #fullname;
    #age;
    #sex;
    #program;
    #year;
    #section;
    #birthdate;
  
    constructor(id, fullname, age, sex, program, year, section, birthdate) {
      this.id = id;
      this.fullname = fullname;
      this.age = age;
      this.sex = sex;
      this.program = program;
      this.year = year;
      this.section = section;
    }
  
    // ID
    get id() {
      return this.#id;
    }
    set id(value) {
      this.#id = value;
    }
  
    // Fullname
    get fullname() {
      return this.#fullname;
    }
    set fullname(value) {
      this.#fullname = value;
    }
  
    // Age
    get age() {
      return this.#age;
    }
    set age(value) {
      this.#age = value;
    }
  
    // Sex
    get sex() {
      return this.#sex;
    }
    set sex(value) {
      this.#sex = value;
    }
  
    // Program
    get program() {
      return this.#program;
    }
    set program(value) {
      this.#program = value;
    }
  
    // Year
    get year() {
      return this.#year;
    }
    set year(value) {
      this.#year = value;
    }
  
    // Section
    get section() {
      return this.#section;
    }
    set section(value) {
      this.#section = value;
    }

    get birthdate() {
      return this.#birthdate;
    }
    set birthdate(value) {
      this.#birthdate = value;
    }
  
    toObject() {
      return {
        id: this.id,
        fullname: this.fullname,
        age: this.age,
        sex: this.sex,
        program: this.program,
        year: this.year,
        section: this.section
      };
    }
  }