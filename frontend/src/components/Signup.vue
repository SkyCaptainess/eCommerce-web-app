<template>
    <el-row :gutter="20" type="flex" align="middle" justify="center" class="sign">
        <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="5">
            <el-card>
                <h2> Sign up</h2>
                <el-form :model='signup' novalidate="true">
                    <el-row :gutter="0">
                       <el-col :span="11" :offset="0">
                            <el-form-item label='Firstname'>
                                <el-input v-model="signup.firstname"> </el-input>
                                <p class="error" v-if="signup.errors.names"> {{signup.errors.names}} </p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2"></el-col> 
                        <el-col :span="11" :offset="0">
                            <el-form-item label='Lastname'>
                                <el-input v-model="signup.lastname"> </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                           
                    <el-form-item label='Email'>
                        <el-input v-model="signup.email"> </el-input>
                        <p class="error" v-if="signup.errors.email"> {{signup.errors.email}} </p>
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input type="password" v-model="signup.password"> </el-input>
                        <p class="error" v-if="signup.errors.password"> {{signup.errors.password}} </p>
                    </el-form-item>
                    <el-form-item label="Repeat your password">
                        <el-input type="password" v-model="signup.passwordRepeat"> </el-input>
                        <p class="error" v-if="signup.errors.passwordRepeat"> {{signup.errors.passwordRepeat}} </p>
                    </el-form-item>
                    <el-alert v-if="bShowResult" :type="alertType" :closable="false"> {{responseMsg}} </el-alert>
                    <el-form-item>
                        <el-button type="primary" @click="validateAndSubmit">Sign up</el-button>
                    </el-form-item>
                </el-form>            
                <p>Already have an account? Please <el-link type="primary" href="/signin">sign in</el-link>.</p>
    
            </el-card>
        </el-col>
    </el-row> 
</template>

<script>
import {signupAuthentication} from '../services/auth';
import {mapActions, mapState} from 'vuex';
import {ACTION_USER_SIGNUP} from '../store/storeconstants';

export default {
    data(){
        return{
            signup:{
                firstname:"",
                lastname:"",
                email:"",
                password:"",
                passwordRepeat:"",
                errors:[],
            }
        }
    },
    computed:{
        ...mapState('user', {
            responseMsg : state => state.responseMsg,
            bShowResult: state => state.showResult,
            bRequestSuccess: state => state.success,
        }),
        alertType: function(){
            return this.bRequestSuccess?'success':'error';
        },
    },
    methods:{
        ...mapActions('user',{
            signupAction: ACTION_USER_SIGNUP,
        }),
        validateAndSubmit(){
            function signupPromise (data)
            {
                return new Promise(function(resolve){
                    resolve(data);
            });
            }
            signupPromise(this.signup).then( data => {
                // Remove any whitespaces
                data.firstname.trim();
                data.lastname.trim();
                data.errors = signupAuthentication(data);
                return data;
                }).then(data => {
                    if(Object.keys(data.errors).length==0)
                    {
                        this.signupAction({"firstname": data.firstname,
                                "lastname": data.lastname,
                                "email": data.email, 
                                "password": data.password,}); 
                    }
                    else
                        console.log(data.errors);
                });
                
        }
                
                
    }
}
</script>

<style scoped>
.sign{
margin-top: 5%;
}
.el-link{
    font-size: 1em;
}
.error{
    font-size: 0.9em;
    color: #F56C6C;
    line-height: 10px;
    text-align: left;
}

</style>
