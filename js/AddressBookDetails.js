class AddressBookDetails{

    id;

    get firstName(){return this._firstName}
    set firstName(firstName){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(firstName))
            this._firstName = firstName;
        else throw "Incorrect Try Diff Name..!!"
    }

    get address(){return this._address}
    set address(address){
        let nameRegex = RegExp('[A-Z,a-z,0-9]{3,}$');
        if(nameRegex.test(address))
            this._address = address;
        else throw "Incorrect Try Diff Address..!!"
    }

    get city(){return this._city}
    set city(city){this._city = city}
    
    get state(){return this._state}
    set state(state){this._state = state}
    
    get zip(){return this._zip}
    set zip(zip){this._zip = zip}
 
    get phoneNum(){return this._phoneNum}
    set phoneNum(phoneNum){
        let nameRegex = RegExp('^[0-9]{2}[: :][1-9]{1}[0-9]{9}')
        if(nameRegex.test(phoneNum))
            this._phoneNum = phoneNum;
        else throw "Incorrect Phone Num..!!"
    }

    toString(){
        return "Name = "+this.firstName+" Address = "+this.address+" City = "+this.city+" State = "+this.state+" Zip = "+this.zip+" PhoneNo = "+this.phoneNum;
    }
}