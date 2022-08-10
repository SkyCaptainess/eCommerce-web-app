<template>
  <div id="app"  >
    <el-dialog
        title="Notice"
        v-model="dialogVisible"
        width="30%">
        <span>Log out?</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="this.logout()">Confirm</el-button>
          </span>
        </template>
    </el-dialog>
      <el-row id="header" :gutter="20" type="flex" justify="space-between" align="middle">
        <el-col :span="4" :offset="0">
          <el-button type="text" @click="backhome"><h1 id="brand">Phone Zone</h1></el-button> 
          <!-- <span style="font-size:38px;font-weight:bold" @click="backhome()">Phone Zone</span> -->
        </el-col>

        <el-col :span="13" :offset="1" v-if="showSearchbar">
          <el-row :gutter="10">
              <el-col :span="3" v-if="showSearchbar">
                <el-select v-model="brand" placeholder="Brand" ref=showSelect>
                  <el-option 
                    v-for="item in brandoptions" 
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="16" :offset="0">         
              <el-row :gutter="20">
                <el-popover
                  placement="top-start"
                  :width="600"
                  trigger="manual"
                  v-model:visible="this.shown"  
                >
                  <el-row v-show="this.shown" :gutter="20"  type="flex" justify="center" align="middle">
                    <el-col :span="4" :offset="0">
                      <span>Max Price </span>
                    </el-col>
                    <el-col :span="16" :offset="0">
                      <el-slider @mouseover="this.changeVisiable()"
                        v-model="price"
                        :max="maxprice"
                        :min="minprice">
                      </el-slider>
                    </el-col>               
                  </el-row>
                  <template #reference>
                    <el-input v-model="title" placeholder="Search" clearable  @click="this.shown=!this.shown" @mouseover="this.changeVisiable()"></el-input>
                  </template>
                </el-popover>
              </el-row>
            </el-col>

            <el-col :span="3" :offset="0" v-if="showSearchbar">
                <el-button v-on:click="search()">search</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col v-else :span="13" :offset="1"></el-col>
        
        <el-col :span=6 :offset=0>
          <div class="header-right">
              <div class="header-user-con">
                <div class="user-avator">
                    <img src="./assets/logo.png" />
                </div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                      <i class="el-icon-caret-bottom">{{username}}</i>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item  divided v-if="logged===false" command="signin">Sign In</el-dropdown-item>
                      <el-dropdown-item v-if="logged===false" command="signup">Sign Up</el-dropdown-item>
                      <el-dropdown-item v-if="logged===true" command="profile">your profile</el-dropdown-item>
                      <el-dropdown-item v-if="logged===true" command="checkout">checkout page</el-dropdown-item>
                      <el-dropdown-item divided v-if="logged===true" command="signout">Sign Out</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>&nbsp;&nbsp;&nbsp;
                <el-button id="cart-button" type="text" icon="el-icon-shopping-bag-2" @click="tocart"></el-button>
                <!-- <el-button @click="tocart()" type="text" size="large" icon="el-icon-shopping-cart-2"></el-button> -->
                <span v-if="this.logged">&nbsp;&nbsp;({{number}})</span>
            </div>
          </div>
        </el-col>
      </el-row>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { defineComponent } from 'vue'
