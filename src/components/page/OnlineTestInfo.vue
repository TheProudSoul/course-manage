<template>
    <div class="content">
      <div>
        <el-button class="btn-return" icon="el-icon-arrow-left" circle style="align-content: left; float: left"></el-button>
        <h3 class="title" style="font-size: 24px; margin-top: 10px; margin-bottom: 15px">第一章作业详情</h3>
      </div>
      <hr color="gold"/>
      <div class="desc">
        <div class="desc-title">内容：</div><div class="desc-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
          Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate
          , felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</div>
      </div>
      <div class="date">
        <p class="date-title">截止日期：</p>
        <p class="date-content">2018/12/2</p>
      </div>
      <div class="answer">
        <p class="answer-title">回答：</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5}"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <div class="button">
        <el-button class="add-file">上传附件</el-button>
        <el-button class="submit">提交</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      textarea2: ''
    }
  }
}
</script>

<style scoped>
  .btn-return,
  .title{
    display: inline-block;
  }
  .btn-return{
    margin-top: 10px;
    margin-left: 5px;
  }
  .desc-title,
  .desc-content{
    display: inline-block;
  }
  .answer,
  .date,
  .desc{
    text-align: left;
    margin-top: 20px;
    margin-left: 220px;
    margin-right: 220px;
    font-size: 18px;
  }
  .desc-content{
    margin-top: 10px;
    margin-left: 5px;
  }
  .date-content,
  .date-title{
    display: inline-block;
  }
  .date-content{
    padding-top: 4px;
  }
  .answer-title{
    margin-bottom: 10px;
  }
  .button{
    margin-top: 30px;
    text-align: right;
    margin-right: 220px;
  }
  .add-file,
  .submit{
    background: cornflowerblue;
    color: #fff;
    font-size: 13px;
  }
</style>
