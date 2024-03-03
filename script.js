// Placeholder for currentSortColumn initialization
let currentSortColumn = ""; // To be set dynamically based on data
let currentSortOrder = "asc"; // Default sort order remains the same

function fetchDataAndDisplay() {
    fetch('structured_data.json')
        .then(response => response.json())
        .then(data => {
            const tableData = [];

            Object.keys(data).forEach(name => {
                const characters = data[name];
    
                // Since we're always including min and max levels as separate columns,
                // there's no need to check if minLevel === maxLevel
                const levels = characters.map(character => character.level);
                const minLevel = Math.min(...levels);
                const maxLevel = Math.max(...levels);
    
                // Add an object for each character to the tableData array
                tableData.push({ "Name": name, "Min Level": minLevel, "Max Level": maxLevel });
            });
            
            if (tableData.length > 0) {
                // Dynamically set the currentSortColumn to the first key of the first item
                currentSortColumn = Object.keys(tableData[0])[0];
            }

            globalData = tableData; // Store processed data for sorting and display
            sortAndDisplayData(); // Initial sort (by the first column) and display
        });
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

function sortAndDisplayData(sortColumn) {
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