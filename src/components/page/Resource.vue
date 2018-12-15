<template>
  <div class="content">
    <el-tree
      show-checkbox
      :load="fetchReourseList"
      lazy
      node-key="file_id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      empty-text="empty"
    ></el-tree>
    <div class="buttons" align="right">
      <el-button v-show='isTeacher' @click="handleAdd" class="download">发布</el-button>
      <el-button @click="download" class="download">下载</el-button>
      <el-button v-show='isTeacher' @click="handleDelete" class="download">删除</el-button>
      <el-button @click="resetChecked" class="clear">清空</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default {
  data() {
    return {
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
    }),
    ...mapGetters('resource', {
      resourceType:'getResourceType',
      resourceList: 'getResourceList'
    })
  },
  created() {
    this.$store.dispatch('resource/fetchResource');
  },
  methods: {
    download() {
      let downloadPath = '/file/v1/resource/file/'
      // let file_ids = this.$refs.tree.getCheckedKeys(true)
      // let want = this.$refs.tree.getCheckedKeys()
      let want_nodes = this.$refs.tree.getCheckedNodes()
      if(want_nodes.length==0){
        this.$notify({
          title: '警告',
          message: '你并没有选中任何内容！',
          type: 'warning'
        });
      }else{
        let fileToDownload = []
        want_nodes.forEach(element=>{
          if(this.resourceType.includes(element)){
            if(fileToDownload.length==0){
              fileToDownload = this.resourceList[element.type_id]
            }else{
              fileToDownload = fileToDownload.concat(this.resourceList[element.type_id])
            }
          }else {
            if(!fileToDownload.includes(element)){
              fileToDownload.push(element)
            }
          }
        })
        const zip = new JSZip()
        const cache = {}
        const promises = []
        fileToDownload.forEach(item => {
          console.log(item)
          const promise = this.$http('get', downloadPath + item.file_id, {}, {responseType: 'arraybuffer'}).then(res=>{
          const file_name = item.res_name // 获取文件名
          zip.file(file_name, res.data, { binary: true }) // 逐个添加文件
          cache[file_name] = res.data
        })
          promises.push(promise)
        })
        Promise.all(promises).then(()=>{
          zip.generateAsync({type:"blob"}).then(content => { // 生成二进制流
              FileSaver.saveAs(content, "resources.zip") // 利用file-saver保存文件
          })
        })
      }
    },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    fetchReourseList(node, resolve) {
      if (node.level === 0) {
        return resolve(this.resourceType);
      }
      if (node.data.res_name === "课件") {
        resolve(this.resourceList[0])
      } else if (node.data.res_name === "试卷") {
        resolve(this.resourceList[1])
      } else if (node.data.res_name === "实验资料") {
        resolve(this.resourceList[2])
      } else {
        resolve(this.resourceList[3])
      }
    },
    handleAdd(){

    },
    handleDelete(){
      
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
