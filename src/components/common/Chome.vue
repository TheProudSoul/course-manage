<template>
  <div>
    <vHead></vHead>
    <vSidebar :courses="courses"></vSidebar>
      <router-view></router-view>
  </div>
</template>

<script>
import vSidebar from "../common/Sidebar";
import vHead from "../common/Header";
export default {
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.courses = this.$route.params.course
  },
  components: {
    vSidebar,
    vHead,
  }
};
</script>