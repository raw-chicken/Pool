import crypto from "crypto-js";

export class UserInfo {

    myInstance = null;

    _userID = "";
    _userName = "";

    constructor(username) {
        this._userName = username;
        let date = new Date();
        let curr_time = date.toLocaleDateString("en-US");
        this._userID = crypto.MD5(username + curr_time).toString().substring(0, 7)
    }

    static getInstance() {
        if (this.myInstance === undefined) {
            const newName = prompt("Please insert your name");
            this.myInstance = new UserInfo(newName)
        }
        return this.myInstance
    }

    static setInstance(username) {
        this.myInstance = new UserInfo(username);
        return this.myInstance;
    }

}

export function getUserId() {
    return UserInfo.getInstance()._userID;
}

export function getUserName() {
    return UserInfo.getInstance()._userName;
}

export function setUserInstance(username) {
    UserInfo.setInstance(username);
}