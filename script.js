// Placeholder for currentSortColumn initialization
let currentSortColumn = ""; // To be set dynamically based on data
let currentSortOrder = "asc"; // Default sort order remains the same
let globalData = []; // Global variable to store the table data for sorting

function fetchDataAndDisplay() {
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
        Object.keys(data[0]).forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key];
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

document.addEventListener('DOMContentLoaded', fetchDataAndDisplay);
