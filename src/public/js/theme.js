// read cookie to check theme color
// and change the css file accordingly.
window.addEventListener('load', checkTheme, true)
        function changeTheme(color){
            document.cookie = `theme=${color}`
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
                if(getCookie('theme') == "#0764FD"){
                    changeTheme('#0764FD')
                }
            }
        }