//to restrict particular input tag to character or digit
function only(input,type){
var onlyCharacter=/[^a-z]/gi;
var onlyNo=/[^0-9]/gi;
if(type==="ch")
input.value=input.value.replace(onlyCharacter,'');
else
input.value=input.value.replace(onlyNo,'');
}
//to assign date of birth max to today & min
function dateOfBirth(){
 let today=new Date().toISOString().slice(0,10);
  document.getElementById("dob").setAttribute("max",today);
  let past=today.slice(0,4);
  past=past-120;
 let minDate=past + today.slice(4,10);
 document.getElementById("dob").setAttribute("min",minDate);
}

//for checking empty fields
const isRequired = value=> value==='' ?false:true;

//to assign border color red 
function fail(input){

   const formField=input.parentElement;
  // document.getElementById('formField').style.borderColor="red";
   formField.classList.remove('success');
  formField.classList.add('fail');

}

//to assign border color default
function pass(input){

  const formField=input.parentElement;
  formField.classList.remove('fail');
  formField.classList.add('success');
}

//to check first name & lastname
const NameValid=(name)=>{
    let valid=false;
    const nameValue=name.value;
    if(!isRequired(nameValue)){
      fail(name);
    }
    else{
        pass(name);
        valid=true;
    }
    return valid;
}

// to check email  
const emailValid=(email)=>{
    var valid=false;
    const emailValue=email.value;
    if(!isRequired(emailValue))
            fail(email);

//for validation of correct pattern
    else if(!emailValidation(email))
            fail(email);

     else{
            pass(email);
            valid="true"
        }
    return valid;
}

const emailValidation=(email)=>{
    var em=email.value;
    //checking email pattern
   if((em.indexOf('a')<=0)&&(em.charAt((em.length)-4)!='.')&&(em.charAt((em.length)-3)!='.'))
       return false;
    else
       return true;

}

//to check password
const checkPassword=(password)=>{
    var valid="false"
    var passwordValue=password.value;
    if(!isRequired(passwordValue))
        fail(password);

//checking for secure password
    else if(!passwordValid(passwordValue))
        fail(password);
    else{
        pass(password);
        valid="true";
    }
   return valid;         

}

const passwordValid=(password)=>{

    if(password.length<8){
       return false;
   }
   // search for password requirement
   else{
       if((password.search(/[a-z]/)<0)||(password.search(/[A-Z]/)<0)
          ||(password.search(/[0-9]/)<0) ||(password.search(/[!@#$%^&*]/)<0))
           return false;
         else
           return true;
     }
  }


const confirmPassword=(password,repassword)=>{
var valid="false";
var repasswordValue=repassword.value;
var passwordValue=password.value;

//checkfor empty field or not
if(!isRequired(repasswordValue))
    fail(repassword);

//comparing passwords
else if(!(passwordValue===repasswordValue))
     fail(repassword);
 else{
    pass(repassword);
    valid=true;
}
return valid;
}


//for select state  through country
function changeCountry(){

 var state=[["0","1|Uttrakhand","2|UttarPardesh","3|Delhi"],
            ["1","1|New York","2|California"]] ;

 var value=document.getElementById("country").value;
document.getElementById("state").innerHTML="<option selected>--Select Your State--</option>";
 for(var i=0;i<state.length;i++)
     {
       if(value==state[i][0]){
          var ar=state[i];
          for(var j=1;j<ar.length;j++)
           {
             var pair=ar[j].split("|");
             var newoption=document.createElement("option");
             newoption.value=pair[0];
             newoption.innerHTML=pair[1];
             document.getElementById("state").options.add(newoption);

           }
        }
    }
}

//for form validation
userRegistration.addEventListener('submit', function (e) {

// prevent the form from submitting
 e.preventDefault();
 var valid="false";
 var formElement=document.forms["userRegistration"].getElementsByTagName("input");
for(var i=0;i<formElement.length;i++){

 //for check those input tag which contain only required
  if(formElement[i].hasAttribute('required')) 
    {
      valid="true"
      var iD=formElement[i];
        if(iD.id==="fName")
            var fname=iD;
        else if(iD.id==="lName")
            var lname=iD;
        else if(iD.id==="email")
            var email=iD;
        else if (iD.id==="password")
            var password=iD;
        else if(iD.id==="repassword")
            var repassword=iD;

     }
  } 

// for field validation

if(valid){
 let isFirstNameValid = NameValid(fname),
     isLastNameValid= NameValid(lname),
     isEmailValid=    emailValid(email),
     isPasswordValid= checkPassword(password),
     isPasswordMatch=confirmPassword(password,repassword);

  let isFormValid = isFirstNameValid&&
                    isLastNameValid&&
                    isEmailValid&&
                    isPasswordValid&&
                    isPasswordMatch;

     if (isFormValid)
        return true;

 }

     });

// for form reseting
userRegistration.addEventListener('reset', function (e) {
       //for border color reset
var a=document.forms["userRegistration"].getElementsByTagName("input");

for(var i=0;i<a.length;i++){
     if(a[i].hasAttribute('required')){ 
        var iD=a[i];
       if((iD.id==="fName")||(iD.id==="lName")||(iD.id==="email")||(iD.id==="password")
         ||(iD.id==="repassword"))
        {
        iD.parentElement.classList.remove('fail');
        iD.parentElement.classList.add('success');
        }
    }
  }
});
