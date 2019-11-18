// read cookie to check theme color
// and change the css file accordingly.
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

window.addEventListener('load', checkTheme, true)
        function changeTheme(color){
            $('body').css('background-color', color)
            $('header').css('background-color', color)
            $('section').css('background-color', color)
            $('footer').css('background-color', color)
        }
        function checkTheme(){
            if(getCookie('theme') == ""){
                changeTheme('#191a1d')
            }
            else{
                if(getCookie('theme') == "#191a1d"){
                    changeTheme('#191a1d')
                } else{
                    changeTheme('#0764FD')
                }
            }
        }