import crypto from "crypto-js";

class UserInfo {

    myInstance = null;

    _userID = "";
    _userName = "";

    constructor() {
        const newName = prompt("Please insert your name");
        this._userName = newName;
        let date = new Date();
        let curr_time = date.toLocaleDateString("en-US");
        this._userID = crypto.MD5(newName + curr_time).toString().substring(0, 7)
    }

    static getInstance() {
        if (this.myInstance === undefined) {
            this.myInstance = new UserInfo()
        }
        return this.myInstance
    }

}

export function getUserId() {
    return UserInfo.getInstance()._userID;
}

export function getUserName() {
    return UserInfo.getInstance()._userName;
}