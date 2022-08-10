import {ACTION_USER_SIGNUP,
    ACTION_USER_SIGNIN,
    ACTION_GET_USER_PROFILE,
    ACTION_CHANGE_PASSWORD,
    ACTION_CHECK_PASSWORD,
    ACTION_RESET_STATE,
    ACTION_SHOW_CHANGEPASSWORD,
    ACTION_SHOW_CHECKPASSWORD,
    ACTION_UPDATE_PROFILE,
    ACTION_USER_SIGNOUT,
    ACTION_GET_USER_LISTINGS,
    ACTION_USER_MANAGELISTING,
    ACTION_SHOW_NEWLISTING,
    ACTION_SUBMIT_NEWLISTING,
    ACTION_REMOVE_LISTING,
    ACTION_GET_CART,
    ACTION_REMOVE_CARTITEM,
    ACTION_MODIFY_CHECKOUTAMOUNT,
    ACTION_SELECT_CHECKOUTITEM,
    ACTION_CONFIRM_TRANSATION,
    MUTATION_USER_LISTINGS,
    MUTATION_FAIL, 
    MUTATION_USER_PROFILE,
    MUTATION_SUCCESS, 
    MUTATION_SHOW_RESULT,
    MUTATION_SHOW_CHANGEPASSWORD,
    MUTATION_SHOW_CHECKPASSWORD,
    MUTATION_SHOW_UPDATEPROFILE,
    MUTATION_SHOW_NEWLISTING,
    MUTATION_GET_CART,
    MUTATION_RESET_STATE,
    MUTATION_COMPUTE_SUBTOTAL,
    MUTATION_CONFIRM_TRANSATION,
} from '../storeconstants';
import axios from 'axios';
import router from '../../router';

