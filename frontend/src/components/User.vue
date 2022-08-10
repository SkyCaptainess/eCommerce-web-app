<template>
    <el-row :gutter="20" type="flex" align="middle" justify="center">
        <el-col :xs="16" :sm="16" :md="16" :lg="12" :xl="12" :offset="0">
            <UserProfile v-if="!bShowUpdateProfile"/>
            <UpdateProfile v-if="bShowUpdateProfile"/>
            <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                    <el-button type="info" plain @click="buttonCheckPassword">Update Profile</el-button>
                </el-col>
                <el-col :span="8" :offset="0">
                    <el-button type="warning" plain @click="buttonChangePassword">Change Password</el-button>
                </el-col>
                <el-col :span="8" :offset="0">
                    <el-button type="danger" plain @click="bDoubleCheckSignout = true">Sign Out</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-alert v-if="bShowResult&&bShowCheckPassword" :type="alertType" :closable="false"> {{responseMsg}} </el-alert>

            </el-row>
            

        </el-col>
    </el-row>
    <el-row class="checkPassword" :gutter="20" type="flex" align="middle" justify="center">
        <el-col :xs="16" :sm="16" :md="16" :lg="12" :xl="12" :offset="0">
            <CheckPassword v-if="bShowCheckPassword"/>
        </el-col>
    </el-row>
    <el-row class="changePassword" :gutter="20" type="flex" align="middle" justify="center">
        <el-col :xs="16" :sm="16" :md="16" :lg="12" :xl="12" :offset="0">
            <ChangePassword v-if="bShowChangePassword" @cpCancelled="cancelChangePassword"/>
        </el-col>
    </el-row>
    <Listings/>
    <el-dialog
    title="Alert!"
    v-model="bDoubleCheckSignout"
    width="30%"
    >
        <span>Are you sure you want to sign out?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="bDoubleCheckSignout = false">Cancel</el-button>
                <el-button type="primary" @click="actionSignout">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import {ACTION_SHOW_CHANGEPASSWORD, ACTION_SHOW_CHECKPASSWORD, ACTION_USER_SIGNOUT, ACTION_RESET_STATE} from '../store/storeconstants';
import {mapState,mapActions} from 'vuex'
import CheckPassword from './CheckPassword.vue'
import UserProfile from './UserProfile.vue'
import UpdateProfile from './UpdateProfile.vue'
import ChangePassword from './ChangePassword.vue'
import Listings from './Listings.vue'
// import Listings from './Listings.vue';
export default {
    data(){
        return{
            bDoubleCheckSignout:false,
            
        };
    },
    components:{
        UserProfile,
        ChangePassword,
        UpdateProfile,
        CheckPassword,
        Listings,
    },
    computed: {
        ...mapState('user',{
            // profileState: state => state.userProfile,
            bRequestSuccess: state => state.success,
            responseMsg : state => state.responseMsg,
            bShowResult: state => state.showResult,
            bShowChangePassword: state => state.bShowChangePassword, 
            bShowCheckPassword: state => state.bShowCheckPassword, 
            bShowUpdateProfile: state => state.bShowUpdateProfile,
        }),
        alertType: function(){
            return this.bRequestSuccess?'success':'error';
        },
    },
    mounted(){
        this.$store.dispatch(`user/${ACTION_RESET_STATE}`);

    },
    methods:{
        ...mapActions('user', {
            "actionSignout": ACTION_USER_SIGNOUT,
            "actionShowChangePassword": ACTION_SHOW_CHANGEPASSWORD,
            "actionShowCheckPassword": ACTION_SHOW_CHECKPASSWORD,
        }),
        //============== CHANGE PASSWORD=============
        buttonChangePassword (){
            this.actionShowChangePassword(true);
        },

        cancelChangePassword(){
            console.log("[CancelChangePassword]");
            this.actionShowChangePassword(false);
        },

        //============== CHECK PASSWORD=============
        buttonCheckPassword (){
            this.actionShowCheckPassword(true);
        },
        cancelCheckPassword(){
            this.actionShowCheckPassword(false);
        },

    }
}
</script>
<style scoped>
.el-col .el-button{
    width:100%;
}
.el-row{
    margin:8px;
}
</style>
