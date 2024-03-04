// Placeholder for currentSortColumn initialization
let currentSortColumn = ""; // To be set dynamically based on data
let currentSortOrder = "asc"; // Default sort order remains the same
let globalData = []; // Global variable to store the table data for sorting

// Function to parse query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function fetchDataAndDisplay() {
    const name = getQueryParam('name');
    if (name) {
        // If name parameter is present, fetch structured_data.json
        fetch('structured_data.json')
            .then(response => response.json())
            .then(data => {
                const characterData = data[name] ? data[name] : [];
                const tableData = characterData.map(character => ({
                    "File path": shorten_filepath_string(character.file_path.replace(/\\/g, " > ")),
                    "Level": character.level,
                    "Vigor": character.stats.Vigor,
                    "Mind": character.stats.Mind,
                    "Endurance": character.stats.Endurance,
                    "Strength": character.stats.Strength,
                    "Dexterity": character.stats.Dexterity,
                    "Intelligence": character.stats.Intelligence,
                    "Faith": character.stats.Faith,
                    "Arcane": character.stats.Arcane,
                    "Play time": character.play_time
                }));
                globalData = tableData;
                sortAndDisplayData(); // Initial sort and display
            });
    } else {
        // Default fetch from character_list.json
        fetch('character_list.json')
            .then(response => response.json())
            .then(data => {
                const tableData = data.map(character => ({
                    "Name": character.Name,
                    "Min Level": character["Min Level"],
                    "Max Level": character["Max Level"],
                    "Primary Stat": character["Primary Stat"],
                    "Secondary Stat": character["Secondary Stat"],
                    "Play Time": character["Play Time"],
                    "File Path": character["File path"]
                }));

                if (tableData.length > 0) {
                    currentSortColumn = Object.keys(tableData[0])[0]; // Dynamically set the initial sort column
                }

                globalData = tableData;
                sortAndDisplayData(); // Initial sort and display
            });
    }
}

function shorten_filepath_string(filePath){
    const root_folder = "Backups";
    // Split the path into an array
    const parts = filePath.split(" > ");
    // Find the index of the variable
    const index = parts.indexOf(root_folder);
    // Slice the array to get parts after the variable and remove the last element
    const relevantParts = parts.slice(index + 1, -1);
    // Join the parts back into a string
    return relevantParts.join(" > ");
}

function displayDynamicTable(data) {
    const container = document.getElementById('tableContainer');
    container.innerHTML = ''; // Clear previous content

    if (!data.length) {
        container.textContent = 'No data available';
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Dynamically create headers based on keys of the first object
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        const button = document.createElement('button');
        button.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize header
        button.onclick = () => sortAndDisplayData(key); // Add sorting function on click
        th.appendChild(button);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create rows for each object in the data
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.keys(item).forEach(key => {
            const td = document.createElement('td');
            if (key === "Name") { // Check if the column is "Name"
                const a = document.createElement('a');
                const url = new URL(window.location.href);
                url.searchParams.set('name', item[key]); // Set 'name' query parameter
                a.href = url; // Set href to the URL with the query parameter
                a.textContent = item[key];
                td.appendChild(a);
            } else {
                td.textContent = item[key];
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

function sortAndDisplayData(sortColumn = currentSortColumn) {
    if (currentSortColumn === sortColumn) {
        // Toggle sort order if the same column is selected
        currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    } else {
        currentSortColumn = sortColumn;
        currentSortOrder = "asc"; // Default to ascending order for a new column
    }

    // Perform sorting
    const sortedData = [...globalData].sort((a, b) => {
        let valA = a[currentSortColumn], valB = b[currentSortColumn];
        if (!isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB))) {
            // Handle numeric sorting
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }

        if (valA < valB) return currentSortOrder === "asc" ? -1 : 1;
        if (valA > valB) return currentSortOrder === "asc" ? 1 : -1;
        return 0;
    });

    displayDynamicTable(sortedData);
}

document.addEventListener('DOMContentLoaded', () => {
    const name = getQueryParam('name');
    const titleContainer = document.getElementById('titleContainer'); // Assuming an element with this ID exists for the title
    const returnLink = document.createElement('a');
    returnLink.href = 'https://duffry.com/EldenRing/'; // Set to your base URL
    returnLink.textContent = '< Return to character list';
    returnLink.style = 'margin-left: 20px;'; // Add some spacing

    if (name) {
        // If a character name is specified in the URL
        titleContainer.innerHTML = `${name}`; // Set the title to the character's name
        titleContainer.appendChild(returnLink); // Add the return link next to the title
    } else {
        // Default view (no specific character selected)
        titleContainer.textContent = 'Character list'; // Set the title for the character list page
    }

    fetchDataAndDisplay();
});
