<template>
  <div class="content">
    <el-tree
      show-checkbox
      :load="fetchReourseList"
      lazy
      node-key="res_id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    ></el-tree>
    <div class="buttons" align="right">
      <el-button v-show='isTeacher' @click="handleAdd" class="download">发布</el-button>
      <el-button @click="getCheckedKeys" class="download">下载</el-button>
      <el-button v-show='isTeacher' @click="handleDelete" class="download">删除</el-button>
      <el-button @click="resetChecked" class="clear">清空</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      resourceList: [],
      defaultProps: {
        label: "res_name",
        isLeaf: "leaf"
      }
    };
  },
  computed: {
    ...mapGetters('login', {
      isStudent: 'isStudent',
      isTeacher: 'isTeacher',
      isAdmin: 'isAdmin',
    })
  },
  methods: {
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    fetchReourseList(node, resolve) {
      if (node.level === 0) {
        return resolve([
          { res_name: "课件" },
          { res_name: "试卷" },
          { res_name: "实验资料" },
          { res_name: "参考资料" }
        ]);
      }
      var type;
      if (node.data.res_name === "课件") {
        type = 0;
      } else if (node.data.res_name === "试卷") {
        type = 1;
      } else if (node.data.res_name === "实验资料") {
        type = 2;
      } else {
        type = 3;
      }
      this.$http("get", "/resource", {
        sec_id: this.$route.params.course,
        type: type
      }).then(res => {
        this.resourceList = res.data.resource;
      });

      setTimeout(() => {
        this.resourceList.forEach(resource=>{
          resource.leaf= true;
        })
        resolve(this.resourceList);
      }, 500);
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
