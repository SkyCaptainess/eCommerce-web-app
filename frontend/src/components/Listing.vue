<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
            <el-row :gutter="20" align="middle" justify="center">
                <el-col :span="1">
                    <div :class="listing.disabled ==='disabled'? 'active' : 'inactive'"></div>
                </el-col>
                <el-col :span="6" :offset="0">
                    <el-image :src="listing.image"></el-image>
                </el-col>
                <el-col :span="14">
                    <el-row :gutter="20">
                        <el-col :span="14" :offset="0">
                            <div card="card-header">
                                <h3>{{listing.title}}</h3>
                            </div>
                        </el-col>
                        <el-col :span="6" :offset="0">
                            <h3>Price: ${{listing.price}}</h3>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="14" :offset="0">
                            <div card="card-header">
                                <p>{{listing.brand}}</p>
                            </div>
                        </el-col>
                        <el-col :span="6" :offset="0">
                            <p>Stock: {{listing.stock}}</p>
                        </el-col>
                    </el-row>
                    
                </el-col>
                <el-col :span="3" :offset="0">
                    <el-row class="button">
                        <el-button :type="buttonType" size="small" plain round @click="onClickActivate">{{buttonText}}</el-button>
                    </el-row>
                    <el-row class="button">
                        <el-button type="danger" icon="el-icon-delete" size="small" plain round @click="onClickRemove">Remove</el-button>
                    </el-row>

                </el-col>
            </el-row>
    </el-card>
    <el-dialog
    title="Alert!"
    v-model="bDoublecheckRemove"
    width="30%"
    :before-close="handleClose">
        <span>Are you sure you want to remove this item?</span>
        
        <el-row :gutter="20">
            <el-col :span="12" :offset="0">
                <el-button @click="bDoublecheckRemove = false">Cancel</el-button>
            </el-col>
            <el-col :span="12" :offset="0">
                <el-button type="primary" @click="onClickDialogRemove">Confirm</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>


<script>
// import {ACTION_USER_MANAGELISTING, } from '../store/storeconstants';
// import {mapActions} from 'vuex'
export default {
    name:"Listing",
    props:{
        listing: Object,  
    },
    emits:['updateListing', 'removeListing'],
    data(){
        return {
            bDoublecheckRemove:false,
            listingActive : false,
            modifiedListing: this.listing,
        }
    },
    computed:{
        buttonType: function(){
            return this.listing.disabled === "disabled" ? "info" : "primary";
        },
        buttonText: function(){
            return this.listing.disabled === "disabled" ? "Deactivate" : "Activate"
        }
    },
    mounted(){
        this.listingActive = this.listing.disabled==="disabled"
    },
    methods:{
        // ...mapActions('user', {
        //     "updateListing": ACTION_USER_MANAGELISTING,
        // }),
        // onclick function to modify a listing. 
        onClickActivate: function (){
            let data = {"disabled": this.listing.disabled==="disabled"? "enabled" : "disabled",
                        "_id": this.listing._id}
            // console.log("[manage listing]")
            // this.updateListing({"disabled": this.listing.disabled==="disabled"? "enabled" : "disabled",
            //                     "_id": this.listing._id});
            this.$emit('updateListing', data);

        },
        onClickRemove: function() {
            this.bDoublecheckRemove = true;
        },
        onClickDialogRemove:function(){
            this.bDoublecheckRemove = false;
            this.$emit('removeListing', {"_id": this.listing._id});
        }
    }
}
</script>

<style scoped>
.button{
    margin: 10px, 10px, 0, 0,
}
.el-col{
    text-align: left;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.active{
    min-height: 100%;
    background: #409EFF;
}
.inactive{
    min-height: 100%;
    background: darkslategrey;
}
.el-button{
    min-width: 100%;
    border-collapse: collapse;
    margin-top:20px;
    margin-bottom: 10px;
}
.el-img{
    background-color: aliceblue;
    min-width: 100%;
    min-height: 100%;
}
</style>

/*  
{
    "title": "Galaxy s III mini SM-G730V Verizon Cell Phone BLUE",
    "brand": "Samsung",
    "image": "imageurl",
    "stock": 9,
    "seller": "5f5237a4c1beb1523fa3db73",
    "price": 56.0,
    "disabled" : "disabled",
    "reviews": [
        {
        "reviewer": "5f5237a4c1beb1523fa3db1f",
        "rating": 3,
        "comment": "Got phone yesterday all ... pleased now!"
        }
    ]
},*/