const clearCookie = () => {

    console.log('clear');
    document.cookie = 'session_token=;expires:Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

}

let user = {
    token: null,
    logged: false,
}

const layout = {
    login: `<h3>login</h3>
    <hr /><br />
    <div style="position:relative">
        <label for="username">Username: </label>
        <input type="text" id="username" name="username">
        <p style="color:#995544"></p>
    </div>
    <div style="position:relative">
        <label for="passwd">Password: </label>
        <input type="password" id="passwd" name="passwd">
        <p style="color:#995544"></p>
    </div>
    <button id="login" onclick="handleUser.login()">login</button>
    <p style="color:#995544"></p>`,
    joinGame_guest: `<h3>join game</h3>
    <hr /><br />
    <p style="color:#995544">You play as guest</p>
    <div style="position:relative">
        <label for="idJoin">Join game by id: </label>
        <input type="text" id="idJoin" name="idJoin">
        <p>leave empty to join any available game</p>
    </div>
    <div style="position:relative">
        <label for="guestName">Temporary name: </label>
        <input type="text" id="guestName" name="guestName">
        <p>leave empty for default guest name</p>
    </div><br/>
    <button id="joinGame" onclick="handleUser.joinGame()">search game</button>`,
    joinGame_user: `<h3>join game</h3>
    <hr /><br />
    <p style="color:#995544">You play as guest</p>
    <div style="position:relative">
        <label for="idJoin">Join game by id: </label>
        <input type="text" id="idJoin" name="idJoin">
        <p>leave empty to join any available game</p>
    </div>
    <button id="joinGame" onclick="handleUser.joinGame()" style="margin-top:2vh">search game</button>`
    ,
    register: `<h3>register</h3>
    <hr /><br />
    <div style="position:relative">
        <label for="username">Username: </label>
        <input type="text" id="username" name="username">
        <p style="color:#995544"></p>
    </div>
    <div style="position:relative">
        <label for="email">Email: </label>
        <input type="email" id="email" name="email">
        <p style="color:#995544"></p>
    </div>
    <div style="position:relative">
        <label for="passwd">Password: </label>
        <input type="password" id="passwd" name="passwd">
        <p style="color:#995544"></p>
    </div>
    <div style="position:relative">
        <label for="confPasswd">Confirm password: </label>
        <input type="password" id="confPasswd" name="passwd">
        <p style="color:#995544"></p>
    </div>
    <button id="register" onclick="handleUser.register()">register</button>
    <p style="color:#995544"></p>`,
    account: `<h3>account</h3>
    <hr /><br />
    <p style="color:#995544">Hello user!</p>
    <p>choose nickname color: </p><br/><div><input type="color" style="float:left;top:0.5vh;left:48%;transform:translate(-100%);width:15%;height:3vh">
    <button style="position:relative;float:right;right:48%;transform:translate(100%)">apply</button></div>`
}