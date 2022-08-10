<template>
    <div class="item">
        <el-row>
            <el-col :span=10 :offset=1>
                <br>
                <br>  
                <el-image
                    style="width: 400px; height: 400px"
                    :src="detail.image"
                    fit="contain">
                </el-image>
            </el-col>
            <el-col :span=12>
                <div style="text-align:left">
                    <h1 >{{this.detail.title}}</h1>
                    <p>Brand:<router-link :to='{name:"Search",query:{"brand":this.base64brand}}'>{{this.detail.brand}}</router-link></p>
                    <p style="color:gray">by {{this.detail.seller}}</p> 
                    <p> Rest Stock: {{this.detail.stock}}</p>
                    <p> Price: ${{this.detail.price}}</p>
                    <el-input-number  v-model="numbook" :min="1" :disabled="this.detail.stock==0" :max=this.detail.stock label="number" ></el-input-number> 
                    <el-button @click="addcart()">add cart</el-button>
                </div>
            </el-col>
        </el-row>
        <h4>comments</h4>
        <div v-if="detail.reviews!=undefined&&detail.reviews.length!==0">
            <el-scrollbar height="360px">
                <template  v-for="index in this.currpos" :key="index">
                    <el-row :gutter=30>
                        <el-col :offset=3 :span=6>
                            <commentbox :v-if="this.detail!=undefined&&detail.reviews[3*(index-1)+0]!=undefined" :rev="detail.reviews[3*(index-1)+0]"></commentbox>
                        </el-col>
                        <el-col :span=6>
                            <commentbox :v-if="this.detail!=undefined&&detail.reviews[3*(index-1)+1]!=undefined" :rev="detail.reviews[3*(index-1)+1]"></commentbox>
                        </el-col>
                        <el-col :span=6>
                            <commentbox :v-if="this.detail!=undefined&&detail.reviews[3*(index-1)+2]!=undefined" :rev="detail.reviews[3*(index-1)+2]"></commentbox>
                        </el-col>
                    </el-row>
                </template>
                
                <el-link v-if="this.detail.reviews!=undefined&&currpos*3<this.detail.reviews.length" @click.prevent="load()">show more</el-link>
            
            </el-scrollbar>
        </div>
        <p v-if="this.detail.reviews==undefined||this.detail.reviews.length==0">no comments</p>
  </div>
</template>

<script >
import axios from 'axios'
import {ACTION_GET_CART} from '../store/storeconstants';
import { ElMessage } from 'element-plus'
import commentbox from '../components/reviewbox'
export default {
    components:{
        commentbox
    },
    computed:{
        base64brand(){
            return window.btoa(this.detail.brand)
        }
    },
    created(){

        this.id=this.$route.query.id


    },
    mounted(){
        this.getdetail()

        // console.log(this.detail.reviews[3*(this.currpos-1)+2]!=undefined)
        // console.log(this.detail.reviews.length===0)
        // this.geturl()
    },
    data(){
        return{
            "shortrev":[],
            "currpos":1,
            "title":"NULL",
            "detail":[],
            "rating":4.3,
            "seller": "daniel",
            "numbook":1,
            "loading":false
        }
    },
    methods:{

        getdetail(){

            // console.log(title)
            axios.get("http://localhost:3000/api/phone/iteminfo?_id="+this.id).then(res=>{
                this.detail=res.data.data
            }).catch(res=>{
                console.error("Backend Error")
            })

        },
        getusername(c){
            // axios.get("")
            return `${c.seller}`
        },
        addcart(){
            let data={"_id":this.detail._id,"itemnumber":this.numbook}
            axios.defaults.withCredentials = true;
            axios.post("http://localhost:3000/api/cart/addtocheckoutlist",data)
            .then(res=>{
                console.log(res)
                if(res.data.errno==10003){
                    ElMessage('Please login first!')
                    setTimeout(()=>this.$router.push({ name: 'Signin'}),1500)
                    
                }
                else if(res.data.errno==10008){
                    ElMessage("You have already added this item")
                }
                else{
                    this.$store.dispatch(`user/${ACTION_GET_CART}`);
                }
            })
            
        },
    
        load(){
            if (this.detail.reviews!=undefined&&this.detail.reviews.length!==0){
                if(this.currpos*3<this.detail.reviews.length){
                    this.currpos+=1
                }
                
            } 
        }
    }
}
</script>
<style>

    .el-row {
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap
    }


</style>