<template>
  <div class="sidebar">
    <el-menu
      default-active="home"
      class="el-menu-vertical-demo"
      active-text-color="#9F7D64"
      router
    >
      <el-menu-item index="/home" class="el-menu-item">
        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
        <span class="icon">主页</span>
      </el-menu-item>
      <el-menu-item v-for="item in items" :key="item.id" :index="item.path+'/'+item.id" class="el-menu-item">
        <i :class="item.icon" aria-hidden="true"></i>
        <span class="icon">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters('sidebar', {
      items: 'getSidebarItems'
    })
  },
  created() {
    this.$store.dispatch('sidebar/getData');
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  text-align: left;
}
.icon{
  position: fixed;
  left: 60px;
  font-weight: bold;
  font-size: 18px;
  color: #606266
}
.sidebar {
  width: 220px;
  height: 100%;
  position: absolute;
  top: 100px;
  background: #fff;
  align-items: center;
}
.el-menu-item {
  padding-left: 30px;
  font-size: 14px;
  margin-top: 5px;
}
</style>
