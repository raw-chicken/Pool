import crypto from "crypto-js";

class UserInfo {

    myInstance = null;

    _userID = "";
    _userName = "";

    constructor() {
        const newName = prompt("Please insert your name");
        this._userName = newName;
        const date = new Date()
        this._userID = crypto.SHA1(newName + date.getDate())
    }

    static getInstance() {
        console.log("get instance")
        if (this.myInstance === undefined) {
            this.myInstance = new UserInfo()
        }
        return this.myInstance
    }

}

export function getUserId() {
    return UserInfo.getInstance._userID;
}

export function getUserName() {
    return UserInfo.getInstance()._userName
}