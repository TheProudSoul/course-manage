<template>
  <div class="content">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    ></el-tree>
    <div class="buttons">
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>



<script>
  export default {
    methods: {
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },

    data() {
      return {
        data: [{
          id: 1,
          label: '上课PPT',
          children: [{
            id: 4,
            label: '二级 1-1'
          }]
        }, {
          id: 2,
          label: '往年试卷',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '课外阅读',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>