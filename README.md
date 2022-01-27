# Work-Day-Scheduler

## Description

An app used to plan your day using jQuery and Moment.js. Using this planner, users can record their agenda for coming work days. There are time slots from 9am - 5pm, but support for different hours could be programmed in the future. Users can double-click on each hour to open up sub sections and record additional notes at select times. There is also a jQuery datepicker included in the date display where users can select different days. All recorded notes will be saved into local storage when any save button is pressed.

[Day Planner](https://maxfrank13.github.io/Work-Day-Scheduler/)

![Picture of Day Planner](https://github.com/MaxFrank13/Work-Day-Scheduler/blob/main/assets/app-photo.png)

## What's Happening in the Code

### HTML

The HTML provides the basic structure for the planner. Each entry is nested inside its own container. All of those containers are then nested inside a main element. There is flex positioning being used on the entries but everything else is formatted using simple margin and padding properties. A save display overlay is found at the bottom of the document. This is shown and hidden when the user clicks any save button.

### CSS

We are employing the use of CSS `animation` property to give a cleaner look to the UI. Each sub section is given an animation that drops it down as it fades into view. The same is done for the double-click notification when the user hovers over each hour. Another animation is seen when any save button is clicked. The save notification slides into view from the right. This animation is especially useful because it gives the impression of something being logged or downloaded to records. There is no actual wait time for this process. The animation is soley used for visual effect. Pseudo-classes and pseudo-elements help inform the user of what the app does without providing direct instructions.

### JavaScript

The JS file starts by using jQuery selectors to grab elements from the DOM. The current hour and current day are initialized in their own variables using the moment.js library. This library is used throughout the app to source information about the time and day.

1. Upon load, the jQuery `datepicker()` is used to not only to display the current date but also provides a calendar to choose any other day from
  - whenever a user selects a date from the calendar, a function will fire that checks the local storage for any information pertaining to that date
  - the date is then checked to see if it's before or after the current date; this information is used to color the entries accordingly (black for past dates, green for future dates)

2. Local storage is then accessed using a function that takes a date as its parameter; initially we pass it the current date
  - this grabs data from local storage and then uses it to create elements dynamically used JavaScript

3. A colorCode function is used to color each entry based on it's time of day

4. Whenever a user clicks any of the save buttons, a function interates through each input the user has made on that day and logs it to the local storage
  - each date has it's own object in local storage that has a nested array in index 1 to account for any sub sections
  - the save notification is given functionality to hide and show for 1.2s, triggering it's CSS animation property