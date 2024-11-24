function initSwapFun() {
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
  
  tableContainer.addEventListener("click", () => {
    if (tableContainer.classList.contains("current")) {
      return;
    }
    toggleCurrent(tableContainer);
    toggleCurrent(formContainer);
  });
}

initSwapFun();