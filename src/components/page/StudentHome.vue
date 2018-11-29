<template>
  <div class="wrapper">
    <vHead></vHead>
    <vSidebar></vSidebar>
    <div class="content-box">
      <div class="content">
        <el-table :data="tableData">
          <el-table-column label="通知">
            <template slot-scope="scope">
              <!-- http://www.fontawesome.com.cn/icons-ui/ -->
              <!-- <i class="fa fa-info-circle" aria-hidden="true"></i>
              <i class="fa fa-sticky-note" aria-hidden="true"></i> -->
              <i class="fa fa-comment"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import vSidebar from "../common/Sidebar";
import vHead from "../common/Header";
import vTabs from "../common/Tabs";

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02"
        },
        {
          date: "2016-05-04"
        },
        {
          date: "2016-05-01"
        },
        {
          date: "2016-05-03"
        }
      ]
    };
  },
  components: {
    vSidebar,
    vHead,
    vTabs
  }
};
</script>