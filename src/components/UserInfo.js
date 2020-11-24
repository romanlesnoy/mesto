export class UserInfo {
    constructor (profileNameSelector, aboutMeSelector ) {
        this._profileName = profileNameSelector;
        this._profileAboutMe = aboutMeSelector;
    }

    getUserInfo () {
        this._profileInfo = {};
        this._profileInfo.name = this._profileName.textContent;
        this._profileInfo.job = this._profileAboutMe.textContent;
        return this._profileInfo;
    }

    setUserInfo ({profilename, job}) {
        this._profileName.textContent = profilename;
        this._profileAboutMe.textContent = job;
    }
}