<template>
  <div>
    <vHead></vHead>
    <vSidebar></vSidebar>
    <div class="content-box">
      <vTabs></vTabs>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import vSidebar from "../common/Sidebar";
import vHead from "../common/Header";
import vTabs from "../common/Tabs";
export default {
  components: {
    vSidebar,
    vHead,
    vTabs
  }
};
</script>