import {fitreg} from './services/fitreg'
export default defineComponent({
  // setup() {
  mounted(){
      this.price=this.getmaxprice()
      this.getminprice()
      this.brandoptions=this.getbrand()
      
      window.addEventListener('storage', e=> {
        if(e.key && e.key == 'path' && e.newValue){
          this.path = e.newValue 
        }     
      })
       window.addEventListener('unload', this.saveState,true)
       window.addEventListener("load", this.deleteState,true)
  },
  computed: {
    path() {
        // console.log(this.$store.state.user.path)
        return this.$store.state.user.path
    },
    username(){
      return this.$store.state.user.islog?this.$store.state.user.userProfile.firstname+" "+this.$store.state.user.userProfile.lastname:"visiter"
    }
  },
  watch: {
    path:{
      immediate: true,
      handler(newval,oldval){
        if(newval!=="/"&&newval!=="/item"&&newval!=="/search"){
          this.showSearchbar=false
        }else{
          this.showSearchbar=true
        }
      },deep:true
    },

    "$store.state.user.islog":{
      immediate:true,
      handler(newval,oldval){
        if(newval===true){
          this.logged=true
          // console.log(this.$store.state.user.userProfile.firstname+" "+this.$store.state.user.userProfile.lastname)
        }
        else{
          this.logged=false
          this.username="visiter"
        }
      }
    },
    "$store.state.user.cart":{
      immediate:true,

      handler(newval,oldval){
        console.log(newval)
        let num=0;
        for (let item in newval){
            num=num+newval[item].phoneNumber
        }
        this.number=num
      }
    }
  },
  data(){
    return{
      "title":"",
      "brand":"All",
      "brandoptions":["All"],
      "search_result":"",
      "price":2,
      "maxprice":10,
      "minprice":0,
      "shown":false,
      "showSearchbar":true,
      "logged":false,
      "number":0,
      "dialogVisible":false,
    }
  },
  methods:{
    tocart(){
      if (this.$store.state.user.islog==false){
        ElMessage('Please login first!')
        setTimeout(()=>this.$router.push({ name: 'Signin'}),1000)
      }
      else{this.$router.push({path:"/user/checkout"})}
      
    },
    saveState(){
      sessionStorage.setItem('state', JSON.stringify(this.$store.state.user))
    },
    deleteState(){
        sessionStorage.clear()
    },
    changeVisiable(){
      setTimeout(()=>{
          this.shown=false
          this.$refs.showSelect.blur()
      }, 3000)
      
    },
    backhome(){
      this.$router.push({ name: 'Home'})
    },
    search(){
      this.shown=false
      console.log(this.title)
      console.log(this.brand)
      console.log(this.price)

      this.$router.push({ name: 'Search', query: { "title": window.btoa(fitreg(this.title)),"brand":window.btoa(this.brand),"price":window.btoa(this.price)}})
      
      //router go to search with prop
    },
    login(){
      // console.log(this.$store.state.user  )
      this.$router.push({ name: 'Signin'})
    },
    logout(){
      this.dialogVisible=false
      this.$store.dispatch("user/userSignout")
      this.$router.push({ name: 'Home'})
    },
    signup(){
       this.$router.push({ name: 'Signup'}) 
    },
    profie(){
      this.$router.push({name:"User"})
    },
    handleCommand(command){
      if (command==="signin"){
        this.login()
      } else if(command==="signout"){
        this.dialogVisible=true
      } else if(command==="signup"){
        this.signup()
      } else if(command==="profile"){
        this.profie()
      } else if(command==="checkout"){
        this.tocart()
      }
    },
    getbrand(){

      // console.log(this.$store.state.user.path)
      axios.get("http://localhost:3000/api/phone/brandlist").then(res=>{

        let brandlist=res.data.data
        brandlist.splice(0, 0, "All");
        this.brandoptions=brandlist
        return brandlist
      }).catch(res=>{
        console.error("Backend Error")
      })
      
      
    },
    getmaxprice(){
      // console.log("price")
      axios.get("http://localhost:3000/api/phone/maxprice").then(res=>{
        this.price=this.maxprice=res.data.data[0].maxprice
        localStorage.maxprice=res.data.data[0].maxprice
      }).catch(()=>{
        console.error("Backend Error")
      })
    },
    getminprice(){
      axios.get("http://localhost:3000/api/phone/minprice").then(res=>{
        console.log(res.data)
        this.minprice=res.data.data[0].minprice
      }).catch(()=>{
        console.error("Backend Error")
      })
    }
  },
  unmounted() {

    window.removeEventListener('unload', this.saveState,true);
    window.removeEventListener("load", this.deleteState,true);


},
})
</script>

<style >
body{
  width: 100%;
  height: 100%;
  margin:0;
}
#brand{
  font-size:3em;
  color: #FFFFFF;
}
#searchbar{
  display: inline;
}
#app{
  font-family:"Avenir", "Helvetica", "Arial", "sans-serif";
  text-align:center;
  color:#2c3e50;
  margin: 0;
  padding: 0;
  /* position:fixed;
  top: 0%;
  left: 0%;
  right: 0%; */
  }

#header {
  color:aliceblue;
  align-items: center;
  background-color:#2470BC;
}
#cart-button{
  font-size: 2.5em;
  color: aliceblue;
}
#cart-button:hover{
  color: #67C23A;
}
.header-user-con {
    display: flex;
    align-items: center;
}



.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
    border: 1px solid aliceblue;
    border-radius: 100%;
    background-color: aliceblue
}
.user-avator img {
    display: block;
    width:45px;
    height: 45px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: aliceblue;
    font-size: 1.2em;
    cursor: pointer;
}
.el-dropdown-link:hover{
  color: #67C23A;
}
.el-dropdown-menu__item {
    text-align: center;
}
.el-card__body {
    position:relative;
    z-index: 1000;
    background-color: rgb(255, 255, 255);
  } 
</style>
