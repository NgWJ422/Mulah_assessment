//this funtion/script will only run once the dom has been loaded
document.addEventListener("DOMContentLoaded", function(){
    fetch("Table_Input.csv")
        .then(Response => Response.text())
        .then(data =>{
            const parsedData = Papa.parse(data, {
                header: true,
                skipEmptyLines: true
            });
            //display data in a table
            displayTable1(parsedData.data);
            displayTable2();
        })
});

function displayTable1(data){
    const table = document.createElement('table');
    table.id="table_1";
    const headerRow = table.insertRow();

    //create table headers
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });

    //create table rows
    data.forEach(row =>{
        const tableRow = table.insertRow();
        Object.values(row).forEach(cellData => {
            const cell = tableRow.insertCell();
            cell.textContent = cellData;
            
        });
    });
    const tableContainer = document.getElementById('for_table_1');
    tableContainer.appendChild(table);
}

function findvalue(element){
    const table = document.getElementById("table_1");
    const rows = table.rows;
    let value = 0;
    let header= Array.from(rows[0].cells);
    const Index_index = header.findIndex(header => header.textContent === 'Index #');
    const value_index = header.findIndex(header => header.textContent === 'Value');
    for(let i =1; i < rows.length; i++){
        const cells = rows[i].cells;
        if(cells[Index_index].textContent === element){
            value = cells[value_index].textContent;
            break;
        }
    }
    console.log(value)
    return parseInt(value);
}

function displayTable2(){
    let Category = ['Alpha', 'Beta', 'Charlie'];
    let header2 = ['Category', 'Value'];
    const table = document.createElement('table');
    table.id="table_2";
    const headerRow = table.insertRow();
    //create table headers
    for(let i =0; i< header2.length;i++){
        const th = document.createElement('th');
        th.textContent = header2[i];
        headerRow.appendChild(th);
    }
    for(let i=1; i < Category.length+1;i++){
  
        let value = 0;
        if(i==1){
            value = findvalue('A5') + findvalue('A20');
        } else if(i==2){
            value = findvalue('A15')/findvalue('A7');
        }else{
            value =findvalue('A13')*findvalue('A12');
        }

        // Insert a new row for each element in the array
        let row = table.insertRow();
        
        // Insert cells into the new row
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        
        // Assign values to the cells
        cell1.textContent = Category[i-1];
        cell2.textContent = value;
    }
    const tableContainer = document.getElementById('for_table_2');
    tableContainer.appendChild(table);
}