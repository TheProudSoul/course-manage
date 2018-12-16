<template>
  <div class="tabs">
    <el-tabs stretch type="card" @tab-click="handleClick">
      <el-tab-pane label="课程公告" name="coursehome"></el-tab-pane>
      <el-tab-pane label="在线测试" name="onlinetest"></el-tab-pane>
      <el-tab-pane label="作业" name="assignment"></el-tab-pane>
      <el-tab-pane label="资源" name="resource"></el-tab-pane>
      <el-tab-pane label="讨论区" name="fifth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {

  methods: {
    handleClick(tab, event) {
      this.$router.push({
        name: tab.name,
        params: {
            course: this.$route.params.course
          }
      })
    }
  }
}
</script>

<style scoped>
.tabs {
  background: #ffd700;
  height: 50px;
}
</style>
