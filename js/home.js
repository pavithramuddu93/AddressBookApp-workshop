let addressBookList;
let site_properties = {
    use_local_storage: "false",
    server_url: "http://localhost:3000/AddressBookList/"
    };

window.addEventListener('DOMContentLoaded', (event) => {
    if(site_properties.use_local_storage.match("true")){
        getAddressBookDataFromStorage();
    }else{
        getAddressBookDataFromServer();
    }
});

const getAddressBookDataFromStorage = () => {
    addressBookList =  localStorage.getItem('AddressBookList') ?
                         JSON.parse(localStorage.getItem('AddressBookList')):[];
    processAddressBookDataResponse();
}

const processAddressBookDataResponse = () => {
    document.querySelector(".emp-count").textContent = addressBookList.length;
    createInnerHtml();
    localStorage.removeItem('editData');
}

getAddressBookDataFromServer = () => {
    makeServiceCall("GET", "http://localhost:3000/AddressBookList",true)
    .then(responseText =>{
        addressBookList = JSON.parse(responseText);
        processAddressBookDataResponse();
    })
    .catch(error => {
        console.log("GET Status Error: "+ JSON.stringify(error));
        addressBookList = [];
        processAddressBookDataResponse();
    })
}

const createInnerHtml = () => {
    const headerHtml = "<th>FullName</th><th>Address</th><th>City</th><th>State</th>"+
                       "<th>Zip Code</th><th>Phone Number</th><th>Action</th>";
    
    if (addressBookList.length == 0) return ;

    let innerHtml = `${headerHtml}`; 
    for (const addressBookData of addressBookList){
        innerHtml = `${innerHtml}
        <tr>
            <td>${addressBookData._firstName}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zip}</td>
            <td>${addressBookData._phoneNum}</td>
            <td>
                <img id="${addressBookData.id}" onclick="remove(this)" src="../asset/icons/delete-black-18dp.svg" alt="Delete" name="" >
                <img id="${addressBookData.id}" onclick="update(this)" src="../asset/icons/create-black-18dp.svg" alt="Edit" name="">
            </td>
        </tr>
        `;
    }
document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let addressBookData = addressBookList.find(data => data.id==node.id);
    if (!addressBookData) return;
    const index = addressBookList
                    .map(data => data.id)
                    .indexOf(addressBookData.id)
    addressBookList.splice(index,1);
    if (site_properties.use_local_storage.match("true")){
        localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
        document.querySelector(".emp-count").textContent= addressBookList.length;
        createInnerHtml();
    }else{
        const deleteUrl = site_properties.server_url + addressBookData.id.toString();
        makeServiceCall("DELETE", deleteUrl, false)
            .then(responseText => {
                document.querySelector(".emp-count").textContent = addressBookList.length;
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Status: "+ JSON.stringify(error));
            });
    }
}

const update = (node) =>{
    let addressBookData = addressBookList.find(bookData => bookData.id==node.id);
    if (!addressBookData) return;
    localStorage.setItem("editData", JSON.stringify(addressBookData));
    window.location.replace("../pages/AddressBookForm.html");
}