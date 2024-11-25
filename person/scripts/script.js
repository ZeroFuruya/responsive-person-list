import { Student } from "./student.model.js";
import { StudentManager, generateUniqueId } from "./studentmanager.js";
import {
  formatName,
  getAge,
  getProgram,
  getSex,
  getYear,
  validateFullname,
  validateBirthdate,
  validateSex,
  validateProgram,
  validateSection,
  validateYear,
  getSexIndex,
  getProgramIndex,
  getYearIndex,
  getSectionIndex,
} from "./util.js";

// initialize student list
const studentList = new StudentManager();

// selected student
let selectedStudent = null;

// form elements
const f_text_fullname = document.getElementById("fname");
const f_select_program = document.getElementById("program");
const f_select_year = document.getElementById("year");
const f_select_section = document.getElementById("section");
const f_select_sex = document.getElementById("sex");
const f_date_birthdate = document.getElementById("birthdate");
const f_button_addStudent = document.getElementById("addStudent");

const t_button_deleteStudent = document.getElementById("deleteStudent");
const t_button_editStudent = document.getElementById("editStudent");

// Add Student
f_button_addStudent.addEventListener("click", (e) => {
  e.preventDefault();

  logFields()

  const fullname = f_text_fullname.value;
  const sex = f_select_sex.value;
  const program = f_select_program.value;
  const year = getYear(f_select_year.value);
  const section = f_select_section.value;
  const birthdate = f_date_birthdate.value;
  console.log(birthdate);
  // validations
  if (!validateFullname(fullname)) {
    alert(
      "Invalid fullname! Must be a non-empty string with only letters, spaces, apostrophes, and hyphens."
    );
    return;
  }

  if (!validateProgram(program)) {
    alert("Invalid program selected! Please choose a valid program.");
    return;
  }

  if (!validateYear(year)) {
    alert("Invalid year selected! Please choose a valid year between 1 and 4.");
    return;
  }

  if (!validateSection(section)) {
    alert("Invalid section selected! Please choose A, B, C, or D.");
    return;
  }

  if (!validateSex(sex)) {
    alert("Invalid sex selected! Please choose either Male or Female.");
    return;
  }

  if (!validateBirthdate(birthdate)) {
    alert(
      "Invalid birthdate! Please choose a valid date and make sure the age is realistic."
    );
    return;
  }

  const formattedName = formatName(fullname);
  const age = getAge(birthdate);
  const formattedSex = getSex(f_select_sex.value);
  const formattedProgram = getProgram(f_select_program.value);

  if (selectedStudent) {
    // Before update, log the selectedStudent
    console.log("Before Update:", selectedStudent);

    // Update the selected student
    selectedStudent.fullname = formattedName;
    selectedStudent.age = age;
    selectedStudent.sex = formattedSex;
    selectedStudent.program = formattedProgram;
    selectedStudent.year = year;
    selectedStudent.section = section;
    selectedStudent.birthdate = birthdate;

    // Update the student in the list
    studentList.removeStudent(selectedStudent.id);
    studentList.editStudent(selectedStudent);

    // Reset selectedStudent and button text
    deselectStudent();
    f_button_addStudent.textContent = "Add"; // Change button text back to "Add"
    renderStudentTable();
  } else {
    const id = generateUniqueId();
    const newStudent = new Student(
      id,
      formattedName,
      age,
      formattedSex,
      formattedProgram,
      year,
      section,
      birthdate
    );
    if (studentList.isDuplicateId(newStudent.id)) {
      alert("Duplicated Student ID");
      return;
    }

    // Add the new student
    studentList.addStudent(newStudent);
  }
  console.log(studentList.getAllStudents());
  renderStudentTable();
  clearFormFields();
});

// delete student
t_button_deleteStudent.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedStudent === null) {
    alert("No Student is Selected");
    return;
  }
  studentList.removeStudent(selectedStudent.id);
  hideTButtons();
  renderStudentTable();
  clearFormFields();
});

// edit student
t_button_editStudent.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  f_button_addStudent.textContent = "Edit";
  toggleCurrent(formContainer);
  toggleCurrent(tableContainer);
  occupyFormFields();
});

// creates/updates student to table
function renderStudentTable() {
  studentList.sortStudentsById();
  const tableCol = document.querySelector(".t-col");

  // Clear existing rows (if any)
  tableCol.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.classList.add("t-row", "t-header");
  headerRow.innerHTML = `
    <div class="t-data t-id t-head">ID</div>
    <div class="t-data t-name t-head">Name</div>
    <div class="t-data t-age t-head">Age</div>
    <div class="t-data t-sex t-head">Sex</div>
    <div class="t-data t-prog t-head">Program</div>
    <div class="t-data t-year t-head">Year</div>
    <div class="t-data t-sect t-head">Section</div>
  `;
  tableCol.appendChild(headerRow);

  studentList.getAllStudents().forEach((student) => {
    const studentRow = document.createElement("div");
    studentRow.classList.add("t-row", "t-person");

    studentRow.innerHTML = `
      <div class="t-data t-id">${student.id}</div>
      <div class="t-data t-name">${student.fullname}</div>
      <div class="t-data t-age">${student.age}</div>
      <div class="t-data t-sex">${student.sex}</div>
      <div class="t-data t-prog">${student.program}</div>
      <div class="t-data t-year">${student.year}</div>
      <div class="t-data t-sect">${student.section}</div>
    `;

    studentRow.addEventListener("click", () => {
      selectStudent(student, studentRow);
      console.log(student);
    });

    tableCol.appendChild(studentRow);
  });
}

function selectStudent(student, row) {
  const previousSelectedRow = document.querySelector(".t-row.selected");
  if (previousSelectedRow) {
    previousSelectedRow.classList.remove("selected");
  }

  row.classList.add("selected");

  selectedStudent = student;

  showTButtons();
}

function deselectStudent(student, row) {
  const selectedRow = document.querySelector(".t-row.selected");
  if (selectedRow) {
    selectedRow.classList.remove("selected");
  }

  selectedStudent = null;

  hideTButtons();
}

function hideTButtons() {
  t_button_editStudent.hidden = true;
  t_button_deleteStudent.hidden = true;
}

function showTButtons() {
  t_button_editStudent.hidden = false;
  t_button_deleteStudent.hidden = false;
}

// occupy form fields with selectedStudent
function occupyFormFields() {
  f_text_fullname.value = selectedStudent.fullname;
  f_select_sex.selectedIndex = getSexIndex(selectedStudent.sex);
  f_select_program.selectedIndex = getProgramIndex(selectedStudent.program);
  f_select_year.selectedIndex = getYearIndex(selectedStudent.year);
  f_select_section.selectedIndex = getSectionIndex(selectedStudent.section);
  f_date_birthdate.value = selectedStudent.birthdate;
}

// clear form fields
function clearFormFields() {
  f_text_fullname.value = "";
  f_select_program.selectedIndex = 0;
  f_select_year.selectedIndex = 0;
  f_select_section.selectedIndex = 0;
  f_select_sex.selectedIndex = 0;
  f_date_birthdate.value = "";
}

// swap containers functionality
const formContainer = document.querySelector(".form__container");
const tableContainer = document.querySelector(".table__container");

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

// document.addEventListener("click", (e) => {
//   if (selectedStudent && !e.target.closest(".t-row.selected")) {
//     deselectStudent();
//   }
// });

function logFields(){
  console.log(f_text_fullname.value);
  console.log(f_select_sex.value);
  console.log(f_select_program.value);
  console.log(getYear(f_select_year.value));
  console.log(f_select_section.value);
  console.log(f_date_birthdate.value);
}