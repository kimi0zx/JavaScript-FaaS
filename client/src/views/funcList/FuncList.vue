<template>
  <div class="func-list">
    <el-form
      :inline="true"
      :model="filterForm"
      class="func-search-form"
      size="small"
    >
      <div>
        <el-form-item label="Name">
          <el-input
            class="func-search-input"
            v-model="filterForm.namespace"
            placeholder="Name of the Function"
          ></el-input>
        </el-form-item>
        <el-form-item label="Function ID">
          <el-input
            class="func-search-input"
            v-model="filterForm.id"
            placeholder="ID of the Function"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="queryFunc" class="func-search-button">
          Search
        </el-button>
      </el-form-item>
    </el-form>
    <divider color="#ebeef5"></divider>
    <item-header text="Function List"></item-header>
    <el-table :data="tableData" class="func-table">
      <el-table-column prop="id" label="Function ID" :width="180"> </el-table-column>
      <el-table-column prop="author" label="Author" :width="300">
      </el-table-column>
      <el-table-column prop="namespace" label="Name" :width="180">
      </el-table-column>
      <el-table-column prop="description" label="Description">
        <template #default="scope">
          <div class="cell">{{ scope.row.options.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="API Keypoint" :width="200">
        <template #default="scope">
          <el-popover
            popper-class="func-url"
            placement="top-end"
            trigger="hover"
            :width="600"
            :content="`[${scope.row.options.allowMethod.join(
              '] ['
            )}] ${baseUrl}exec/${scope.row.id}`"
          >
            <template #reference>
              <el-button type="text" size="small"> Get API Keypoint </el-button>
            </template>
          </el-popover>
          <el-button type="text" size="small" @click="editFunc(scope.row)">
            Edit
          </el-button>
          <!-- <el-button type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Divider from "../../components/Divider.vue";
import ItemHeader from "../../components/ItemHeader.vue";
import { LOCAL_STORAGE_VISITOR_KEY } from "../../utils/figurePrint";
import { getFuncList } from "../../service/func";
import { ROUTER_MAP } from "../../router/constant";
import { FAAS_BASE_URL } from "../../service/axios";

export default {
  components: { Divider, ItemHeader },
  name: "FuncList",
  data() {
    return {
      filterForm: {
        namespace: "",
        id: "",
      },
      tableData: [],
      baseUrl: FAAS_BASE_URL,
    };
  },
  methods: {
    queryFunc() {
      const _this = this;
      getFuncList({
        author: window.localStorage.getItem(LOCAL_STORAGE_VISITOR_KEY),
        namespace: _this.filterForm.namespace,
        id: _this.filterForm.id,
      }).then((res) => {
        _this.tableData = res.data.data.funcs;
      });
    },
    editFunc(row) {
      this.$store.commit("setFuncId", row.id);
      this.$router.push(ROUTER_MAP[1]);
    },
  },
  mounted() {
    this.queryFunc();
  },
};
</script>

<style scoped>
.func-list {
  width: 100vw;
  margin: 0 auto;
}
.func-search-form {
  padding: 19px 20px 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.func-search-input {
  width: 20vw;
  margin-right: 40px;
}
.func-search-button {
  width: 75px;
}
.func-table {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  margin: 0 20px 40px 20px;
  width: calc(100% - 40px);
}
.func-url {
  text-align: center !important;
}
</style>