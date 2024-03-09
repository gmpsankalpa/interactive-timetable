// timetable.js

document.addEventListener('DOMContentLoaded', () => {
    loadTimetableData();
  });
  
  const editModeToggleBtn = document.getElementById('editModeToggle');
  const dataEntryForm = document.getElementById('dataEntryForm');
  const addRowBtn = document.getElementById('addRow');
  const editRowBtn = document.getElementById('editRow');
  const deleteRowBtn = document.getElementById('deleteRow');
  const clearAllBtn = document.getElementById('clearAll');
  
  editModeToggleBtn.addEventListener('click', toggleEditMode);
  addRowBtn.addEventListener('click', addRow);
  editRowBtn.addEventListener('click', editRow);
  deleteRowBtn.addEventListener('click', deleteRow);
  clearAllBtn.addEventListener('click', clearAll);
  
  let selectedRowIndex = -1;
  
  function toggleEditMode() {
    const timetable = document.getElementById('timetable');
    const isEditMode = timetable.isContentEditable;
  
    if (!isEditMode) {
      // Clear form values when entering edit mode
      clearForm();
      selectedRowIndex = -1;
    }
  
    timetable.contentEditable = !isEditMode;
    dataEntryForm.classList.toggle('hidden-form');
  
    // Change button text based on edit mode
    editModeToggleBtn.innerText = isEditMode ? 'Toggle Edit Mode' : 'Save Changes';
  }
  
  function addRow() {
    const timeInput = document.getElementById('time').value;
    const mondayInput = document.getElementById('monday').value;
    const tuesdayInput = document.getElementById('tuesday').value;
    const wednesdayInput = document.getElementById('wednesday').value;
    const thursdayInput = document.getElementById('thursday').value;
    const fridayInput = document.getElementById('friday').value;
  
    if (!timeInput) {
      alert('Please enter a time.');
      return;
    }
  
    const timetableBody = document.querySelector('#timetable tbody');
  
    const newRow = `<tr>
      <td>${timeInput}</td>
      <td>${mondayInput}</td>
      <td>${tuesdayInput}</td>
      <td>${wednesdayInput}</td>
      <td>${thursdayInput}</td>
      <td>${fridayInput}</td>
    </tr>`;
  
    timetableBody.insertAdjacentHTML('beforeend', newRow);
  
    // Sort the table by time
    sortTable(0);
  
    // Save timetable data to localStorage
    saveTimetableData();
  
    // Clear form after adding a row
    clearForm();
  }
  
  function clearAll() {
    const timetableBody = document.querySelector('#timetable tbody');
    timetableBody.innerHTML = ''; // Clear all rows
  
    // Save timetable data to localStorage after clearing
    saveTimetableData();
  
    // Clear form after clearing all rows
    clearForm();
  }
  
  function clearForm() {
    const formInputs = document.querySelectorAll('#dataEntryForm input');
    formInputs.forEach(input => (input.value = ''));
  }
  

  function editRow() {
    const selectedRow = getSelectedRow();
  
    if (!selectedRow) {
      alert('Please select a row to edit.');
      return;
    }
  
    const cells = selectedRow.cells;
  
    // Populate form fields with the selected row data
    document.getElementById('time').value = cells[0].textContent;
    document.getElementById('monday').value = cells[1].textContent;
    document.getElementById('tuesday').value = cells[2].textContent;
    document.getElementById('wednesday').value = cells[3].textContent;
    document.getElementById('thursday').value = cells[4].textContent;
    document.getElementById('friday').value = cells[5].textContent;
  
    // Set the selectedRowIndex for future reference
    selectedRowIndex = selectedRow.rowIndex - 1;
  }