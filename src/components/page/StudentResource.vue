<template>
  <div class="content">
    <el-tree
      show-checkbox
      :load="fetchReourseList"
      lazy
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    ></el-tree>
    <div class="buttons" align="right">
      <el-button @click="getCheckedKeys" class="download">下载</el-button>
      <el-button @click="resetChecked" class="clear">清空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resourceList: [
        {
          id: 1,
          label: "上课PPT",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "往年试卷",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "实验",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    fetchReourseList(node, resolve) {
      if (node.level === 0) {
        return resolve([
          { name: "课件" },
          { name: "试卷" },
          { name: "实验资料" },
          { name: "参考资料" }
        ]);
      }
      var type;
      if (node.data.name === '课件') {
          type = 0;
        } else if (node.data.name === '试卷') {
          type = 1;
        } else if (node.data.name === '实验资料') {
          type = 2;
        } else {
          type = 3;
        }
      // this.$http("get","/resource",)
    }
  }
};
</script>
<style>
.content {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 100px;
  font-size: 24px;
}
.buttons {
  margin-top: 50px;
  margin-right: 120px;
}

.clear,
.download {
  padding-left: 30px;
  padding-right: 30px;
  background: cornflowerblue;
  color: #fff;
  font-size: 13px;
}
.el-tree-node__content {
  margin-bottom: 10px;
}
</style>
