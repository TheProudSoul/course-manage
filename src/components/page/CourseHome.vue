<template>
  <div class="content">
    <div class="course-box">
      <h1 class="course-name">数据结构</h1>
      <h3>简介：</h3>
      <p
        class="p"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
      <h3 class="course-time">上课时间：</h3>
      <p style="margin: 5px">周一（）</p>
      <h3 class="course-place">课室：</h3>
      <p style="margin: 5px">A2-102</p>
    </div>
    <hr class="hr" color="#ffd700">
    <div class="course-box">
      <el-table :data="tableData">
        <el-table-column label="通知">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
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
      tableData: [
        {
          content: "教务通知",
          date: "2016-05-02"
        },
        {
          content: "教务通知",
          date: "2016-05-04"
        },
        {
          content: "教务通知",
          date: "2016-05-01"
        },
        {
          content: "教务通知",
          date: "2016-05-03"
        }
      ]
    };
  }
};
</script>

<style scoped>
.course-box {
  text-align: left;
  padding-left: 35px;
  margin: 10px;
}
.course-name {
  margin-bottom: 20px;
}
.course-time {
  margin-top: 20px;
}
.course-place {
  margin-top: 20px;
}
.hr {
  margin-left: 30px;
  margin-right: 30px;
}
.p {
  margin-right: 20px;
  margin-top: 5px;
}
</style>
