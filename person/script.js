const formContainer = document.querySelector(".form__container");
const tableContainer = document.querySelector(".table__container");
const formButton = document.querySelector(".form-button");

function toggleCurrent(container) {
  container.classList.toggle("current");
  container.classList.toggle("ncurrent");
}

formContainer.addEventListener("click", () => {
  if (formContainer.classList.contains("current")) {
    return;
  }
  toggleCurrent(formContainer);
  toggleCurrent(tableContainer);
});
// a
tableContainer.addEventListener("click", () => {
  if (tableContainer.classList.contains("current")) {
    return;
  }
  toggleCurrent(formContainer);
  toggleCurrent(tableContainer);
});

class Student {
  constructor(id, fullname, age, sex, program, year, section) {
    this.id = id;
    this.fullname = fullname;
    this.age = age;
    this.sex = sex;
    this.program = program;
    this.year = year;
    this.section = section;
  }

  // Getters
  getId() {
    return this.id;
  }

  getFullname() {
    return this.fullname;
  }

  getAge() {
    return this.age;
  }

  getSex() {
    return this.sex;
  }

  getProgram() {
    return this.program;
  }

  getYear() {
    return this.year;
  }

  getSection() {
    return this.section;
  }

  // Setters
  setFullname(newFullname) {
    this.fullname = newFullname;
  }

  setAge(newAge) {
    this.age = newAge;
  }

  setProgram(newProgram) {
    this.program = newProgram;
  }

  setYear(newYear) {
    this.year = newYear;
  }

  setSection(newSection) {
    this.section = newSection;
  }
}

class StudentList {
  constructor() {
    this.students = [];
    this.selectedStudent = null;
    this.initializeEventListeners();
  }

  addStudent(id, fullname, age, sex, program, year, section) {
    if (this.students.some((student) => student.id === id)) {
      return false;
    }
    const newStudent = new Student(
      id,
      fullname,
      age,
      sex,
      program,
      year,
      section
    );
    this.students.push(newStudent);
    this.refreshDisplay();
    return true;
  }

  removeStudent(id) {
    this.students = this.students.filter((student) => student.id !== id);
    this.refreshDisplay();
  }

  editStudent(id, updatedInfo) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id
    );
    if (studentIndex === -1) return false;

    this.students[studentIndex] = {
      ...this.students[studentIndex],
      ...updatedInfo,
      id,
    };
    this.refreshDisplay();
    return true;
  }

  displayStudents() {
    const tableCol = document.querySelector(".t-col");
    // Keep the header row
    const headerRow = tableCol.querySelector(".t-header");
    tableCol.innerHTML = "";
    tableCol.appendChild(headerRow);

    this.students.forEach((student) => {
      const row = document.createElement("div");
      row.className = "t-row t-person";

      row.innerHTML = `
              <div class="t-data t-id">${student.id}</div>
              <div class="t-data t-name">${student.fullname}</div>
              <div class="t-data t-age">${student.age}</div>
              <div class="t-data t-sex">${student.sex}</div>
              <div class="t-data t-prog">${student.program}</div>
              <div class="t-data t-year">${student.year}</div>
              <div class="t-data t-sect">${student.section}</div>
          `;

      // Add click event to select row
      row.addEventListener("click", () => this.selectRow(student.id, row));

      tableCol.appendChild(row);
    });
  }

  selectRow(id, row) {
    const editBtn = document.querySelector(".btn-blue");
    const deleteBtn = document.querySelector(".btn-red");

    // Check if the clicked row is already selected
    if (row.classList.contains("selected")) {
      // Deselect if already selected
      row.classList.remove("selected");
      editBtn.hidden = true;
      deleteBtn.hidden = true;
      this.selectedStudent = null; // Clear the selected student
      return;
    }

    // Remove selected class from all rows
    document
      .querySelectorAll(".t-person")
      .forEach((r) => r.classList.remove("selected"));

    // Add selected class to clicked row
    row.classList.add("selected");

    // Show buttons
    editBtn.hidden = false;
    deleteBtn.hidden = false;

    // Store selected student
    this.selectedStudent = this.students.find((student) => student.id === id);
  }

  initializeEventListeners() {
    const editBtn = document.querySelector(".btn-blue");
    const deleteBtn = document.querySelector(".btn-red");

    editBtn.addEventListener("click", (e) => e.stopPropagation());
    deleteBtn.addEventListener("click", (e) => e.stopPropagation());

    // Edit button click
    editBtn.addEventListener("click", () => {
      if (this.selectedStudent) {
        // Implement your edit form logic here
        toggleCurrent(formContainer);
        toggleCurrent(tableContainer);
        formButton.innerHTML = "Edit";
        editFields(this.selectedStudent);
        console.log("Edit student:", this.selectedStudent);
      }
    });

    // Delete button click
    deleteBtn.addEventListener("click", () => {
      if (
        this.selectedStudent &&
        confirm("Are you sure you want to delete this student?")
      ) {
        this.removeStudent(this.selectedStudent.id);
        editBtn.hidden = true;
        deleteBtn.hidden = true;
        this.selectedStudent = null;
      }
    });

    // Click outside table to deselect
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".table")) {
        document
          .querySelectorAll(".t-person")
          .forEach((r) => r.classList.remove("selected"));
        editBtn.hidden = true;
        deleteBtn.hidden = true;
        this.selectedStudent = null;
      }
    });
  }

  refreshDisplay() {
    this.displayStudents();
  }
}

// Add some CSS for selected row
const style = document.createElement("style");
style.textContent = `
  .t-person.selected {
      background-color: rgb(223, 45, 255, 0.5);
  }
`;
document.head.appendChild(style);

// Initialize and add sample students