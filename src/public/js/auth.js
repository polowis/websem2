


/**
 * @description encrype password
 * @param {} salt 
 */
const cipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let byteHex = n => ("0" + Number(n).toString(16)).substr(-2)
    let applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code)    

    return text => text.split('')
                .map(textToChars)
                .map(applySaltToChar)
                .map(byteHex)
                .join('')
}

/**
 * @description decrypt password
 * @param {*} salt 
 */
const decipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let saltChars = textToChars(salt)
    let applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code)
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('')
}       
const mydecipher = decipher('password')
/**
 * 
 * @function get cookie by name
 * @param {*} cookie_name 
 * @returns cookie's value
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end))
            
    }
}
return ""


}
// check if user is logged in, redirect to home page if not logged in. 

/**
 * @summary Check the cookie to see it the default value equal to default email
 * in case, it's not, we move to the next step. Assuming the email is not null, 
 * we compare the email in our local storage with email in cookie value, then check the password via token property
 * If all checks are passed, user is valid to go to the current page, otherwise, return to index home page
 * @function checkCookie
 * @description check if cookie is set
 * @returns url
 */
function checkCookie(){
if(getCookie('email') == ''){
    window.location.replace('/index.html');
} else{
    // decrypt password and compare
    if(getCookie('email') != "admin@gmail.com"){
        let email= localStorage.getItem('email_domain')
        if(email != ""){
            if(email == getCookie('email')){
            let password = localStorage.getItem('password_domain')
            let rawpassword = mydecipher(password)
            let rawcookiepassword = mydecipher(getCookie('token'))
            if(rawcookiepassword != rawpassword){
                window.location.replace('/index.html');
            }
        } else{
            window.location.replace('/index.html');
        }
        }
    }
}
}