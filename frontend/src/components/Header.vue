<template>
  <el-header>
    <el-row>
      <el-col :span="3" :offset="0"><h1>PhoneZone</h1></el-col>
        <el-col :span="18" :offset="0">
          <el-input placeholder="Please input" v-model="input3" class="input-with-select">
            <template #prepend>
              <el-select v-model="select" placeholder="Brand">
                
              </el-select>
            </template>
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
    </el-row>
  </el-header>
</template>


<style scoped>
  .el-header{
    background: #2060bb;

  }
  .el-row {
    margin-bottom: 20px;
  }

</style>

<script>
import {defineComponent, ref} from 'vue';
export default defineComponent ({
  setup(){
    return {
      input: ref('')
    }
  }
});
</script>
