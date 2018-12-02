<template>
  <div class="sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      active-text-color="#9F7D64"
      @select="handleOpen"
      @close="handleClose"
      router>
      <el-menu-item index="home" class="el-menu-item">
        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item v-for="course in courses" :key="course.section_id" index="coursehome" class="el-menu-item">
        <i class="fa fa-book fa-2x" aria-hidden="true"></i>
        <span>{{course.course_title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: ['courses'],
  methods: {
    handleOpen (key, keyPath) {
      this.$router.push('/')
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
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
