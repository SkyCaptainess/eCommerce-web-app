<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <h2>User Profile</h2>
        <el-descriptions :column="2" border> 
            <el-descriptions-item label="Firstname">{{userProfile.firstname}}</el-descriptions-item>
            <el-descriptions-item label="Lastname">{{userProfile.lastname}}</el-descriptions-item>
            <el-descriptions-item label="E-mail">{{userProfile.email}}</el-descriptions-item> 
        </el-descriptions>

    </el-card>
</template>

<script>
import {ACTION_GET_USER_PROFILE,ACTION_GET_CART} from '../store/storeconstants';
import {mapState} from 'vuex'
export default {
    props:{
        // profile: Object,
    },
    computed: {
        ...mapState('user',{
            userProfile: state => state.userProfile,
        })
    },
    mounted(){
        this.$store.dispatch(`user/${ACTION_GET_USER_PROFILE}`);
        this.$store.dispatch(`user/${ACTION_GET_CART}`);

    }
}
</script>

