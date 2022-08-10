<template>
    <div class="review_box" v-if="this.review">
        <el-card>
            <p>id :{{review.reviewer}}</p>
            <el-rate
                v-model="review.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
            <p> 
                <span>{{shortcom}}</span>
                <el-link v-if="review.comment.length>200" @click.prevent="load()" >{{loaded?" close":" show more"}}</el-link>
            </p>
        </el-card>
        
    </div>
</template>

<script>

export default {
    props:["rev"],
    data(){
        return{
            "review":this.rev,
            "loaded":false
        }
    },
    
    computed:{
        shortcom(){
            if (this.loaded===false){
                return this.review.comment.length>200?this.review.comment.slice(0,197)+"...":this.review.comment
            }else{
                return this.review.comment
            }
        }
    },
    methods:{
        load(){
            this.loaded=!this.loaded
        }
    }
    
    
}
</script>

<style>
    .review_box{
        text-align: left;
    }
    .el-card {
    min-width: 100%;
    height: 100%;
    margin-right: 20px;
    transition: all .5s;
  }
</style>