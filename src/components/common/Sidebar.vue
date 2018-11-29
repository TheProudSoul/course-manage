<template>
  <div class="sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router>
      <el-menu-item index="home">
        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item v-for="(item, index) in courses" :key="index" index="coursehome">
        <i class="fa fa-book fa-2x" aria-hidden="true"></i>
        <span slot="title">{{item.courseName}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import bus from "../common/bus";
export default {
  data() {
     return {
      // 需要从后台请求？
      courses: [{
        courseId: '2',
        courseName: '数据结构'
      },
      {
        courseId: '3',
        courseName: '操作系统'
      },
      {
        courseId: '4',
        courseName: '计算机组成'
      },
      {
        courseId: '5',
        courseName: '数据库'
      }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push("/");
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
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
  padding-left: 20px;
  /* margin-left: 1rem;
  margin-right: 1rem; */
  font-size: 16px;
  margin-top: 10px;
}
</style>

