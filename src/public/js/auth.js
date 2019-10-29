
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
function checkCookie(){
if(getCookie('email') == ''){
    window.location.replace('../../index.html');
} else{
    if(getCookie('email') != "admin@gmail.com"){
        window.location.replace('../../index.html');
    }
}
}