document.addEventListener('DOMContentLoaded', function () {
    fetch('Table_Input.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            const tableBody = document.querySelector('#csvTable tbody');
            rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
            processTableData(rows);
        });

    function processTableData(rows) {
        const processedData = rows.map(row => {
            // Example: Just reversing the order of columns
            return row.reverse();
        });

        const processedTableBody = document.querySelector('#processedTable tbody');
        processedData.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            processedTableBody.appendChild(tr);
        });
    }
});
