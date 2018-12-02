<template>
  <div>
    <vHead></vHead>
    <vSidebar :courses="courses"></vSidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import vSidebar from '../common/Sidebar'
import vHead from '../common/Header'
export default {
  data () {
    return {
      courses: this.$route.params.course
    }
  },
  components: {
    vSidebar,
    vHead
  }
}
</script>
