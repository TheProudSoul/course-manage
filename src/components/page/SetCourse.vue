<template>
  <div class="content">
    <div>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <h3 class="title" style="font-size: 24px; margin-top: 10px; margin-bottom: 15px">添加课程</h3>
      <hr color="#d3d3d3" style="margin-bottom: 10px; margin-top: 5px"/>
    </div>
      <el-form label-width="150px">
        <el-form-item label="课程编号：" required>
          <el-select v-model="course_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程学分：" required>
          <el-input-number v-model="credit" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="开课年份：" required>
          <el-date-picker v-model="year" type="year" placeholder="选择开课年份"></el-date-picker>
        </el-form-item>
        <el-form-item label="开课学期：" required>
          <el-select v-model="semester" placeholder="请选择开课学期">
            <el-option label="上学期" value="1"></el-option>
            <el-option label="下学期" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间：" required>
        </el-form-item>
        <el-form-item label="开课周：" required>
        </el-form-item>
        <el-form-item label="上课教学楼：" required>
        </el-form-item>
        <el-form-item label="上课教教室：" required>
        </el-form-item>
        <el-form-item label="授课老师：" required>
          <el-select v-model="course_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>      

      <div class="buttons" align="center">
        <el-button @click="submit" class="submit">确认</el-button>
        <el-button @click="clear" class="clear">清空</el-button>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import _ from "lodash";

const mapFields = (namespace, fields) => {
  return _.mapValues(fields, path => {
    return {
      get() {
        return _.get(this.$store.state[namespace], path);
      },
      set(value) {
        this.$store.commit(`${namespace}/updateUser`, { path, value });
      }
    }
  })
}

export default {
  data() {
    return {

    }
  },
  computed:{
    ...mapFields("admin", {
      course_id: "courseInfo.course_id",
      credit: "courseInfo.credit",
      year: "courseInfo.year",
      semester: "courseInfo.semester",
      time_slot: "courseInfo.time_slot",
      week: "courseInfo.week",
      building: "courseInfo.building",
      room: "courseInfo.room",
      teacher_id: "courseInfo.teacher_id",
    }),
    ...mapGetters("admin",{
      courseList: 'getCourseList',
      courseInfo: 'getCourseInfo'
    })
  },
  created(){
    this.$store.dispatch("admin/fetchCourseList", this.params.school_id)
    this.$store.dispatch("admin/fetchTeacherList", this.params.school_id)
  },
  methods: {
    submit() {
      this.$http("post", "/currican/test_submit", courseInfo).then(res=>{

      })
    },
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.content-box {
  margin-right: 30px;
}
.desc,
.date,
.time,
.where,
.teacher {
  text-align: left;
  margin-top: 30px;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 18px;
}
.id-content,
.credit-content,
.year-content,
.semester-content,
.time-content,
.week-content,
.building-content,
.classroom-content,
.teacher-content {
  margin-left: 120px;
}
.id-c {
  width: 300px;
}
.clear,
.confirm {
  padding-left: 30px;
  padding-right: 30px;
  background: cornflowerblue;
  color: #fff;
  font-size: 13px;
}
</style>