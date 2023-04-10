const table = document.getElementById('table');

const information = [{ name: "NAME" }, { description: "DESCRIPTION" }, { status: "STATUS" }, { rate: "RATE" }, { balance: "BALANCE" }, { deposit: "DEPOSIT" }, { action: "ACTION" }]

const tHead = table.createTHead();
const thRow = tHead.insertRow();



information.forEach(element => {

    const td = thRow.insertCell();

    td.classList.add("tdStyle");
    const value = Object.values(element)[0];
    td.appendChild(document.createTextNode(value));
});

const tBody = table.createTBody();
function createTableBody(detail) {

    detail.forEach(element => {
        const tbRow = tBody.insertRow();
        tbRow.setAttribute('class', 'thRowStyle');
        information.forEach(headers => {
            const td = tbRow.insertCell();
            if (headers.action !== "ACTION") {
                const keys = Object.keys(headers)[0];
                td.appendChild(document.createTextNode(element[keys]));
            }
            else {
                let editBtn = document.createElement('button')
                editBtn.innerText = "EDIT";
                editBtn.onclick = () => editDetail(element);

                td.appendChild(document.innerHTML = editBtn)

                let deleteBtn = document.createElement('button')
                deleteBtn.innerText = "DELETE";
                deleteBtn.onclick = () =>  delDetail(element.id);
                   

                td.appendChild(document.innerHTML = deleteBtn)

            }
        })
    })
}

function delDetail(id) {

    fetch(`http://localhost:3000/detail/${id}`, {
        method: 'DELETE',
    });

};

var id;
console.log('outer', id);
function editDetail(element) {
    id = element.id;
    console.log('edit', id);
    document.getElementById('name').value = element.name;
    document.getElementById('description').value = element.description;
    document.getElementById('status').value = element.status;
    document.getElementById('balance').value = element.balance;
    document.getElementById('rate').value = element.rate;
    document.getElementById('deposit').value = element.deposit;


}







function resetForm() {

    document.getElementById("myForm").reset();

}


const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  
  nameError.style.display= 'none';
  const nameRegex = /^[a-zA-Z]{3,25}$/;

  nameInput.addEventListener('input', function() {
    const name = nameInput.value.trim();
    
    if (!nameRegex.test(name)) {
      nameError.style.display = 'block';
      nameError.style.color = 'red'; // show the error message
    } else {
        nameError.style.display = 'none';
    }

})


const descriptionInput = document.getElementById('description');
  const descriptionError = document.getElementById('descriptionError');
  
  descriptionError.style.display= 'none';
  const descriptionRegex = /^[a-zA-Z]{3,150}$/;

  descriptionInput.addEventListener('input', function() {
    const description = descriptionInput.value.trim();
    
    if (!descriptionRegex.test(description)) {
        descriptionError.style.display = 'block';
        descriptionError.style.color = 'red'; // show the error message
    } else {
        descriptionError.style.display = 'none';
    }

})




const rateInput = document.getElementById('rate');
  const rateError = document.getElementById('rateError');
  
  rateError.style.display= 'none';
  const rateRegex = /^[1-9]\d*$/;

  rateInput.addEventListener('input', function() {
    const rate = rateInput.value.trim();
    
    if (!rateRegex.test(rate)) {
        rateError.style.display = 'block';
        rateError.style.color = 'red'; // show the error message
    } else {
        rateError.style.display = 'none';
    }

})

const balanceInput = document.getElementById('balance');
  const balanceError = document.getElementById('balanceError');
  
  balanceError.style.display= 'none';
  const balanceRegex = /^[1-9]\d*$/;

  balanceInput.addEventListener('input', function() {
    const balance = balanceInput.value.trim();
    
    if (!balanceRegex.test(balance)) {
        balanceError.style.display = 'block';
        balanceError.style.color = 'red'; // show the error message
    } else {
        balanceError.style.display = 'none';
    }

})

const depositInput = document.getElementById('deposit');
  const depositError = document.getElementById('depositError');
  
  depositError.style.display= 'none';
  const depositRegex = /^[1-9]\d*$/;

  depositInput.addEventListener('input', function() {
    const deposit = depositInput.value.trim();
    
    if (!depositRegex.test(deposit)) {
        depositError.style.display = 'block';
        depositError.style.color = 'red'; // show the error message
    } else {
        depositError.style.display = 'none';
    }

})


function addDetail() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const rate = document.getElementById('rate').value;
    const balance = document.getElementById('balance').value;
    const deposit = document.getElementById('deposit').value;


    fetch('http://localhost:3000/detail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({


            name: name,
            description: description,
            status: status,
            rate: rate,
            balance: balance,
            deposit: deposit,
        })
    });


}
// var updateButton = document.getElementById('updateBtn')

// updateButton.onclick =
    function updateDetail() {
        // id = element.id;


        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const status = document.getElementById('status').value;
        const rate = document.getElementById('rate').value;
        const balance = document.getElementById('balance').value;
        const deposit = document.getElementById('deposit').value;

        fetch(`http://localhost:3000/detail/${id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                id: id,
                name: name,
                description: description,
                status: status,
                rate: rate,
                balance: balance,
                deposit: deposit,
            })
        })

    }




function removeError(){

    let removed= document.getElementsByClassName("error")

    removed.style.display= none;
}







window.onload = async function getDetail() {
    let response;

    try {
        response = await fetch('http://localhost:3000/detail');
        const detail = await response.json();
        createTableBody(detail);
        console.log(detail);
    } catch (error) {
        console.error(error);
    }
    console.log(response);
}



