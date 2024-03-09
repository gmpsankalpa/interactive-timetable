// utils.js

function clearForm() {
    const formInputs = document.querySelectorAll('#dataEntryForm input');
    formInputs.forEach(input => (input.value = ''));
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
  