<template>
    <div class="tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="课程公告" name="first"></el-tab-pane>
            <el-tab-pane label="在线测试" name="second"></el-tab-pane>
            <el-tab-pane label="作业" name="third"></el-tab-pane>
            <el-tab-pane label="资源" name="fourth"></el-tab-pane>
            <el-tab-pane label="讨论区" name="fifth"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.value.name);
      }
    }
  };
</script>

<style scoped>

</style>
