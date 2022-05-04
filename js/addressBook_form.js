let isUpdate = false;
let addressBookObject = {};
let site_properties = {
    use_local_storage: "false",
    server_url: "http://localhost:3000/AddressBookList/"
    };

window.addEventListener('DOMContentLoaded', (event) =>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length==0){
            textError.textContent = "";
            return;
        }
        try{
            (new AddressBookDetails()).firstName = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.addressError')
    address.addEventListener('input', function(){
        if(address.value.length==0){
            addressError.textContent = "";
            return;
        }
        try{
            (new AddressBookDetails()).address = address.value;
            addressError.textContent = "";
        }catch(e){
            addressError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zipError')
    zip.addEventListener('input', function(){
        if(zip.value.length==0){
            zipError.textContent = "";
            return;
        }
        try{
            (new AddressBookDetails()).zip = zipError.value;
            zipError.textContent = "";
        }catch(e){
            zipError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phoneError')
    phone.addEventListener('input', function(){
        if(phone.value.length==0){
            phoneError.textContent = "";
            return;
        }
        try{
            (new AddressBookDetails()).phoneNum = phone.value;
            phoneError.textContent = "";
        }catch(e){
            phoneError.textContent = e;
        }
    });
    checkForUpdate();
});

const save = (event) =>{
    event.preventDefault();
    try {
        setAddressBookObject();
        if(site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            window.location.replace("../pages/home.html")
        }else{
            createORupdateAddressBook();
            window.location.replace("../pages/home.html")
        }
    } catch (e) {
        return
    }
}

const createORupdateAddressBook = () => {
    let postUrl = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        methodCall = "PUT"
        postUrl = postUrl + addressBookObject.id;
    }
    makeServiceCall(methodCall, postUrl, true, addressBookObject)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        })
}

const setAddressBookObject = () =>{
    if(site_properties.use_local_storage.match("true")){
        employeePayrollObj.id = createAddressBookId();
    }
    addressBookObject._firstName = getInputValueById('#name');
    addressBookObject._address = getInputValueById('#address')
    addressBookObject._city = getInputValueById('#city')
    addressBookObject._state = getInputValueById('#state')
    addressBookObject._zip = getInputValueById('#zip')
    addressBookObject._phoneNum = getInputValueById('#phone')
    console.log(addressBookObject);
}

function createAndUpdateStorage(){
    let addressBookDataList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookDataList){
        let bookData = addressBookDataList.find(data => data.id == addressBookObject.id);
        if(!bookData){
            addressBookDataList.push(addressBookObject);
        }else{
            const index = addressBookDataList
                          .map(data => data.id)
                          .indexOf(bookData.id);
            addressBookDataList.splice(index,1,addressBookObject);
        }
    }else{
        addressBookDataList = [addressBookObject]
    }
    alert("Data Submited..!")  
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookDataList))
}

const createAddressBookId = () => {
    let list =  JSON.parse(localStorage.getItem('AddressaBookList'));
    id = list.length+1;
    return id;
}

// createAddressBook = (id) => {
//     let addressBookData = new AddressBookDetails();
//     let list = localStorage.getItem('AddressBookList') ?
//                         JSON.parse(localStorage.getItem('AddressBookList')):[];
//     if(!id){
//         addressBookData.id = list.length+1;
//     }else addressBookData.id = id;
//     setAddressBookData(addressBookData);
//     return addressBookData;
// }

// function setAddressBookData(addressBookData){
//     try {
//         addressBookData.firstName = addressBookObject._firstName;
//     } catch (e) {
//         setTextValue('.text-error', e);
//         throw e ;
//     }

//     try {
//         addressBookData.address = addressBookObject._address;
//     } catch (e) {
//         setTextValue('.addressError', e);
//         throw e ;
//     }

//     addressBookData.city = addressBookObject._city;
//     addressBookData.state = addressBookObject._state;
    
//     addressBookData.zip = addressBookObject._zip

//     try {
//         addressBookData.phoneNum = addressBookObject._phoneNum;
//     } catch (e) {
//         setTextValue('.phoneError', e);
//         throw e ;
//     }
//     alert(addressBookData.toString());

//     return addressBookData
// }


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editData');
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObject = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () =>{    
    setValue('#name', addressBookObject._firstName);
    setValue('#address', addressBookObject._address);
    setValue('#city', addressBookObject._city);
    setValue('#state', addressBookObject._state);
    setValue('#zip', addressBookObject._zip);
    setValue('#phone', addressBookObject._phoneNum);
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}