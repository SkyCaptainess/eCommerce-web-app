let validateEmail = (email) =>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// This is really rudimentry
let validateInput = (str)=>{
    return str.length > 3;
}
export function newListingAuthentication(data){
    let errors = [];
    if(!validateInput(data.title))
        errors["title"]="Invalid input!";
    if(!validateInput(data.brand))
        errors["brand"]="Invalid input!";    
    return errors;
}
export function changePasswordAuthentication (passwords){
    let errors = [];
    console.log(passwords)
    if(passwords.oldPasswordold.length < 8)
        errors['oldPass'] = "Password should be at least 8 characters!";  
    if(passwords.newPassword.length < 8)
        errors['newPass'] = "Password should be at least 8 characters!";  
    return errors;      
}
export function signinAuthentication (signinData){
    let errors = [];
    if(!validateEmail(signinData.email))
        errors['email'] = "Please enter an valid email!";
    if(signinData.password.length < 8)
        errors['password'] = "Password should be at least 8 characters!";  
    return errors;      
}

export function profileAuthentication (data){
    let errors = []
    console.log("!!!!!!!!!!")
    if(data.firstname=="" || data.lastname=="")
        errors['names'] = "Names cannot be left empty!"
    if(!validateEmail(data.email))
        errors['email'] = "Please enter an valid email!";
    return errors;
}
export function signupAuthentication (signupData){
    // signup:{
    //     firstname:"",
    //     lastname:"",
    //     email:"",
    //     password:"",
    //     passwordRepeat:"",
    //     errors:[],
    // }
    let errors = [];
    errors = profileAuthentication(signupData);
    // if(signupData.firstname=="" || signupData.lastname=="")
    //     errors['names'] = "Names cannot be left empty!"
    // if(!validateEmail(signupData.email))
    //     errors['email'] = "Please enter an valid email!";
    if(signupData.password.length < 8)
        errors['password'] = "Password should be at least 8 characters!";
    if(signupData.passwordRepeat.length < 8)
        errors['passwordRepeat'] = "Password should be at least 8 characters!";
    if(signupData.passwordRepeat != signupData.password)
        errors['passwordRepeat'] = "Passwords do not match!";
    return errors;

} 