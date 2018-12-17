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
      empty-text="empty"
    ></el-tree>
    <div class="buttons" align="right">
      <el-button v-show="isTeacher" @click="handleAdd" class="download">上传</el-button>
      <el-button @click="download" class="download">下载</el-button>
      <el-button v-show="isTeacher" @click="handleDelete" class="download">删除</el-button>
      <el-button @click="resetChecked" class="clear">清空</el-button>
    </div>

    <!-- 上传文件弹出框 -->
    <el-dialog title="上传资源文件" :visible.sync="uploadVisible">
        <span>资源类型：</span>
        <el-select v-model="params.res_type" placeholder="请选择资源类型">
          <el-option label="课件" value="0"></el-option>
          <el-option label="试卷" value="1"></el-option>
          <el-option label="实验资料" value="2"></el-option>
          <el-option label="参考资料" value="3"></el-option>
        </el-select>
        <div class="block">
          <el-upload 
            ref="upload" 
            class="upload-demo" 
            :on-success="handleSuccess" 
            :on-error="handleError" 
            drag 
            :action="uploadUrl" 
            :data="params" 
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
          </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import JSZip from "jszip";
import FileSaver from "file-saver";

export default {
  data() {
    return {
      uploadVisible: false,
      defaultProps: {
        label: "res_name",
        isLeaf: "leaf"
      },
      downloadPath: "/currican/resource/file?id=",
      uploadUrl: 'http://120.79.191.54:8081/currican/resource',
      params: {
        action: 'post',
        res_type: "",
      }
    }
  },
  computed: {
    ...mapGetters("login", {
      isStudent: "isStudent",
      isTeacher: "isTeacher",
      isAdmin: "isAdmin"
    }),
    ...mapGetters("resource", {
      resourceType: "getResourceType",
      resourceList: "getResourceList"
    })
  },
  created() {
    this.$store.dispatch("resource/fetchResource");
  },
  methods: {
    download() {
      // let file_ids = this.$refs.tree.getCheckedKeys(true)
      // let want = this.$refs.tree.getCheckedKeys()
      let want_nodes = this.$refs.tree.getCheckedNodes();
      if (want_nodes.length == 0) {
        this.$notify({
          title: "警告",
          message: "你并没有选中任何内容！",
          type: "warning"
        });
      } else {
        let fileToDownload = [];
        want_nodes.forEach(element => {
          if (this.resourceType.includes(element)) {
            if (fileToDownload.length == 0) {
              fileToDownload = this.resourceList[element.type_id];
            } else {
              fileToDownload = fileToDownload.concat(
                this.resourceList[element.type_id]
              );
            }
          } else {
            if (!fileToDownload.includes(element)) {
              fileToDownload.push(element);
            }
          }
        });
        const zip = new JSZip();
        const cache = {};
        const promises = [];
        fileToDownload.forEach(item => {
          const promise = this.$http("get", this.downloadPath + item.res_id, {}, { responseType: "arraybuffer" }).then(res => {
            const file_name = item.res_name; // 获取文件名
            zip.file(file_name, res.data, { binary: true }); // 逐个添加文件
            cache[file_name] = res.data;
          });
          promises.push(promise);
        });
        Promise.all(promises).then(() => {
          zip.generateAsync({ type: "blob" }).then(content => {// 生成二进制流
            FileSaver.saveAs(content, "resources.zip"); // 利用file-saver保存文件
          });
        });
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
        resolve(this.resourceList[0]);
      } else if (node.data.res_name === "试卷") {
        resolve(this.resourceList[1]);
      } else if (node.data.res_name === "实验资料") {
        resolve(this.resourceList[2]);
      } else {
        resolve(this.resourceList[3]);
      }
    },

    handleAdd() {
      this.uploadVisible = true;
    },
    handleSuccess(res, file, fileList){
      if(res.status==1){
        this.$notify.error({
          title: '错误',
          message: `啊哦~文件“${file.name}”上传失败了！`
        })
      }else{
        this.$notify({
          title: '成功',
          message: `文件“${file.name}”上传成功拉！`,
          type: 'success'
        });
      }
    },
    handleError(err, file, fileList){
      this.$notify.error({
        title: '错误',
        message: `啊哦~文件“${file.name}”上传失败了！`
      })
    },
    upload() {
      if(this.params.res_type==''){
        this.$notify.error({
          title: '错误',
          message: "您没有选择资源类型哦~"
        })
      }else{
      this.$refs.upload.submit()        
      }

      // let formData = new FormData()
      // let fileObject = param.file      
      // // formData.append('file', fileObject)
      // formData.append("res_type", this.res_type)
      // formData.append("action", "post")

      // this.$http("post","/file/currican/resource", formData, {contentType: 'multipart/form-data'}).then(res=>{
      //   console.log(res)
      // })
    },
    
    handleDelete() {
      let want_nodes = this.$refs.tree.getCheckedNodes();
      if (want_nodes.length == 0) {
        this.$notify({
          title: "警告",
          message: "你并没有选中任何内容！",
          type: "warning"
        })
      } else {
        let fileToDelete = [];
        want_nodes.forEach(element => {
          if (this.resourceType.includes(element)) {
            if (fileToDelete.length == 0) {
              fileToDelete = this.resourceList[element.type_id];
            } else {
              fileToDelete = fileToDelete.concat(
                this.resourceList[element.type_id]
              );
            }
          } else {
            if (!fileToDelete.includes(element)) {
              fileToDelete.push(element);
            }
          }
        })
        fileToDelete.forEach(element=>{
          // 真正路径 /currican/resource
          this.$http('post', '/currican/resource', {action:'delete',res_id:element.res_id}).then(res=>{
            if (res.data.status==0){
              this.$notify({
                title: '成功',
                message: `“${element.res_name}”删除成功`,
                type: 'success'
              });
            }else {
              this.$notify.error({
                title: '错误',
                message: `“${element.res_name}”删除失败`
              })
            }
          })
        })
        setTimeout(() => {this.$router.go(0)}, 5000);
      }
    }
  }
};
</script>
<style>
.block{
  margin-top: 20px;
}
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
