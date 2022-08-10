<template>
    <el-container>
        <el-header height="100px">
            <el-row :gutter="20" type="flex" align="middle" justify="center">
                    <h2 class="title">Checkout</h2>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="20" type="flex" align="middle" justify="center">
                <el-col :span="12" :offset="0">
                    <el-card shadow="never">
                        <el-row :gutter="20">
                            <el-col :span="24" :offset="0">
                                <div class="subtotal">Subtotal: <b>$ {{subtotal}}</b></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" align="middle" justify="center">
                            <el-col :span="6" :offset="0">                        
                                <el-button type="primary" @click="confirmTransaction">Proceed to payment</el-button>
                            </el-col>
                            <el-col :span="6" :offset="0">
                                <el-button type="primary" plain @click="returnToPreviousPage">Continue shopping</el-button>
                            </el-col>
                        </el-row>

                    </el-card>   
                </el-col> 
            </el-row>
            <el-row :gutter="20" type="flex" align="middle" justify="center">
                <el-col :span="12" :offset="0">
                    <el-alert v-if="bShowResult" :type="alertType" :closable="false"> {{responseMsg}} </el-alert>
                </el-col>
            </el-row>
            <el-row class="items" v-if="isEmpty" :gutter="20" type="flex" align="middle" justify="center">
                <el-col :span="12" :offset="0">
                    <el-card class="box-card" shadow="never">
                        <p>Your cart is empty!</p>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="items" v-else :gutter="20" type="flex" align="middle" justify="center" v-for="item in cart" :key="item.id">
                <el-col :span="12" :offset="0">
                    <CheckoutItem :item="item" @remove-item="removeItem" @update-item="updateAmount" @toggle-checkbox="toggleCheckbox"/>
                    <!-- <CheckoutItem :item="item" @remove-item="removeItem" @update-item="updateAmount" @toggle-checkbox="toggleCheckbox" @amount-changed="handleAmountChanged"/> -->
                </el-col>
            </el-row>
        </el-main>
    </el-container>
    <!-- <el-row class="items" :gutter="20" type="flex" align="middle" justify="center">
        <el-button type="primary" plain @click="returnToPreviousPage">Continue shopping</el-button>
    </el-row> -->
    
        
</template>
<script>
import CheckoutItem from './CheckoutItem.vue';
import {ACTION_GET_CART, ACTION_REMOVE_CARTITEM, ACTION_MODIFY_CHECKOUTAMOUNT, ACTION_SELECT_CHECKOUTITEM, ACTION_CONFIRM_TRANSATION} from '../store/storeconstants';
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
        }
    },
    components:{
        CheckoutItem,
    },
    computed:{
        ...mapState('user',{
            cart: state => state.cart,
            subtotal: state => state.subtotal,
            bShowResult: state => state.showResult,
            bSuccess: state => state.success,
            responseMsg: state => state.responseMsg,
        }),
        alertType: function(){
            return this.bSuccess?'success':'error';
        },
        isEmpty: function(){
            return this.cart.length === 0;
        },
        checkAll: function(){
            let res = true;
            for(let item of this.cart)
                res &= item.checked;
            return res;
        },
    },
    mounted(){
        this.getCartInfo();
    },
    methods: {
        ...mapActions('user', {
            'getCartInfo': ACTION_GET_CART,
            "actionRemoveItem": ACTION_REMOVE_CARTITEM,
            "actionModifyItemAmount": ACTION_MODIFY_CHECKOUTAMOUNT,
            "actionSelectCheckoutItem": ACTION_SELECT_CHECKOUTITEM,
            "actionConfirmTransaction": ACTION_CONFIRM_TRANSATION,
        }),
        removeItem(id){
            // console.log("Remove checkout item");
            // console.log(id);

            this.actionRemoveItem(id);
            this.getCartInfo();
        },
        updateAmount(data){
            this.actionModifyItemAmount(data);
            this.getCartInfo();

        },
        returnToPreviousPage(){
            this.$router.go(-1)
        },
        toggleCheckbox(data){
            console.log(data)
            this.actionSelectCheckoutItem(data);
        },
        confirmTransaction(){
            let data = []; 
            console.log(this.cart);
            for(let item of this.cart)
            {
                if(item.phoneState)
                {
                    data.push({"_id": item.checkoutItem._id, "itemnumber": item.phoneNumber});
                }
            }
            this.actionConfirmTransaction(data);
        },
        // handleAmountChanged(){
        //     console.log("+++++++++");
        //     let total = 0
        //         for(let item of this.cart)
        //         {
        //             total += item.checked ? item.checkoutItem.price * item.phoneNumber : 0;
        //         }
        //     this.subtotal=total;
        // }
        
    }
}
</script>

<style scoped>
.el-card div{
    padding: 10px;
}
.items{
    padding: 8px;
};
.subtotal{
    font-size: 2em;
    margin: 16px;
}
.title{
    font-size: 2.5em;
}

.checkbox-checked{
    display: flex;
    justify-content: center;
    align-items: center;
    width:60px;
    height:60px;
    /* width:100%; */
    font-size: 3em;
    color:#FFFFFF;
    background-color: #409EFF;
}
.checkbox-unchecked{
    display: flex;
    justify-content: center;
    align-items: center;
    width:54px;
    height:54px;
    /* width:100%; */
    font-size: 3em;
    color:#FFFFFF;
    border: 3px solid #409EFF;
}

</style>
