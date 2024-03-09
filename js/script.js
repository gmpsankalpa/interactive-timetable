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

function deleteRow() {
  const selectedRow = getSelectedRow();

  if (!selectedRow) {
    alert('Please select a row to delete.');
    return;
  }

  // Remove the selected row from the table
  selectedRow.parentNode.removeChild(selectedRow);

  // Save timetable data to localStorage
  saveTimetableData();

  // Clear form after deleting a row
  clearForm();
}

function getSelectedRow() {
  const timetableBody = document.querySelector('#timetable tbody');
  const rows = timetableBody.querySelectorAll('tr');

  for (let i = 0; i < rows.length; i++) {
    rows[i].onclick = function () {
      // Clear previous selected row styles
      if (selectedRowIndex !== -1 && selectedRowIndex < rows.length) {
        rows[selectedRowIndex].classList.remove('selected-row');
      }

      // Add style to the selected row
      this.classList.add('selected-row');

      // Set the selectedRowIndex for future reference
      selectedRowIndex = this.rowIndex - 1;
    };
  }

  if (selectedRowIndex !== -1 && selectedRowIndex < rows.length) {
    return rows[selectedRowIndex];
  }

  return null;
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

function sortTable(column) {
  const table = document.getElementById('timetable');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  // Determine the sorting order (ascending or descending)
  const ascending = !table.classList.contains('descending');

  // Update the sorting order in the class list
  table.classList.toggle('descending', ascending);

  // Sort the rows based on the content of the selected column
  rows.sort((a, b) => {
    const aValue = a.children[column].textContent.trim();
    const bValue = b.children[column].textContent.trim();

    if (column === 0) {
      // Custom sorting for the "Time" column
      return customTimeSort(aValue, bValue, ascending);
    } else {
      // Case-insensitive string comparison for other columns
      return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  });

  // Remove existing rows from the table
  rows.forEach(row => tbody.removeChild(row));

  // Append sorted rows to the table
  rows.forEach(row => tbody.appendChild(row));
}

function customTimeSort(a, b, ascending) {
  // Extract hours and minutes from time strings
  const [aHours, aMinutes] = a.split(':').map(Number);
  const [bHours, bMinutes] = b.split(':').map(Number);

  // Convert times to total minutes for comparison
  const aTotalMinutes = aHours * 60 + aMinutes;
  const bTotalMinutes = bHours * 60 + bMinutes;

  // Compare and return based on the sorting order
  return ascending ? aTotalMinutes - bTotalMinutes : bTotalMinutes - aTotalMinutes;
}

function saveTimetableData() {
  const timetableData = getTimetableData();
  localStorage.setItem('timetableData', JSON.stringify(timetableData));
}

function loadTimetableData() {
  const timetableData = localStorage.getItem('timetableData');

  if (timetableData) {
    const parsedData = JSON.parse(timetableData);

    // Populate the timetable with the saved data
    const timetableBody = document.querySelector('#timetable tbody');
    timetableBody.innerHTML = parsedData.rows;

    // Sort the table by time after loading data
    sortTable(0);
  }
}

function getTimetableData() {
  const timetableBody = document.querySelector('#timetable tbody');
  const rows = timetableBody.innerHTML;
  return { rows };
}
