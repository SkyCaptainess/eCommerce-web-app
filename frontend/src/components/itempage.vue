<template>
    <div class="item-page">
        <el-card>
            <el-row :gutter="20">
                <el-col :span="10" :offset="0">
                    <el-image
                        style="width: 250px; height: 250px"
                        :src="url"
                        fit="contain">
                    </el-image>
                </el-col>
                <el-col :span="14" :offset="0">
                    <el-row :gutter="0" type="flex" justify="start" align="middle">
                        <h3>{{this.title}}</h3>    
                    </el-row>
                    <el-row :gutter="0" type="flex" justify="start" align="middle">
                        <el-col :span="3" :offset="0"><h4>{{this.detail?this.detail.brand:"null"}}</h4></el-col>
                        <el-col :span="12" :offset="1"><p>Seller: <b>{{this.detail.seller}}</b></p> </el-col>
                        <el-col :span="6" :offset="0"><p>Price: <b>${{this.detail.price}}</b></p></el-col>
                        
                    </el-row>
                    <el-row v-if="this.avgRating" :gutter="20" type="flex" justify="start" align="middle">
                        <el-col :span="3" :offset="0"><p>Rating:</p></el-col>  
                        <el-rate
                            v-model="this.avgRating"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                            >
                        </el-rate>
                    </el-row>   
                    <el-row :gutter="0"  type="flex" justify="start" align="middle">
                        <router-link :to="{ name: 'Item', query: { id: this.id }}">show more-></router-link>
                    </el-row>
                    
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script >
import axios from 'axios'
export default {
    props:["id","rating"],
    computed:{
        base64title(){
            return window.btoa(this.title)
        }
    },
    mounted(){
        // console.log(this.id)
        this.getdetail()
        this.avgRating=this.rating
        console.log("end loading")
    },
    data(){
        return{
            "title":"",
            "avgRating":5,
            "url":"https://img2.baidu.com/it/u=2557787792,3932716405&fm=26&fmt=auto&gp=0.jpg",
            "detail":[],
            // "seller":this.getusername(this.content),
            "seller":"daniel",
        }
    },

    methods:{
        getdetail(){
            
            if (this.id){

                axios.get("http://localhost:3000/api/phone/iteminfo?_id="+this.id).then(res=>{
                        this.detail=res.data.data
                        this.url=res.data.data.image
                        this.title=res.data.data.title

                }).catch(()=>{
                    console.error("Backend Error")
                })
            }
        },
        getusername(c){
            
            return `${c.seller}`
    }
    }
}
</script>

<style>

</style>