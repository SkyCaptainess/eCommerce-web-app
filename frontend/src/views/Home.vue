<template>
  <div class="home" >
    <h2> Best sellers </h2>
    <el-skeleton style="width: 70%;margin: 0 auto;height:295.25px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding-top:25px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="h1" style="width: 70%;" />
        <el-skeleton-item variant="h2" style="width: 40%;margin-top:8px"/>
        <div>
          <div style="display:inline-block; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px; width:25%">
            <el-skeleton-item variant="h3" style="width: 60%;"/>
            <el-skeleton-item variant="text" style="width: 50%;" />
          </div>
          <div style="padding: 14px; width:37.5%; display:inline-block;">
            <el-skeleton-item
              variant="image"
              style="width: 150px; height: 150px;margin:auto;"
            />
          </div>
          <div
            style="display:inline-block; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px; width:25%"
          >
            <el-skeleton-item variant="h3" style="margin-right: 16px;"/>
            <el-skeleton-item variant="text" style="width: 45%;" />
          </div>
        </div>
      </template>
      <template #default>
        <el-row class="carousel" type="flex" justify="center" align="middle">
          <el-col :span="18" :offset="0">
            <el-carousel :initial-index=0  :interval=curspeed height="320px" ref="hotCarousel">
                <el-carousel-item   trigger="click" v-for="item in hottableData" :key="item">
                  <item-page :id=item._id :rating=item.avgRating></item-page>
                </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
    
    <h2> Sold out soon </h2>
    <el-skeleton style="width: 70%;margin: 0 auto;height:295.25px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding-top:25px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="h1" style="width: 70%;" />
        <el-skeleton-item variant="h2" style="width: 40%;margin-top:8px" />
        <div>
          <div style="display:inline-block; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px; width:25%">
            <el-skeleton-item variant="h3" style="width: 60%;"/>
            <el-skeleton-item variant="text" style="width: 50%;" />
          </div>
          <div style="padding: 14px; width:37.5%; display:inline-block;">
            <el-skeleton-item
              variant="image"
              style="width: 150px; height: 150px;margin:auto;"
            />
          </div>
          <div
            style="display:inline-block; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px; width:25%"
          >
            <el-skeleton-item variant="h3" style="margin-right: 16px;"/>
            <el-skeleton-item variant="text" style="width: 45%;" />
          </div>
        </div>
      </template>
      <template #default>
        <el-row class="carousel" type="flex" justify="center" align="middle">
          <el-col :span="18" :offset="0">
            <el-carousel :initial-index=0  :interval=curspeed height="320px" ref="hotCarousel">
                <el-carousel-item   trigger="click" v-for="item in leasttableData" :key="item">
                  <item-page :id=item._id :rating=item.avgRating></item-page>
                </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script >
import { defineComponent } from 'vue';

import axios from 'axios';
import itemPage from '../components/itempage.vue'; 

export default defineComponent({
  
  name: 'Home',
  components:{
    itemPage
  },
  mounted(){
    
    this.gethotdata()
    this.getleastdata()
    setTimeout(()=>{
      this.loading=false
    },1000)
    // this.$refs.leastCarousel.setActiveItem(1)
    // this.$refs.hotCarousel.setActiveItem(1)
    
  },
  data(){
    return{
        "leasttableData":[],
        "hottableData":[],
        "speed":3000,
        "loading":true,
    }
  },
  computed:{
    curspeed(){
      return this.speed
    }
  },
  methods:{
    gethotdata(){  
      axios.get("http://localhost:3000/api/phone/hot-list").then(res=>{
        console.log(res.data.data)
        // console.log(res.data.data)
        let hot=res.data.data
        for(let i in hot){
          hot[i]["avgRating"]=hot[i]["avgRating"]%1==0?hot[i]["avgRating"]:parseFloat(hot[i]["avgRating"].toFixed(2))
        }
        this.hottableData= hot
        // console.log(this.tableData)
        
      }).catch(res=>{
          console.error("Backend server error")
      })
      // console.log(this.tableData)
    },
    getleastdata(){
      axios.get("http://localhost:3000/api/phone/least-list").then(res=>{
        
        let l=res.data.data
        this.leasttableData=l
        // console.log(this.leasttableData)
        
      }).catch(res=>{
          console.log(res)
          console.error("Backend server error")
      })
    },
    getusername(id){
      console.log(id)
      const result={"firstname":"Anita","lastname":"Simpson"}
      return `${result.firstname} ${result.lastname}`
    },
    addcart(ind,row){
      this.tableData[ind]["visible"]=false
      this.order.title=row.title
      console.log(this.order)
    },

    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'first';
        } else if (rowIndex === 1) {
          return 'second';
        }
        else if (rowIndex === 2) {
          return 'third';
        }
        return '';
    }
  }
})
</script>
<style>
  .el-carousel__container {
    width: 70%;
    margin: auto;
  }

  .el-carousel__item:nth-child(2n) {
      /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border: 1px; */

      margin: auto;

  }

  .el-carousel__item:nth-child(2n+1) {
      margin:0 auto;
      /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border: 1px; */

      

  }

  /* .el-table .first {
    background: rgba(248, 108, 52, 0.418);
  }

  .el-table .second {
    background: rgb(253, 141, 36, 0.418);
  }

  .el-table .third {
    background: rgb(253, 202, 36, 0.418);
  } */
</style>