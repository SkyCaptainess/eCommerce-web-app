<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
            <el-row :gutter="20" type="flex" align="middle" justify="center">
                <el-col :span="6" :offset="0">
                    <el-image :src="item.checkoutItem.image"></el-image>
                </el-col>
                <el-col :span="18">
                    <el-row :gutter="20" justify="space-around">
                        <el-col :span="18" :offset="0">
                            <div card="card-header">
                                <p><strong>{{item.checkoutItem.title}}</strong></p>
                            </div>
                        </el-col>
                        <el-col :span="6" :offset="0">
                            <p>Price: <strong>${{item.checkoutItem.price}}</strong></p>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" align="middle" justify="space-around">
                        <el-col :span="4" :offset="0">
                            <p>Amount:</p>
                        </el-col>
                        <el-col :span="4" :offset="0">
                            <!-- <p>{{item.phoneNumber}}</p> -->
                            <el-select v-model="amount" @change="onAmountChange">  
                                <el-option v-for="num in checkoutAmount.slice(0,6)" :key="num.value" :label="num.label" :value="num.value">
                                    <span style="color: #8492a6;">{{ num.label }}</span>
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" :offset="0" >
                            <el-popconfirm title="Are you sure to delete this?" @confirm="emitRemoveEvent">
                                <template #reference>
                                    <el-button type="danger" icon="el-icon-delete" size="small" plain round >Remove</el-button>
                                </template>
                            </el-popconfirm>
                            <!-- <el-button type="danger" icon="el-icon-delete" @click="onClickRemove" size="small" plain round>Remove</el-button> -->
                        </el-col>
                        <el-col :span="4" :offset="4">
                            <div :class="item.phoneState?'checkbox-checked':'checkbox-unchecked'" @click="emitCheckEvent"> <i class="el-icon-check checkbox"></i></div>
                        </el-col>
                        
                    </el-row>
                    
                </el-col>
                <el-col :span="3" :offset="0">
                </el-col>
            </el-row>
    </el-card>
</template>


<script>
export default {
    props:{
        item: Object,  
    },
    emits:['updateItem', 'removeItem', 'toggleCheckbox',],
    data(){
        return {
            bAmountGreaterThanStock:false,
            bDoublecheckRemove:false,
            amount: this.item.phoneNumber,
        }
    },

    computed:{
        checkoutAmount: function(){
            let res = [];
            res.push({value: 0, label: "0 (delete)"});
            for(let i = 1; i <= this.item.checkoutItem.stock; i++)
            {
                res.push({value:i, label:`${i}`});
            }
            return res;
        },

    },
    updated(){
            // console.log("Item Updated: "+ this.item.checkoutItem.title);
            this.amount = this.item.phoneNumber;
    },
    methods:{
        emitRemoveEvent(){
            this.$emit("removeItem", {"_id": this.item.checkoutItem._id});
        },
        onAmountChange(){
            if(this.amount === 0)
                this.emitRemoveEvent();
            else{
                this.emitUpdateAmount();
            }
        },
        emitUpdateAmount(){
            // console.log("Emit update amount");
            this.$emit("updateItem", {"_id": this.item.checkoutItem._id, "itemnumber":this.amount});
        },
        emitCheckEvent(){
            console.log(this.item);
            // this.checked = !this.checked;
            this.$emit("toggleCheckbox",{"_id":this.item.checkoutItem._id,"checkstate":!this.item.phoneState});
        },
    }
}
</script>

<style scoped>

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
.el-img{
    background-color: aliceblue;
    min-width: 100%;
    min-height: 100%;
}
/* .checkbox{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    font-size: 3em;
    color:#FFFFFF;
} */
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