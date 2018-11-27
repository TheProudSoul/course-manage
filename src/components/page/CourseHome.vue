<template>
        <div class="content">
                <div class="course-box">
                    <h1>数据结构</h1>
                    <h3>简介：</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
                    <h3>上课时间：</h3>
                    <p>周一（）</p>
                    <h3>课室：</h3>
                    <p>A2-102</p>
                </div>
                <div class="course-box">
                    <el-table
                        :data="tableData">
                        <el-table-column
                        label="通知">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
        </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02'
        }, {
          date: '2016-05-04'
        }, {
          date: '2016-05-01'
        }, {
          date: '2016-05-03'
        }]
      }
    }
}
</script>

<style scoped>
.course-box{
    text-align: left;
    padding-top: 10px;
    padding-left: 35px;
}
</style>

