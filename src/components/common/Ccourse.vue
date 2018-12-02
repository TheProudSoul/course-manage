<template>
    <div class="content-box">
      <vTabs :course_id="course_id"></vTabs>
      <router-view></router-view>
    </div>
</template>

<script>
import vTabs from '../common/Tabs'
export default {
  data() {
    return {
      course_id: this.$route.params.course,
    };
  },
  components: {
    vTabs
  }
}
</script>
