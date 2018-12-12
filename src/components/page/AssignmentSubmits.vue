<template>
  <div class="content">
    <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
    <el-table ref="submitTable" :data="submitList" highlight-current-row @current-change="getSubmit" style="width: 100%">
    <el-table-column property="student_no" label="学号" width="400"></el-table-column>
    <el-table-column property="student_name" label="学生姓名" width="350"></el-table-column>
    <el-table-column property="mark" label="分数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed:{
    ...mapGetters('assignment', {
      submitList: 'getSubmitList'
    })
  },
  created () {
    this.$store.dispatch('assignment/fetchSubmits', this.$route.params.assign_id)
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    getSubmit(val){
      //先找val.submit_id的数据传入store
      this.$store.dispatch("assignment/fetchSubmit", val.submit_id);
      //然后push进去详情页
      this.$router.push({
        name: 'assignmentSubmit',
        params:{
          course: this.$route.params.course,
          assign_id: this.$route.params.assign_id,
          submit_id: val.submit_id
        }
      })
    }
  }
};
</script>
