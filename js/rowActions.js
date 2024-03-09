// rowActions.js

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
  
    // Reset selectedRowIndex
    selectedRowIndex = -1;
  }
  
  function getSelectedRow() {
    const timetableBody = document.querySelector('#timetable tbody');
    const rows = timetableBody.querySelectorAll('tr');
  
    rows.forEach(row => {
      row.onclick = function () {
        // Clear previous selected row styles
        if (selectedRowIndex !== -1 && selectedRowIndex < rows.length) {
          rows[selectedRowIndex].classList.remove('selected-row');
        }
  
        // Add style to the selected row
        this.classList.add('selected-row');
  
        // Set the selectedRowIndex for future reference
        selectedRowIndex = this.rowIndex - 1;
      };
    });
  
    if (selectedRowIndex !== -1 && selectedRowIndex < rows.length) {
      return rows[selectedRowIndex];
    }
  
    return null;
  }
  