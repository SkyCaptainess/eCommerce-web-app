<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <el-form :model='profile'>
            <el-form-item label='Firstname'>
                <el-input v-model="profile.firstname" :placeholder="userProfile.firstname"> </el-input>
                <p class="error" v-if="errors.names"> {{errors.names}} </p>
            </el-form-item>     
            <el-form-item label='Lastname'>
                <el-input v-model="profile.lastname" :placeholder="userProfile.lastname"> </el-input>
            </el-form-item>     
            <el-form-item label='Email'>
                <el-input v-model="profile.email" :placeholder="userProfile.email"> </el-input>
                <p class="error" v-if="errors.email"> {{errors.email}} </p>
            </el-form-item>         
            <el-button @click="onCancel">Cancel</el-button>
            <el-button type="primary" @click="submitProfile">Confirm</el-button>
        </el-form>
    </el-card>
</template>

<script>
import {profileAuthentication} from '../services/auth';
import {mapActions, mapState} from 'vuex';
import {ACTION_UPDATE_PROFILE, ACTION_RESET_STATE} from '../store/storeconstants';

export default {
    data(){
        return {
            profile: {
                firstname:"",
                lastname:"",
                email:"",
            },
            errors:[],
        } 
    },
    computed:{
        ...mapState('user',{
            userProfile: state => state.userProfile,
        }),
    },
    mounted(){
        this.profile.firstname = this.userProfile.firstname;
        this.profile.lastname = this.userProfile.lastname;
        this.profile.email = this.userProfile.email;


    },
    methods:{
        ...mapActions('user', {
            'updateProfileAction' : ACTION_UPDATE_PROFILE,
            "resetState": ACTION_RESET_STATE,
        }),
        submitProfile: function(){
            this.errors = profileAuthentication(this.profile);
            console.log(this.profile);
            if(Object.keys(this.errors).length === 0)
            {
                this.updateProfileAction(this.profile);
            }
        },
        onCancel: function(){
            this.profile.firstname="";
            this.profile.lastname="";
            this.profile.email="";
            this.resetState();
        },
    }
}
</script>

