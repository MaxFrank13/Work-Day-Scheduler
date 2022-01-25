// **** Selectors ****

const date = $('.date');
const calendar = $(".calendar");
const entries = $(".entry-section");
const hour = $('p.hour');
const halfHour = $('p.half-hour');
const notes = $('input.notes');
const saveBtns = $('button.save');
const clearBtn = $('button.clear');
const saveOverlay = $('.save-overlay');
const saveNote = $('p.save-notifcation');

// access current hour & day globally
const currentHour = moment().format("H");
const today = moment().format("dddd, MMM DD YYYY");

// local storage array
let currentVals = [];

// wait until page loads
$(function () {

  // **** Get Current Date and Display Entries****

  date.datepicker({
    showAnim: "slide",
    onSelect: function () {
      clearVals();
      let formattedSelect = moment(new Date(date.val())).format("YYYY-MM-DD");
      let formattedToday = moment(new Date(today)).format("YYYY-MM-DD");
      if (date.val() === today) {
        colorCode();
      } else if (moment(formattedSelect).isBefore(formattedToday)) {
        colorBlack();
      } else {
        colorGreen();
      }
      getLocalStorage(date.val());
    }
  });
  date.datepicker("option", "dateFormat", "DD, M d yy");
  date.val(today);
  getLocalStorage(today);

  // **** Color Code Entries ****
  colorCode();

  // **** Save Button Functionality ****

  saveBtns.on('click', function () {
    currentVals = [];

    entries.each((index) => {
      let newArray = [];
      let mainEntry = entries[index].children[0].children[1].value;

      newArray.push(mainEntry);
      currentVals.push(newArray);

      for (let i = 1; i < entries[index].children.length; i++) {
        let subEntry = entries[index].children[i].children[1].value
        let subEntryTime = entries[index].children[i].children[0].value
        let subEntryArray = [];
        subEntryArray.push(subEntryTime);
        subEntryArray.push(subEntry);

        currentVals[index].push(subEntryArray);
        console.log(currentVals);
      }
    })
    setLocalStorage(date.val(), currentVals);
    saveNotification();
  })

  // clear notes
  clearBtn.on('click', function () {
    if (confirm("This will clear your entire local storage. Continue?")) {
      clearLocalStorage();
    }
  })

  // access corresponding input when clicking each hour
  hour.on('click', function (e) {
    const parentContainer = e.target.parentElement;
    parentContainer.children[1].focus();
  })

  // create new entry underneath hour
  hour.on('dblclick', function (e) {
    const newSection = createSubSection();
    const parentContainer = e.target.parentElement.parentElement;
    parentContainer.append(newSection);
  });

  // **** Local Storage ****

  function setLocalStorage(date, array) {
    localStorage.setItem(date, JSON.stringify(array));
  }

  function getLocalStorage(date) {
    if (localStorage.getItem(date)) {

      currentVals = JSON.parse(localStorage.getItem(date));

      notes.each((index) => {
        notes[index].value = currentVals[index][0];

        for (let i = 1; i < currentVals[index].length; i++) {
          const newSection = createSubSection();
          console.log(currentVals[index][1])
          newSection.children[0].value = currentVals[index][i][0];
          newSection.children[1].value = currentVals[index][i][1];
          entries[index].append(newSection);
        }
      })
    } else {
      clearVals();
    }
  }

  function clearLocalStorage() {
    localStorage.clear();
    clearVals();
  }
})

// **** Functions ****

function colorCode() {

  entries.each((index) => {
    if (index + 9 > currentHour) {
      entries[index].style.background = "linear-gradient(var(--green-60), transparent)";
      entries[index].style.boxShadow = "0px 0px 4px 1px var(--green-60)";
    } else if (index + 9 < currentHour) {
      entries[index].style.background = "linear-gradient(var(--grey-60), transparent)";
      entries[index].style.boxShadow = "inset 0px 0px 14px 4px var(--grey-50)";
    } else {
      entries[index].style.background = "linear-gradient(var(--red-50), transparent)";
      entries[index].style.boxShadow = "0px 0px 4px 1px var(--red-50)";
    }
  })
}

function colorGreen() {
  entries.each((index) => {
    entries[index].style.background = "linear-gradient(var(--green-60), transparent)";
    entries[index].style.boxShadow = "0px 0px 4px 1px var(--green-60)";
  })
}

function colorBlack() {
  entries.each((index) => {
    entries[index].style.background = "linear-gradient(var(--grey-60), transparent)";
    entries[index].style.boxShadow = "inset 0px 0px 14px 4px var(--grey-50)";
  })
}

function createSubSection() {
  const newInput = `<input type="text" class="half-hour">
  <input type="text" class="sub-notes">`;

  const newSection = document.createElement('section');
  newSection.innerHTML = newInput;
  newSection.classList.add('sub-section');

  return newSection;
}

function clearVals() {
  notes.each((index) => {
    notes[index].value = '';
  })
  const subNotes = $('.sub-section');
  subNotes.each((index) => {
    subNotes[index].remove();
  })
}

function saveNotification() {
  saveOverlay.removeClass("hide");
  setTimeout(function() {
    saveOverlay.addClass("hide");
  }, 1200)
}