<template>
     <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <el-form  :model="dialog">
            <h3>Please enter your password:</h3>
            <el-form-item>
                <el-input type="password" v-model="dialog.password"> </el-input>
            </el-form-item>
            <el-button type="primary" @click="verifyPassword">Confirm</el-button>
            <el-button type="info" plain @click="onCancel">Cancel</el-button>
        </el-form>
    </el-card>
</template>

<script>
import {ACTION_CHECK_PASSWORD, ACTION_RESET_STATE} from '../store/storeconstants';
import {mapActions,} from 'vuex';
export default {
    data(){
        return {
            dialog:{
                password:"",
            },
        }
    },
    computed: {
        // ...mapState('user',{
        //     // profileState: state => state.userProfile,
        //     bRequestSuccess: state => state.success,
        //     responseMsg : state => state.responseMsg,
        //     bShowResult: state => state.showResult,
        // }),

    },
    methods:{
        ...mapActions('user', {
            "checkPassword": ACTION_CHECK_PASSWORD,
            "resetState": ACTION_RESET_STATE,
        }),
        verifyPassword(){
            this.checkPassword(this.dialog);
        },
        onCancel(){
            this.dialog.password = "";
            this.$emit('closeDialog');
            this.resetState();
        }
    },
    // emits:['closeDialog'],
    
}
</script>
