import {
  validateFullname,
  validateProgram,
  validateYear,
  validateSection,
  validateBirthdate,
} from "./util.js";

let nextId = 1;

export function generateUniqueId() {
  return nextId++; // Increment and return the next available ID
}

export class StudentManager {
  #students = [];

  addStudent(student) {
    if (this.isDuplicateId(student.id)) {
      throw new Error("Student ID already exists");
    }
    this.#students.push(student);
  }

  editStudent(student) {
    this.#students.push(student);
  }

  getAllStudents() {
    return this.#students;
  }

  isDuplicateId(id) {
    return this.#students.some((student) => student.id === id);
  }

  removeStudent(id) {
    this.#students = this.#students.filter((student) => student.id !== id);
  }

  updateStudent(id, updatedData) {
    const index = this.#students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.#students[index] = { ...this.#students[index], ...updatedData };
    }
  }

  sortStudentsById() {
    this.#students.sort((a, b) => a.id - b.id);
  }
  
}
