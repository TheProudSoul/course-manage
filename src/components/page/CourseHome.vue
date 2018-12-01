<template>
  <div class="content">
    <div class="course-box">
      <h1 class="course-name">{{course_name}}</h1>
      <h3>简介：</h3>
      <p class="p">{{course_intro}}</p>
      <h3>授课教师：</h3>
      <p class="p">{{teacher_name}}</p>
      <h3 class="course-time">上课时间：</h3>
      <p style="margin: 5px">{{time_slot}}</p>
      <h3 class="course-place">课室：</h3>
      <p style="margin: 5px">{{building}}-{{room}}</p>
    </div>
    <hr class="hr" color="#ffd700">
    <div class="course-box">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通知</span>
      </div>
      <div v-for="notice in notices" :key="notice.notice_id" class="text item">
        <i class="fa fa-comment"></i>
        <span style="margin-left: 10px">{{notice.title}}</span>
      </div>
    </el-card>
      <!-- <el-table :data="tableData">
        <el-table-column label="通知">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices:'',
      course_id:'',
      course_name:'',
      course_intro:'',
      course_credit:'',
      school:'',
      section_week:'',
      time_slot:'',
      building:'',
      room:'',
      teacher_id:'',
      teacher_name:''
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http("get", "/notice").then(res => {
        console.log(res);
        this.notices = res.data.notice;
        console.log(this.notices);
      });
      this.$http("get", "/section").then(res => {
        console.log(res);
        this.notices = res.data.notice;
        this.course_id = res.data.course_id;
        this.course_name = res.data.course_name;
        this.course_intro = res.data.course_intro;
        this.course_credit = res.data.course_credit;
        this.school = res.data.school;
        this.section_week = res.data.section_week;
        this.time_slot = res.data.time_slot;
        this.building = res.data.building;
        this.room = res.data.room;
        this.teacher_id = res.data.teacher_id;
        this.teacher_name = res.data.teacher_name;
        console.log(this.teacher_name);
      });
    }
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

/* 通知 */
.text {
  font-size: 14px;
  text-align: left;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 100%;
}
</style>
