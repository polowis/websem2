/**
 *
 * @Name FilterJS
 * @Version : 1.1.0
 * @Programmer : Polowis
 * @Date : 
 * @Released under 
 * @Repository :
 *
 **/
(function(window, document) {
    "use strict";
  
    
    const validMethod = function(element) {
      function valid_decimal(event) {
        this.value = this.value.replace(/[^0-9\.]/g, "");
        if (
          (event.which != 46 || this.value.indexOf(".") != -1) &&
          (event.which < 48 || event.which > 57)
        ) {
          event.preventDefault();
        }
      }
  
      function valid_integer(event) {
        this.value = this.value.replace(/[^\d].+/, "");
        if (event.which < 48 || event.which > 57) {
          event.preventDefault();
        }
      }

      function valid_alpha(event){
        this.value = this.value.replace(/[\W_]+/g, "");
        if(event.which < 48 || event.which > 90){
          event.preventDefault();
        }
      }

      /**
       * 
       * @function valid_email
       * @description return valid email address
       * @param {*} event 
       */
      function valid_email(event){
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(pattern.test(String(this.value).toLowerCase())){
        }
        else{
          let elements = document.getElementsByTagName("INPUT");
          for (let i = 0; i < elements.length; i++) {
            elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
            e.target.setCustomValidity("You need to enter valid email address");
            }
        };
          elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
          };
          event.preventDefault();
      }


        }
      }
      function valid_boolean(event){
        const data = ["1", "0", "true", "false", 1, 0];
        if(data.includes(this.value)){
          console.log('true');
        }
        else{
          console.log('false');
          let elements = document.getElementsByTagName('input');
          for (var i = 0; i < elements.length; i++) {
            elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
            e.target.setCustomValidity("You need to enter valid email address");
            }
        };
          elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
          };
        }

        }

      }

  
      if (element.hasAttribute("filter")) {
        let valid = false;
        let tag = element.tagName.toLowerCase();
        let option = element.getAttribute("filter");
        let require = false;
        let array = option.split('|');
        ///////////////////////////////////////////////
        /*
        if (filter.startsWith("!")) {
          filter = filter.substr(1);
          require = true;
        }
        */
        ///////////////////////////////////////////////
        for(let filter = 0; filter < array.length; filter++){
            switch (array[filter]) {
                case "decimal":
                  if (tag == "input") {
                    element.addEventListener("blur", valid_decimal);
                    element.addEventListener("keypress", valid_decimal);
                    element.addEventListener("keyup", valid_decimal);
                    element.setAttribute("type", "number");
                  }
                  break;
                case "integer":
                  if (tag == "input") {
                    element.addEventListener("blur", valid_integer);
                    element.addEventListener("keypress", valid_integer);
                    element.addEventListener("keyup", valid_integer);
                    element.setAttribute("type", "number");
                  }
                  break;
                case "alpha":
                    if(tag == "input"){
                      element.addEventListener("blur", valid_alpha);
                      element.addEventListener('keyup', valid_alpha);
                      element.setAttribute('type', 'text');
  
                    }
                    break;
                case "email":
                  if(tag == "input"){
                    element.addEventListener('blur', valid_email);
                    element.addEventListener('keyup', valid_email);
                    element.setAttribute('type', 'email');
                  }
                  break;
                case "boolean":
                  if(tag == "input"){
                    element.addEventListener('blur', valid_boolean);
                    element.addEventListener('keyup', valid_boolean);
                    //element.setAttribute('type', 'text');
                  }


              }
        }


        /*
        if (require == true) element.setAttribute("required", "required");
        else element.removeAttribute("required");*/
      }
    };

    window.filter = {
      validMethod: validMethod
    };
  
    window.addEventListener(
      "load",
      function() {
        var data_items;
        data_items = document.querySelectorAll("[filter]");
        data_items.forEach(function(item) {
          window.filter.validMethod(item);
        });
      },
      false
    );
  })(window, document);