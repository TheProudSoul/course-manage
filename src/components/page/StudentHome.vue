<template>
  <div class="content-box">
    <div class="content">
      <el-table :data="notice">
        <el-table-column label="通知">
          <template slot-scope="scope">
            <!-- http://www.fontawesome.com.cn/icons-ui/ -->
            <!-- <i class="fa fa-info-circle" aria-hidden="true"></i>
            <i class="fa fa-sticky-note" aria-hidden="true"></i>-->
            <i class="fa fa-comment"></i>
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course,
      notice
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    // !!!!!!会报错！！！！！！
    this.notice = this.$route.params.notice;
    this.course = this.$route.params.course
    // this.$http("get", "/notice").then(res => {
    //     this.notice = res.data.notice;
    // });
  },
 methods:
 {
   tableRowStyle({ row, rowIndex }) {
      return 'background-color: #F7F6Fd'
    }
 }};
</script>