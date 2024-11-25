export function formatName(name) {
  if (!name || typeof name !== "string") {
    return null; // Return null if the input is invalid
  }

  return name
    .trim() // Remove leading and trailing whitespace
    .split(/\s+/) // Split by one or more spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
    .join(" "); // Rejoin into a single string
}

export function getAge(dateInput) {
  if (!dateInput || isNaN(Date.parse(dateInput))) {
    return null; // Return null if the date is invalid or not provided
  }

  const birthDate = new Date(dateInput); // Convert the input to a Date object
  const today = new Date(); // Get the current date

  let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the initial age
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if today's date is before the birth date in the current year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age; // Return the calculated age
}

export function getSex(sexVal) {
  switch (sexVal) {
    case "male":
      return "Male";
      break;
    case "female":
      return "Female";
      break;
    case "yes":
      return "Yes Please!";
      break;
    case "ew":
      return "Ew! Hell Naahww";
      break;

    default:
      return "No Sex :<";
      break;
  }
}

export function getProgram(programVal) {
  switch (programVal) {
    case "bscs":
      return "BS in Computer Science";
      break;
    case "bsit":
      return "BS in Information Technology";
      break;
    case "bsba":
      return "BS in Business Administration";
      break;
    case "bsbm":
      return "BS in Business Management";
      break;
    case "bshm":
      return "BS in Hospitality Management";
      break;
    case "bshrm":
      return "BS in Hotel and Restaurant Management";
      break;

    default:
      return "No Program";
      break;
  }
}

export function getYear(yearVal) {
  switch (yearVal) {
    case "firstYear":
      return 1;
      break;
    case "secondYear":
      return 2;
      break;
    case "thirdYear":
      return 3;
      break;
    case "fourthYear":
      return 4;
      break;

    default:
      return 0;
      break;
  }
}
// Validators
// util.js
export function validateFullname(name) {
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return false; // Name must be a non-empty string with at least 2 characters
  }

  // Regex to allow only letters, spaces, hyphens, and apostrophes
  const validNamePattern = /^[a-zA-Z\s'-]+$/;

  return validNamePattern.test(name.trim()); // Check if the name matches the pattern
}

export function validateProgram(program) {
  const validPrograms = ["BSCS", "BSIT", "BSBA", "BSBM", "BSHM", "BSHRM"];
  return validPrograms.includes(program.toUpperCase()); // Check if program exists in the list of valid programs
}

export function validateBirthdate(birthdate) {
  if (!birthdate || isNaN(Date.parse(birthdate))) {
    return false; // Ensure the date is valid
  }
  const age = getAge(birthdate);
  return age >= 0 && age <= 120; // Ensure age is within a realistic range
}

export function validateSex(sex) {
  if (!sex || typeof sex !== "string") {
    return false; // Must be a non-empty string
  }

  // Allowed values
  const validSexOptions = ["male", "female", "yes", "ew"];

  // Check if the provided value is in the list of valid options
  return validSexOptions.includes(sex.trim());
}

export function validateYear(year) {
  // Ensure the input is a number
  if (typeof year !== "number" || isNaN(year)) {
    return false; // Return false if it's not a number or NaN
  }

  // Valid year options for college
  const validYears = [1, 2, 3, 4];

  // Check if the year is one of the valid options
  return validYears.includes(year);
}

export function validateSection(section) {
  // Ensure the section is a valid string
  if (!section || typeof section !== "string") {
    return false; // Return false if it's not a valid string
  }

  // Valid section options
  const validSections = ["A", "B", "C", "D", "E"];

  // Check if the section is one of the valid options
  return validSections.includes(section.trim().toUpperCase());
}

// Select Value to Index

export function getSexIndex(sexVal) {
  switch (sexVal) {
    case "Male":
      return 1;
      break;
    case "Female":
      return 2;
      break;
    case "Yes Please!":
      return 3;
      break;
    case "Ew! Hell Naahww":
      return 4;
      break;

    default:
      return 0;
      break;
  }
}

export function getProgramIndex(programVal) {
  switch (programVal) {
    case "BS in Computer Science":
      return 1;
      break;
    case "BS in Information Technology":
      return 2;
      break;
    case "BS in Business Administration":
      return 3;
      break;
    case "BS in Business Management":
      return 4;
      break;
    case "BS in Hospitality Management":
      return 5;
      break;
    case "BS in Hotel and Restaurant Management":
      return 6;
      break;

    default:
      return 0;
      break;
  }
}

export function getYearIndex(yearVal) {
  switch (yearVal) {
    case 1:
      return 0;
      break;
    case 2:
      return 1;
      break;
    case 3:
      return 2;
      break;
    case 4:
      return 3;
      break;

    default:
      return -1;
      break;
  }
}

export function getSectionIndex(sectionVal) {
  switch (sectionVal) {
    case "A":
      return 0;
      break;
    case "B":
      return 1;
      break;
    case "C":
      return 2;
      break;
    case "D":
      return 3;
      break;
    case "E":
      return 4;
      break;

    default:
      return -1;
      break;
  }
}