const state = ()=> {
    // sessionStorage.clear()
    return sessionStorage.getItem("state")?JSON.parse(sessionStorage.getItem("state")):{
        userProfile:{
            firstname:'',
            lastname:'',
            email:'',
        },
        cart:[],
        subtotal: 0,
        listings:[],
        responseMsg:'',
        success: false, 
        showResult: false,
        bShowChangePassword: false,
        bShowCheckPassword:false,
        bShowUpdateProfile: false,
        bShowNewListing: false,
        path:"/",
        number:0,
        islog:false,
    }
};
const actions = {
    async [ACTION_GET_USER_PROFILE](context)
    {
        axios.defaults.withCredentials = true;
        let response = await axios.get('http://localhost:3000/api/user/info');
        // Mutate user profile if returned success
        if(response.status === 200 && response.data.errno === 0)
        {
            console.log(response.data);
            context.commit(MUTATION_USER_PROFILE, response.data.data);
            context.commit(MUTATION_SUCCESS);

        }else{
            context.commit(MUTATION_FAIL, response.data.message);
        }
        // context.commit("showResult", true);
    },
    async [ACTION_USER_SIGNIN](context, data)
    {   
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/user/login', data);
        // console.log(response);
        if(response.status === 200 && response.data.errno === 0 )
        {
            // Display user page coz there's nothing else, should display the preivous page   
                context.commit("SET_LOG",true)   
                context.commit(MUTATION_SUCCESS);
                context.commit(MUTATION_SHOW_RESULT, true);
                // console.log(response);
                setTimeout(function(){
                    context.commit(MUTATION_SHOW_RESULT, false);
                    router.push({name:"User"});
                }, 500);
        }
        else{
            // console.log(response.data.message);
            context.commit(MUTATION_FAIL, response.data.message);
            context.commit(MUTATION_SHOW_RESULT, true);
        }

    },
    async [ACTION_USER_SIGNUP](context, data)
    {  
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/user/register', data);

        if(response.status === 200 && response.data.errno === 0)
        {
            context.commit(MUTATION_SUCCESS);
            context.commit(MUTATION_SHOW_RESULT, true);

            // we want to handle response in some ways.
            setTimeout(function(){
                context.commit(MUTATION_SHOW_RESULT, false);
                router.push('/signin');
            }, 1000);
        }else{
            // Account failed to register, mutate the state for error messages.
            context.commit(MUTATION_FAIL, response.data.message);
            context.commit(MUTATION_SHOW_RESULT, true);
        }
    },
    async [ACTION_CHANGE_PASSWORD](context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.patch('http://localhost:3000/api/user/modifypassword', data);
        if(response.status === 200 && response.data.errno === 0)
        {
            console.log(response);
            context.commit(MUTATION_SUCCESS);
            setTimeout(function(){
                context.commit(MUTATION_SHOW_RESULT, false);
                context.commit(MUTATION_SHOW_NEWLISTING, false);
                context.commit(MUTATION_SHOW_CHANGEPASSWORD, false);

            }, 1000);
        }else{
            console.log(response);
            context.commit(MUTATION_FAIL, response.data.message);
        }
        context.commit(MUTATION_SHOW_RESULT, true);

    },
    async [ACTION_CHECK_PASSWORD] (context,data){
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/user/checkpassword', data);
        if(response.status === 200 && response.data.errno === 0)
        {
            context.commit(MUTATION_SUCCESS);
            console.log(response);
            // close the dialog after 1 second.
            setTimeout(function(){
                context.commit(MUTATION_SHOW_RESULT, false);
                context.commit(MUTATION_SHOW_CHECKPASSWORD, false);

                context.commit(MUTATION_SHOW_UPDATEPROFILE, true)
            }, 1000);        
        }
        else
        {
            console.log(response);
            if(response.status === 200)
                context.commit(MUTATION_FAIL, response.data.message);
            else
                context.commit(MUTATION_FAIL, response.status);
        }
        context.commit(MUTATION_SHOW_RESULT, true)
    },
    async [ACTION_SHOW_CHANGEPASSWORD] (context, val)
    {
        context.commit(MUTATION_RESET_STATE);
        console.log('[CHANGE PASSWORD]: '+ val);
        context.commit(MUTATION_SHOW_CHANGEPASSWORD, val);
        // context.commit(MUTATION_RESET, false);

    },
    async [ACTION_SHOW_CHECKPASSWORD] (context, val)
    {
        context.commit(MUTATION_RESET_STATE);
        console.log('[Check PASSWORD]: '+ val);
        context.commit(MUTATION_SHOW_CHECKPASSWORD, val);
        // context.commit(MUTATION_SHOW_CHANGEPASSWORD, false);

    },
    async [ACTION_SHOW_NEWLISTING] (context, val)
    {
        context.commit(MUTATION_RESET_STATE);
        console.log('[SHOW NEW LISTING]: '+ val);
        context.commit(MUTATION_SHOW_NEWLISTING, val);
    },
    async [ACTION_RESET_STATE](context ){
        context.commit(MUTATION_FAIL,"");
        context.commit(MUTATION_SHOW_RESULT, false);
        context.commit(MUTATION_SHOW_CHANGEPASSWORD, false);
        context.commit(MUTATION_SHOW_CHECKPASSWORD, false);
        context.commit(MUTATION_SHOW_UPDATEPROFILE, false);
        context.commit(MUTATION_SHOW_NEWLISTING, false);
    },

    async [ACTION_UPDATE_PROFILE] (context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.patch('http://localhost:3000/api/user/modify', data);
        if(response.status === 200 && response.data.errno === 0)
        {
            console.log(response);
            context.commit(MUTATION_SUCCESS);
            context.commit(MUTATION_SHOW_UPDATEPROFILE, false);
        }
        else{
            context.commit(MUTATION_SUCCESS);
            // context.commit(MUTATION_SHOW_UPDATEPROFILE, false);
            console.log(response);
        }
    },
    async [ACTION_USER_SIGNOUT] (context){
        sessionStorage.clear()
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/user/out');
        if(response.status === 200 && response.data.errno === 0){
                context.commit("SET_LOG",false)
                context.commit(MUTATION_FAIL,"log out");
                context.commit(MUTATION_USER_PROFILE,{firstname:"", lastname:"", email:""});
                context.commit(MUTATION_USER_LISTINGS,[]);
                router.push({name:"Home"});

        }
    },
    async [ACTION_GET_USER_LISTINGS] (context){
        axios.defaults.withCredentials = true;
        let response = await axios.get('http://localhost:3000/api/phone/selllist');
        if(response.status === 200 && response.data.errno === 0)
        {
            console.log("GET USER LISTING!")
            console.log(response);
            context.commit(MUTATION_USER_LISTINGS, response.data.data);
        }else{
            // console.log("Somethings wrong with GET USER LISTING!")
            console.log(response);
        }
    },

    async [ACTION_USER_MANAGELISTING] (context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.patch('http://localhost:3000/api/phone/disablestate',data);
        // console.log(response);
        if(response.status === 200 && response.data.errno === 0){
            // console.log("Update Listing!")
            context.dispatch(ACTION_GET_USER_LISTINGS);
        }
    },
    async [ACTION_SUBMIT_NEWLISTING] (context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/phone/addnew',data);
        context.commit(MUTATION_SHOW_RESULT, true);
        if(response.status === 200 && response.data.errno === 0){
            // console.log("Update Listing!")
            context.commit(MUTATION_SUCCESS);
            setTimeout(function(){
                context.commit(MUTATION_SHOW_NEWLISTING, false);
                context.commit(MUTATION_SHOW_RESULT, false);
            },1000);
            context.dispatch(ACTION_GET_USER_LISTINGS);
        }else{
            context.commit(MUTATION_FAIL, response.data.errno);
        }
        
    },
    async [ACTION_REMOVE_LISTING] (context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/phone/deletephone',data);
        // console.log(response);
        if(response.status === 200 && response.data.errno===0)
        {
            context.commit(MUTATION_SUCCESS, "Item removed!");
            context.commit(MUTATION_SHOW_RESULT, true);
            context.dispatch(ACTION_GET_USER_LISTINGS);
            setTimeout(function(){
                context.commit(MUTATION_SHOW_RESULT, false);
            },2000);
        }else{
            context.commit(MUTATION_FAIL, "Something's wrong, please try again later.");
            context.commit(MUTATION_SHOW_RESULT, true);
        }
    },
    async [ACTION_REMOVE_CARTITEM] (context, data){
        // console.log("[ACTION_REMOVE_CARTITEM]")
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/cart/checkoutitemsdelete',data);
        // console.log(response)
        if(response.status === 200 && response.data.errno===0)
        {
            context.commit(MUTATION_SUCCESS, "Item removed!");
            context.commit(MUTATION_SHOW_RESULT, true);
            context.dispatch(ACTION_GET_CART);
            setTimeout(function(){
                // context.commit(MUTATION_RESET_STATE);
                context.commit(MUTATION_SHOW_RESULT, false);
            },1000);
        }else{
            context.commit(MUTATION_FAIL, "Something's wrong, please try again later.");
            context.commit(MUTATION_SHOW_RESULT, true);
        }
    },
    async [ACTION_GET_CART] (context){
        axios.defaults.withCredentials = true;
        let response = await axios.get('http://localhost:3000/api/cart/checkoutlist');
        if(response.status===200 && response.data.errno === 0)
        {
            console.log("ACTION_GET_CART");
            context.commit(MUTATION_SUCCESS);
            context.commit(MUTATION_GET_CART, response.data.data);
            context.commit(MUTATION_COMPUTE_SUBTOTAL);
        }else{
            context.commit(MUTATION_SHOW_RESULT, true);
            context.commit(MUTATION_FAIL, "Failed to get cart data, please try again later.")
        }
    },
    async [ACTION_MODIFY_CHECKOUTAMOUNT] (context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/cart/checkoutitemsnumber',data);
        console.log("ACTION_MODIFY_CHECKOUTAMOUNT");
        // console.log(response);
        if(response.status === 200 && response.data.errno===0)
        {
            context.commit(MUTATION_SUCCESS, "Item updated!");
            context.dispatch(ACTION_GET_CART);
            setTimeout(function(){
                context.commit(MUTATION_RESET_STATE);
            },1000);
        }else{
            context.commit(MUTATION_FAIL, "Something's wrong, please try again later.");
            context.commit(MUTATION_SHOW_RESULT, true);
        }
        
    },
    async [ACTION_SELECT_CHECKOUTITEM] (context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/cart/checkoutitemsstate',data);
        console.log("ACTION_SELECT_CHECKOUTITEM");
        if(response.status === 200 && response.data.errno===0){
            // console.log(response)
            context.commit(MUTATION_SUCCESS,);
            context.dispatch(ACTION_GET_CART);
            // setTimeout(function(){
            //     context.commit(MUTATION_RESET_STATE);
            // },2000);
        } else{
            context.commit(MUTATION_FAIL, "Something's wrong, please try again later.");
            context.commit(MUTATION_SHOW_RESULT, true);
        }
     },
    async [ACTION_CONFIRM_TRANSATION] (context, data){
        axios.defaults.withCredentials = true;
        let response = await axios.post('http://localhost:3000/api/cart/checkoutitems',data);
        // console.log(response);
        if(response.status === 200 && response.data.errno===0)
        {
            context.commit(MUTATION_SUCCESS, "Payment Success");
            context.dispatch(ACTION_GET_CART);
            context.commit(MUTATION_SHOW_RESULT, true)
            setTimeout(function(){
                context.commit(MUTATION_RESET_STATE);
            },2000);
        }else{
            context.commit(MUTATION_FAIL, "Something's wrong, please try again later.");
            context.commit(MUTATION_SHOW_RESULT, true);
        }
        
    },
};
const getters = {};
const mutations = {
    SET_PATH(state,path){
        state.path=path
    },
    RESET(state){
        state.success = false;
        state.userProfile.firstname = "";
        state.userProfile.lastname = "";
        state.userProfile.email = "";
        state.showResult= false;
        state.responseMsg="";
        state.number=0
    },
    SET_LOG(state, islog){
        state.islog=islog
    },

    CHANGE_NUM(state,num){
        state.number=state.number+num
    },
    [MUTATION_FAIL](state, msg)
    {   
        state.success = false;
        state.responseMsg=msg;
    },
    [MUTATION_SUCCESS](state, val = "Success! Please wait...") {
        state.responseMsg = val;
        state.success = true;
    },
    [MUTATION_SHOW_RESULT] (state, val){
        state.showResult = val;
    },
    [MUTATION_USER_PROFILE] (state, data)
    {   state.number=0
        state.userProfile.firstname = data.firstname;
        state.userProfile.lastname = data.lastname;
        state.userProfile.email = data.email;
    },
    [MUTATION_SHOW_CHANGEPASSWORD] (state, val)
    {
        state.bShowChangePassword = val;
    },
    [MUTATION_SHOW_CHECKPASSWORD] (state, val)
    {
        state.bShowCheckPassword = val;
    },
    [MUTATION_SHOW_UPDATEPROFILE] (state, val)
    {
        state.bShowUpdateProfile = val;
    },
    [MUTATION_USER_LISTINGS] (state, val)
    {
        state.listings = val;
    },
    [MUTATION_SHOW_NEWLISTING](state, val)
    {
        state.bShowNewListing = val;
    },
    [MUTATION_GET_CART] (state, data){
        state.cart = data;
    },
    [MUTATION_RESET_STATE] (state){
        state.responseMsg=''
        state.success=false
        state.showResult= false
        state.bShowChangePassword=false
        state.bShowCheckPassword=false
        state.bShowUpdateProfile= false
        state.bShowNewListing=false
    },
    [MUTATION_COMPUTE_SUBTOTAL] (state){
        let total = 0;
        for(let item of state.cart)
        {
            console.log(item)
            total += item.phoneState ? item.checkoutItem.price * item.phoneNumber : 0;
        }
        state.subtotal = total;
    },
    [MUTATION_CONFIRM_TRANSATION] (state){
        console.log(state)
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }