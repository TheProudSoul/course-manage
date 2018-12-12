<template>
  <div class="content">
    <!-- 返回键 -->
    <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submit_id: 1,
      student_no: "201630661234",
      content: "答案....",
      mark: 98
    };
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    setMark() {}
  }
};
</script>
