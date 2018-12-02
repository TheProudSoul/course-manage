<template>
    <div class="content-box">
      <vTabs></vTabs>
      <router-view></router-view>
    </div>
</template>

<script>
import vTabs from '../common/Tabs'
export default {
  components: {
    vTabs
  }
}
</script>
