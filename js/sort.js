// sort.js

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
  