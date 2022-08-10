<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <el-form  :model="section">
            <el-form-item label='Old Password'>
                <el-input type="password" v-model="section.oldPasswordold"> </el-input>
                <p class="error" v-if="errors.oldPass"> {{errors.oldPass}} </p>
            </el-form-item>
            <el-form-item label='New Password'>
                <el-input type="password" v-model="section.newPassword"> </el-input>
                <p class="error" v-if="errors.newPass"> {{errors.newPass}} </p>
            </el-form-item>
            <el-alert v-if="bShowResult" :type="alertType" :closable="false"> {{responseMsg}} </el-alert>
            <el-button type="primary" @click="submitForm">Confirm</el-button>
            <el-button type="info" plain @click="onCancel">Cancel</el-button>
        </el-form>
    </el-card>
</template>

<script>
import {changePasswordAuthentication} from '../services/auth';
import {mapState, mapActions} from 'vuex';
import {ACTION_CHANGE_PASSWORD,ACTION_RESET_STATE} from '../store/storeconstants';
export default {
    data(){
        return {
            section:{
                    oldPasswordold:"",
                    newPassword:"",
                    },
            errors :[],
        }
    },
    computed:{
        ...mapState('user', {
            bRequestSuccess: state => state.success,
            responseMsg: state => state.responseMsg,
            bShowResult: state => state.showResult,
        }),
        alertType: function(){
            return this.bRequestSuccess ?'success':'error';
        },
    },
    emits:['cpCancelled'],
    methods:{
        ...mapActions('user', {
            'changePasswordAction': ACTION_CHANGE_PASSWORD,
            'resetState': ACTION_RESET_STATE,
        }),

        onCancel(){
            this.$emit('cpCancelled');
            this.resetState();
        },
        submitForm(){
            this.errors = changePasswordAuthentication(this.section);
            if(Object.keys(this.errors).length == 0)
            {
                this.changePasswordAction(this.section);
            }

        }
    }
}
</script>
