<template>
    <el-row :gutter="20" type="flex" align="middle" justify="center" class="sign">
        <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="5">
            <el-card>
                <h2> Sign-In</h2>
                <el-form :model='signin' ref="signinForm">
                    <el-form-item label='Email'>
                        <el-input v-model="signin.email"> </el-input>
                        <p class="error" v-if="signin.errors.email"> {{signin.errors.email}} </p>
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input type="password" v-model="signin.password" autocomplete="off"> </el-input>
                        <p class="error" v-if="signin.errors.password"> {{signin.errors.password}} </p>

                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="validateAndSubmit">Sign in</el-button>
                    </el-form-item>
                </el-form>
                <el-alert v-if="bShowResult" :type="alertType" :closable="false"> {{responseMsg}} </el-alert>
                <p>First time user? Please <el-link type="primary" href="/signup">register</el-link>.</p>
            </el-card>
        </el-col>
    </el-row> 
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {signinAuthentication} from '../services/auth';
import {ACTION_USER_SIGNIN} from '../store/storeconstants';
export default {
    data(){
        return{
            signin:{
                email:"",
                password:"",
                errors: [],
            },
        }
    }, 
    computed:{
        ...mapState('user', {
            bRequestSuccess : state => state.success,
            responseMsg : state => state.responseMsg,
            bShowResult: state => state.showResult,
            bShowChangePassword: state => state.bShowChangePassword,
           }),
        alertType: function(){
            return this.bRequestSuccess ?'success':'error';
        },
    },
    methods:{
        ...mapActions('user', {'signinAction' : ACTION_USER_SIGNIN}),

        validateAndSubmit(){
            this.signin.errors = signinAuthentication(this.signin);
            
            if(Object.keys(this.signin.errors).length == 0)
                this.signinAction({'email': this.signin.email,
                'password': this.signin.password});
        },
    
    },


}
</script>

<style>
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