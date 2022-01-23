// **** Selectors ****

const date = $('.date');
const calendar = $(".calendar");
const entries = $(".entry");
const hour = $('p.hour');
const notes = $('input.notes');
const saveBtns = $('button.save');
const clearBtn = $('button.clear');
const today = moment().format("dddd, MMM DD YYYY");

// local storage array
let currentVals = [];

// wait until page loads before firing any JS code
$(function () {

  // **** Get Current Date and Display ****
  
  date.datepicker({
    showAnim: "slide",
    onSelect: function() {
      console.log(date.val())
      getLocalStorage(date.val());
    }
  });
  date.datepicker("option", "dateFormat", "DD, M d yy");
  date.val(today);

  // **** Color Code Entries ****

  getLocalStorage(today);

  const currentHour = moment().format("hh");

  entries.each((index) => {
    if (index + 9 > currentHour) {
      entries[index].style.background = "var(--green-60)";
      entries[index].style.boxShadow = "0px 0px 2px 1px var(--green-60)";
    } else if (index + 9 < currentHour) {
      entries[index].style.background = "var(--black)";
      entries[index].style.boxShadow = "0px 0px 2px 1px var(--grey-50)";
    } else {
      entries[index].style.background = "var(--red-50)";
      entries[index].style.boxShadow = "0px 0px 2px 1px var(--red-50)";
    }
  })

  // **** Save Button Functionality ****

  saveBtns.on('click', function () {
    currentVals = [];
    notes.each((index) => {
      currentVals.push(notes[index].value);
    })
    setLocalStorage(date.val(), currentVals);
  })

  // clear notes
  clearBtn.on('click', function () {
    if (confirm("This will delete all notes from each day on the planner. Continue?")) {
      clearLocalStorage();
    }
  })

  // access corresponding input when clicking each hour
  hour.on('click', function (e) {
    e.target.nextSibling.nextSibling.focus();
  })

  // **** Local Storage ****

  function setLocalStorage(date, array) {
    localStorage.setItem(date, JSON.stringify(array));
  }

  function getLocalStorage(date) {
    if (localStorage.getItem(date)){
      currentVals = JSON.parse(localStorage.getItem(date));

      notes.each((index) => {
        notes[index].value = currentVals[index];
      })
    } else {
      notes.each((index) => {
        notes[index].value = '';
      })
    }
  }

  function clearLocalStorage() {
    localStorage.clear();
    notes.each((index) => {
      notes[index].value = '';
    })
  }
})
