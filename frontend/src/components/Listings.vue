<template>
<div v-if="!bShowNewListing" >
    <el-row :gutter="20" type="flex" align="middle" justify="center">
        <el-col :span="6" :offset="0">    
            <h2>User Listings</h2>
        </el-col>
        <el-button type="primary" size="large" icon="el-icon-plus" circle @click="newListing"></el-button>
    </el-row>
    <el-row :gutter="20" type="flex" align="middle" justify="center">
        <el-col :xs="16" :sm="16" :md="16" :lg="12" :xl="12" :offset="0">
            <el-alert v-if="bShowResult&&bShowNewListing" :type="alertType" :closable="false"> {{responseMsg}} </el-alert>
        </el-col>
    </el-row>
    <el-row class="listing" :gutter="20" type="flex" align="middle" justify="center" v-for="listing in userListings" :key="listing.id">
        <el-col :xs="16" :sm="16" :md="16" :lg="12" :xl="12" :offset="0">
            <Listing v-if="listing" :listing="listing" @remove-listing="removeListing" @update-listing="submitUpdate"/>
        </el-col>
    </el-row>

</div>

<NewListing v-else/>


</template>

<script>
import Listing from "./Listing.vue";
import NewListing from "./NewListing.vue";

import {ACTION_GET_USER_LISTINGS, ACTION_USER_MANAGELISTING, ACTION_SHOW_NEWLISTING, ACTION_REMOVE_LISTING} from '../store/storeconstants';
import {mapState,mapActions} from 'vuex'
export default {
    name: 'Listings',
    data(){
        return {
            // bShowNewListing: false,
        }
    },
    components:{
        Listing,
        NewListing,
    },
    mounted(){
        this.$store.dispatch(`user/${ACTION_GET_USER_LISTINGS}`)
    },
    computed:{
        ...mapState('user', {
            userListings: state => state.listings,
            bShowNewListing: state => state.bShowNewListing,
            bRequestSuccess: state => state.success,
            responseMsg : state => state.responseMsg,
            bShowResult: state => state.showResult,
        }),
        alertType: function(){
            return this.bRequestSuccess?'info':'error';
        },
    },
    methods:{
        ...mapActions('user', {
            "actionUpdateListing": ACTION_USER_MANAGELISTING,
            "actionShowNewListing": ACTION_SHOW_NEWLISTING,
            "actionRemoveListing":ACTION_REMOVE_LISTING,
        }),
        submitUpdate: function(data){
            console.log("[manage listing]")
            this.actionUpdateListing(data);
        },
        newListing: function(){
            this.actionShowNewListing(true);
            // this.bShowNewListing = true;
        },
        removeListing: function(data){
            this.actionRemoveListing(data);
        }

    }
}
</script>

<style scoped>
    .listing{
      margin: 10px;
  }
</style>
