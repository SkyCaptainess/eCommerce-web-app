<template>
  <div class="search">
    <h1>Search Result</h1>
    <el-row>
      <el-col :span=20 :offset=2>
        <simpletable :tableData="searchTable"></simpletable>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
import simpletable from '@/components/searchtable.vue';

export default {
  components:{
    simpletable
  },
  created(){
    this.getresult()
  },
  data(){
    return{
      "title":this.$route.query.title!==undefined?this.$route.query.title:"",
      "brand":this.$route.query.brand!==undefined?this.$route.query.brand:window.btoa("All"),
      "price":this.$route.query.price!==undefined?this.$route.query.price:window.btoa(localStorage.maxprice),
      "searchTable":""
    }
  },
  watch:{
    "$route.query"(newval,oldval){
      
      if (this.$route.path=="/search"){
        window.location.reload()
        this.getresult();
      }
      
            
        
    }
  },
  methods:{
    getresult(){
      let req=""
      if(this.title){
        req=req+"title="+this.title+"&"
      }
      if(this.brand!==window.btoa("All")){
        req=req+"brand="+this.brand+"&"
      }
      req=req+"price="+this.price
      axios.get("http://localhost:3000/api/phone/search-list?"+req).then(res=>{
        // console.log(res.data)
        this.searchTable=res.data.data
      }).catch(()=>{
        console.error("backend error")
      })
      
    }
  }
  

}
</script>

<style>

</style>