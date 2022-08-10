<template>
    <div>
        <el-table  :max-height=750 :data="tableData" style="width: 95%" >
            <el-table-column type="expand">
            <template #default="scope">
                <item-page :id=scope.row._id></item-page>
            </template>
            </el-table-column>
            <el-table-column :width=250 label="Name" prop="title" :formatter="formatTitle"></el-table-column>
            <el-table-column label="Availabe Stock" prop="stock">

            </el-table-column>
            <el-table-column label="Price" prop="price" :formatter="formatPrice"></el-table-column>
            <!-- <el-table-column label="add to cart">
            <template #default="scope">
                <el-popover
                placement="top"
                :width="140"
                v-model:visible="scope.row.visible"
                > 
                <div style="text-align: center">
                    <p style="margin:0">Please Confirm</p>
                    <el-input-number size="small" v-model="order.numbook" :min="1" :max=scope.row.stock label="number" ></el-input-number> 
                    <div style="margin-top:5px">
                    <el-button size="mini" type="text" @click="scope.row.visible = false">no</el-button>    &nbsp;&nbsp;&nbsp;
                    <el-button type="primary" size="mini" @click="addcart(scope.$index,scope.row)">ok</el-button>
                    </div>
                </div>
                <template #reference>
                    <el-button>add</el-button>
                </template>
                </el-popover>
            </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>
<script>

import itemPage from '@/components/itempage.vue'; // @ is an alias to /src
export default {
    props:["tableData"],
    components: {
        itemPage
    },
    methods:{
        formatTitle(row,col,str){
            str=str.split("*")[0]
            return str.length>30?str.slice(0,27)+"...":str
        },
        formatPrice(row,col,num){
            num="$"+num
            return num
        },
    }
}
</script>
