// Function to load an XML document and execute a callback with the loaded XML
function loadXMLDoc(file, callback) {
    const xmlhttp = new XMLHttpRequest(); // Create a new XMLHttpRequest object for making HTTP requests
    xmlhttp.onreadystatechange = function () { // Define a function to handle changes in request state
        if (this.readyState === 4 && this.status === 200) { // Check if the request is complete and was successful
            callback(this.responseXML); // Call the provided callback function with the parsed XML response
        }
    };
    xmlhttp.open("GET", file, true); // Initialize a GET request for the specified file, asynchronously
    xmlhttp.send(); // Send the HTTP request
}

// Function to process and display data from an XML document
function renderEventTable(xml, eventType) {
    // Initialize an HTML table with column headers
    let table = "<tr><th>Venue</th><th>Duration</th><th>Age</th><th>Food</th><th>Drinks</th><th>Additional</th></tr>";
    const events = xml.getElementsByTagName("EVENT"); // Get all "EVENT" elements from the XML document

    // Loop through each event in the XML document
    for (let i = 0; i < events.length; i++) {
        // Extract text content for each field, defaulting to an empty string if the field is not found
        const venue = events[i].getElementsByTagName("VENUE")[0]?.textContent || "";
        // Get the duration of the event. If not found, set it to an empty string.
        const duration = events[i].getElementsByTagName("DURATION")[0]?.textContent || "";
        // Get the event of the event. If not found, set it to an empty string.
        const age = events[i].getElementsByTagName("AGE")[0]?.textContent || "";
        // Get the food of the event. If not found, set it to an empty string.
        const food = events[i].getElementsByTagName("FOOD")[0]?.textContent || "";
        // Get the drinks of the event. If not found, set it to an empty string.
        const drinks = events[i].getElementsByTagName("DRINKS")[0]?.textContent || "";
        // Get the additional of the event. If not found, set it to an empty string.
        const additional = events[i].getElementsByTagName("ADDITIONAL")[0]?.textContent || "";

        // Append a new row to the table for this event - Create a new table row for the current event with all the details.
        table += `<tr>
                    <td>${venue}</td>
                    <td>${duration}</td>
                    <td>${age}</td>
                    <td>${food}</td>
                    <td>${drinks}</td>
                    <td>${additional}</td>
                  </tr>`;
    }

    // After looping through all events, update the HTML of a specific element with the event type (demo - uppercase + eventType)
    document.getElementById(`demo${capitalizeFirstLetter(eventType)}`).innerHTML = table;
}

// Function to toggle visibility of event information
function toggleInfo(eventType) {
    const infoTable = document.getElementById(`infoTable${capitalizeFirstLetter(eventType)}`); // Get the table for the specific event type
    const button = document.getElementById(`infoButton${capitalizeFirstLetter(eventType)}`); // Get the button for the specific event type

    // Check if the table element exists
    if (!infoTable) {
        console.error("Info table not found for event type:", eventType); // Log an error if the table is not found
        return; // Exit the function
    }

    // Determine if the table is currently hidden by checking its computed display property
    const isHidden = window.getComputedStyle(infoTable).getPropertyValue("display") === "none";

    if (isHidden) {
        // If the table is hidden, load the corresponding XML file and display the table
        loadXMLDoc(`${eventType}-info.xml`, function (xml) {
            renderEventTable(xml, eventType); // Render the table with the loaded XML data
            infoTable.style.display = "block"; // Make the table visible
            button.textContent = "Hide Info"; // Update the button text
        });
    } else {
        // If the table is visible, hide it
        infoTable.style.display = "none"; // Hide the table
        button.textContent = "More Info"; // Update the button text
    }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1); // Convert the first character to uppercase and append the rest of the string
}


// Function to toggle dark mode
function darkMode() {
    const body = document.body; // Get the body element of the page
    const button = document.getElementById("darkModeButton"); // Get the dark mode toggle button
    const icon = document.getElementById("darkModeIcon"); // Get the icon element for the button

    body.classList.toggle("dark-mode"); // Toggle the "dark-mode" class on the body

    const isDarkMode = body.classList.contains("dark-mode"); // Check if the dark mode class is active
    icon.className = isDarkMode ? "fa fa-sun" : "fa fa-moon"; // Update the icon based on the current mode
    button.className = isDarkMode ? "btn btn-light" : "btn btn-dark"; // Update the button class for styling
}

// Attach event listeners to buttons for all event types
['music', 'theatre', 'coding', 'food', 'hallowen', 'gala'].forEach(eventType => {
    const button = document.getElementById(`infoButton${capitalizeFirstLetter(eventType)}`); // Get the button for the current event type
    if (button) {
        // Add a click event listener to the button
        button.addEventListener("click", () => {
            console.log(`${capitalizeFirstLetter(eventType)} button clicked`); // Log the button click
            toggleInfo(eventType); // Call the toggleInfo function for the event type
        });
    } else {
        console.error("Button not found for event type:", eventType); // Log an error if the button is not found
    }
});




