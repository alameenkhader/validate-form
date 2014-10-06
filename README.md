validate-form
=============

Validate Your Forms with ease

Validate forms
  Use the method ```validateForm(selector)```

Class:
*   validate-required
*   validate-number
*   validate-email
*   validate-url
*   validate-date
*   validate-past-date # For dates such as birthdays, must be a past date. right?

example:  
HTML:
```
  <form id="myForm">  
      <input type="text" class="validate-required"/>
      <input type="email" class="validate-required validate-email"/>
      <input type="text" class="validate-url"/>
      <input type="submit" value="Save" />
  </form>
```  
  
  Javascript:
```
     $(function(){  
         var selector = '#myForm';
         $(selector).submit(function(){  
             if(validateForm(selector)) {
                 return true;
             } else {  
                 // Ah! I think there are some errors in your input
                 return false; 
             }  
         });  
     });  
``` 
