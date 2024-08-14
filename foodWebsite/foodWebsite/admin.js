document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    let mealList = JSON.parse(localStorage.getItem("mealList"));
    if(!mealList){
        mealList=[]
    }
    const itemID = Date.now();
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemImage = document.getElementById('itemImage').value;
    const itemDescription = document.getElementById('itemDescription').value;
    let meal = {
        id:itemID,
        name:itemName,
        price:itemPrice,
        image:itemImage,
        description:itemDescription
    };
    mealList = [meal,...mealList];
    localStorage.setItem("mealList",JSON.stringify(mealList));
    if (itemName && itemImage && itemDescription && itemPrice) {
        const table = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        
        const nameCell = newRow.insertCell(0);
        const imageCell = newRow.insertCell(1);
        const descriptionCell = newRow.insertCell(2);
        const priceCell = newRow.insertCell(3);
        const actionsCell = newRow.insertCell(4);
        
        nameCell.textContent = itemName;
        priceCell.textContent = itemPrice;
        const img = document.createElement('img');
        img.src = itemImage;
        img.alt = itemName;
        imageCell.appendChild(img);
        
        descriptionCell.textContent = itemDescription;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            table.deleteRow(newRow.rowIndex - 1);
            let filteredList = mealList.filter((meal)=>{
                if(meal.id!= itemID){
                    return meal;
                }
            })
            localStorage.setItem("mealList",JSON.stringify(filteredList));
            });
            
        // });
        actionsCell.appendChild(deleteBtn);

        // Clear form fields
        document.getElementById('itemName').value = '';
        document.getElementById('itemImage').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemDescription').value = '';
    } else {
        alert('Please fill out all fields.');
    }
});
