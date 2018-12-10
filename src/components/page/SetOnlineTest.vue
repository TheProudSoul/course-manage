<template>
  <h1>{{title}}</h1>
  <!-- 按钮统一为“确认” -->
  <!-- 使用input动态绑定value -->
</template>

<script>
export default {
  data() {
    return {
      testInfo: {
        test_id: "",
        title: "",
        content: "",
        start_time: "",
        end_time: "",
        file_id: "",
        file_name: ""
      }
    };
  },
  computed: {
    title() {
      if (this.$route.params.operation == "add") {
        return "添加在线测试";
      } else {
        return "修改在线测试";
      }
    }
  }
};
</script>
