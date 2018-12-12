<template>
    <div class="content-box">
      <vTabs v-if="!isAdmin"></vTabs>
    <router-view></router-view>
    </div>
</template>

<script>
import vTabs from '../common/CourseTabs'
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('login', {
      isStudent: 'isStudent',
      isTeacher: 'isTeacher',
      isAdmin: 'isAdmin',
    })},
  components: {
    vTabs
  }
}
</script>
