<template>
  <div class="sidebar">
    <el-menu
      default-active="home"
      class="el-menu-vertical-demo"
      active-text-color="#9F7D64"
      @select="handleOpen"
    >
      <el-menu-item index="home" class="el-menu-item" route="home">
        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item v-for="course in courses" :key="course.section_id" :index="course.section_id" class="el-menu-item">
        <i class="fa fa-book fa-2x" aria-hidden="true"></i>
        <span>{{course.course_title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import bus from "../common/bus";
import CourseHomeVue from "../page/CourseHome.vue";
export default {

  props: ["courses"],
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$http("get", "/section").then(res => {
  //       console.log(res);
  //       vm.courses = res.data.course;
  //       // console.log(this.notices);
  //     });
  //   });
  // },
  methods: {
    // fetchData() {
    //   this.$http("get", "/section").then(res => {
    //     console.log(res);
    //     this.courses = res.data.course;
    //     // console.log(this.notices);
    //   });
    // },
    handleOpen(key, keyPath) {
      if (key != "home") {
        this.$router.push({
          name: "coursehome",
          params: {
            course: key
          }
        });
      } else {
        this.$router.push("/home");
      }
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo {
  text-align: left;
}
.sidebar {
  width: 230px;
  height: 100%;
  position: absolute;
  top: 100px;
  background: #fff;
  align-items: center;
}
.el-menu-item {
  padding-left: 30px;
  font-size: 16px;
  margin-top: 10px;
}
</style>
