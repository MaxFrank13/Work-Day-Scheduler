// **** Selectors ****

const date = $('.date');
const calendar = $(".calendar");
const entries = $(".entry-section");
const hour = $('p.hour');
const halfHour = $('p.half-hour');
const notes = $('input.notes');
const saveBtns = $('button.save');
const clearBtn = $('button.clear');

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
      if (date.val() === today) {
        colorCode();
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
        currentVals[index].push(subEntry);
      }
    })
    setLocalStorage(date.val(), currentVals);
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
        console.log(currentVals[index].length);
        for (let i = 1; i < currentVals[index].length; i++) {
          const newSection = createSubSection();
          newSection.children[1].value = currentVals[index][i];
          entries[index].append(newSection);
        }
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
    const subNotes = $('input.sub-notes');
    subNotes.each((index) => {
      subNotes[index].value = '';
    })
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

function createSubSection() {

  const newInput = `<input type="text" class="half-hour">
  <input type="text" class="sub-notes">`;

  const newSection = document.createElement('section');
  newSection.innerHTML = newInput;
  newSection.classList.add('sub-section');

  return newSection;
}