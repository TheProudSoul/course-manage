<template>
  <div>
    <vHead></vHead>
    <vSidebar></vSidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import vSidebar from "../common/Sidebar";
import vHead from "../common/Header";
export default {
  components: {
    vSidebar,
    vHead
  }
};
</script>
