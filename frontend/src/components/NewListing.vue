<template>
    <el-row :gutter="10" type="flex" align="middle" justify="center">
        <el-col :xs="16" :sm="16" :md="16" :lg="12" :xl="12" :offset="0">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <el-row :gutter="10">
                    <el-col :span="6" :offset="0">
                        <h3>New Listing:</h3>
                    </el-col>
                </el-row>
                <el-form :model="listing" label-width="60px" label-position="left">
                        
                        <el-row :gutter="20">
                            <el-col :span="6" :offset="0" class="image">
                                <i class="el-icon-camera" style="font-size: 4em;"></i>
                            </el-col>
                            
                            <el-col :span="18" :offset="0">
                                <el-form-item label="Title:">
                                    <el-input v-model="listing.title"></el-input>
                                    <p class="error" v-if="errors.title"> {{errors.title}} </p>
                                </el-form-item>
                                <el-row :gutter="10">
                                    <el-col :span="12" :offset="0">
                                        <el-form-item label="Brand:">
                                            <el-input v-model="listing.brand"></el-input>
                                            <p class="error" v-if="errors.brand"> {{errors.brand}} </p>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="10">
                                    <el-col :span="6" :offset="0">
                                    <el-form-item label="Price: $">
                                            <el-input type="number" v-model="listing.price"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="0">
                                    <el-form-item label="Stock:">
                                            <el-input-number size="small" v-model="listing.stock"></el-input-number>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        
                        <el-row :gutter="20" type="flex" align="middle" justify="center">
                            <el-col :span="6" :offset="0">                        
                                <el-button @click="onCancel">Cancel</el-button>
                            </el-col>
                            <el-col :span="6" :offset="0">
                                <el-button type="primary" @click="submitListing">Confirm</el-button>
                                </el-col>
                        </el-row>
                        
                        <el-alert v-if="bShowResult" :type="alertType" :closable="false"> {{responseMsg}} </el-alert>

                </el-form>
            </el-card>
        </el-col>       
    </el-row>
</template>

<script>
import {ACTION_SHOW_NEWLISTING, ACTION_SUBMIT_NEWLISTING} from '../store/storeconstants';
import {mapActions,mapState} from 'vuex'
import {newListingAuthentication} from '../services/auth'
export default {
    data(){
        return{
            listing: {
                title:"",
                brand:"",
                image:"",
                stock: 1,
                disabled:"disabled",
                price: 0,
            },
            errors:[],
        }
    },
    computed:{
        ...mapState('user',{
            bRequestSuccess: state => state.success,
            responseMsg : state => state.responseMsg,
            bShowResult: state => state.showResult,
        }),
        alertType: function(){
            return this.bRequestSuccess?'success':'error';
        },
    },
    methods:{
        ...mapActions('user', {
            "actionShowNewListing": ACTION_SHOW_NEWLISTING,
            "actionSubmitListing" : ACTION_SUBMIT_NEWLISTING,
        }),
        // handleAvatarSuccess(res, file) {
        //     this.listing.image = URL.createObjectURL(file.raw)
        // },
        // beforeAvatarUpload(file) {
        //     const isJPG = file.type === 'image/jpeg';
        //     const isLt2M = file.size / 1024 / 1024 < 2;

        //     // if (!isJPG) {
        //     // this.error='Avatar picture must be JPG format!';
        //     // }
        //     // if (!isLt2M) {
        //     // this.error='Avatar picture size can not exceed 2MB!';
        //     // }
        //     return isJPG && isLt2M
        // },
        onCancel(){
            this.actionShowNewListing(false);
        },
        submitListing(){
            this.errors= newListingAuthentication(this.listing);

            if(Object.keys(this.errors).length === 0)
            {
                console.log(this.errors)
                this.actionSubmitListing(this.listing);
            }
        }
    },

}
</script>

<style scoped>

    /* .avatar-uploader {
        border: 1px dashed #bdbdbd;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin: 4px;
        min-width: 150px;
        min-height: 100px;
    }; */
    .image{
        border: 2px dotted grey;
        height: auto;
    };
    .el-icon-camera{
        text-align: center;
    }
    i{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 25%
    }
</style>

/*  
requestBody: {
    "disabled": "disabled",
    "title": "Ernest NB 2000",
    "brand": "Ernest",
    "image": "imageurl",
    "stock": 5,
    "price": 248.99
}

},*/