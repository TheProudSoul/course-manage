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
      },
      nameToId:[{"courseware":0},{"exam":1},{"experiment":2},{"reference":3}]
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
      resourceList: 'getResourceList',
      types: 'getTypeName',
      typeResources: 'getResourceByType'
    })
  },
  created() {
    this.$store.dispatch('resource/fetchResource');
  },
  methods: {
    download() {
      let downloadPath = '/file/v1/resource/file/'
      let file_ids = this.$refs.tree.getCheckedKeys(true)
      let want = this.$refs.tree.getCheckedKeys()
      want.forEach(element => {
        if(this.types.includes(element)){
          file_ids = file_ids.concat(this.typeResources(this.types.indexOf(element)))
        }
      })
      file_ids = [...new Set(file_ids.sort())]
      // 获取下载链接
      let link = []
      for (let i = 0; i < file_ids.length; i++){
        link[i] = downloadPath + file_ids[i]
      }
      const zip = new JSZip()
      const cache = {}
      const promises = []
      link.forEach(item => {
        console.log(item)
        const promise = this.$http('get',item,{}, {responseType: 'arraybuffer'}).then(res=>{
        const arr_name = item.split("/")
        const file_name = arr_name[arr_name.length - 1] // 获取文件名
        zip.file(file_name, res.data, { binary: true }) // 逐个添加文件
        cache[file_name] = res.data
      })
        promises.push(promise)
      })
      console.log(promises.length)
      const tmp = Promise.all(promises)
      tmp.then(()=>{
        zip.generateAsync({type:"blob"}).then(content => { // 生成二进制流
            FileSaver.saveAs(content, "resources.zip") // 利用file-saver保存文件
        })
      })
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
