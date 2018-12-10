<template>
  <h1>{{title}}</h1>
  <!-- 按钮统一为“确认” -->
  <!-- 使用input动态绑定value -->
</template>

<script>
export default {
  data() {
    return {
      assignmentInfo: {
        assign_id: ""
        // 去api看看
      }
    };
  },
  created(){
console.log(this.$route.params.assign_id)
  },
  computed: {
    title() {
      if (this.$route.params.operation == "add") {
        return "添加作业";
      } else {
        return "修改作业";
      }
    }
  }
};
</script>