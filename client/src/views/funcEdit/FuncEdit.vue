<template>
  <div class="func-edit">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="options">
        <template #title>
          <p class="item-header">Function Info</p>
        </template>
        <el-form
          class="func-option"
          :model="funcOptionsForm"
          label-width="180px"
          size="mini"
          label-position="left"
        >
          <el-form-item
            label="Function ID"
            v-show="
              funcOptionsForm.funcId !== '' &&
              funcOptionsForm.funcId !== undefined
            "
          >
            <el-input
              class="form-item"
              v-model="funcOptionsForm.funcId"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="Author">
            <el-input
              class="form-item"
              v-model="funcOptionsForm.author"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input
              class="form-item"
              v-model="funcOptionsForm.funcNameSpace"
              :maxlength="15"
              :disabled="funcOptionsForm.funcId !== ''"
              placeholder="Name of the Function"
            ></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input
              class="form-item"
              v-model="funcOptionsForm.description"
              :maxlength="40"
              placeholder="Function Description"
            ></el-input>
          </el-form-item>
          <el-form-item label="Request Type">
            <el-checkbox-group v-model="funcOptionsForm.allowMethod">
              <el-checkbox label="GET"></el-checkbox>
              <el-checkbox label="POST"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <item-header text="Coding Space"></item-header>
    <div
      :class="
        funcOptionsForm.funcId === '' ? 'func-editor' : 'func-editor-disable'
      "
      ref="editor"
    ></div>
    <el-button
      v-if="funcOptionsForm.funcId === ''"
      class="save-button"
      type="primary"
      @click="saveCode"
    >
      Save
    </el-button>
    <el-button v-else class="save-button" type="primary" @click="updateCode">
      Update
    </el-button>
  </div>
</template>

<script>
import ItemHeader from "../../components/ItemHeader.vue";
import {
  initializeCodeEditor,
  getCodeEditor,
  destoryCodeEditor,
} from "../../utils/editor";
import { LOCAL_STORAGE_VISITOR_KEY } from "../../utils/figurePrint";
import { getFuncList, addFunction, updateFunction } from "../../service/func";

export default {
  name: "FuncEdit",
  components: { ItemHeader },
  data() {
    return {
      activeNames: ["options"],
      funcOptionsForm: {
        funcId: "",
        author: window.localStorage.getItem(LOCAL_STORAGE_VISITOR_KEY),
        funcNameSpace: "",
        timeout: 5000,
        description: "",
        allowMethod: ["GET"],
      },
    };
  },
  mounted() {
    const _this = this;
    const funcId = this.$store.state.funcId;
    if (funcId) {
      getFuncList({
        id: funcId,
      }).then((res) => {
        const currentFunc = res.data.data.funcs[0];
        _this.funcOptionsForm.funcId = currentFunc.id;
        _this.funcOptionsForm.funcNameSpace = currentFunc.namespace;
        _this.funcOptionsForm.timeout = currentFunc.options.timeout;
        _this.funcOptionsForm.description = currentFunc.options.description;
        _this.funcOptionsForm.allowMethod = currentFunc.options.allowMethod;
        initializeCodeEditor(this.$refs.editor, currentFunc.content);
      });
    } else {
      initializeCodeEditor(this.$refs.editor);
    }
  },
  beforeUnmount() {
    this.$store.commit("setFuncId", "");
    destoryCodeEditor();
  },
  methods: {
    checkInput(namespace, timeout, content, allowMethod) {
      console.log("timeout: ", timeout);
      const validCodeReg = /module\.exports\.func.*=/;
      if (namespace === "") {
        this.$message.error("Name cannot be Empty");
        return false;
      }
      if (allowMethod.length === 0) {
        this.$message.error("Select a Request Type ");
        return false;
      }
      if (!validCodeReg.test(content)) {
        this.$message.error(
          "Invalid Function"
        );
        return false;
      }
      return true;
    },
    saveCode() {
      const _this = this;
      const funcContent = getCodeEditor().getValue();
      if (
        !_this.checkInput(
          _this.funcOptionsForm.funcNameSpace,
          _this.funcOptionsForm.timeout,
          funcContent,
          _this.funcOptionsForm.allowMethod
        )
      ) {
        return;
      }
      addFunction({
        author: window.localStorage.getItem(LOCAL_STORAGE_VISITOR_KEY),
        func: funcContent,
        namespace: _this.funcOptionsForm.funcNameSpace,
        options: JSON.stringify({
          description: _this.funcOptionsForm.description,
          timeout: parseInt(_this.funcOptionsForm.timeout),
          allowMethod: _this.funcOptionsForm.allowMethod,
        }),
      })
        .then((res) => {
          if (res.data.status) {
            this.$message.success("Function created successfully");
          } else {
            this.$message.success(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error("Error in creating Function");
        });
    },
    updateCode() {
      const _this = this;
      const funcContent = getCodeEditor().getValue();
      updateFunction({
        id: _this.funcOptionsForm.funcId,
        func: funcContent,
        options: JSON.stringify({
          description: _this.funcOptionsForm.description,
          timeout: _this.funcOptionsForm.timeout,
          allowMethod: _this.funcOptionsForm.allowMethod,
        }),
      })
        .then((res) => {
          if (res.data.status) {
            this.$message.success("Function updated successfully");
          } else {
            this.$message.success(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error("Error in updating Function");
        });
    },
  },
};
</script>

<style scoped>
.func-edit {
  width: 100vw;
  margin: 0 auto;
}
.collapse-item-title {
  margin: 0 0 0 20px;
}
.func-editor {
  height: 300px;
  border: 1px solid #ebeef5;
}
.func-editor-disable {
  height: 300px;
  border: 1px solid #ebeef5;
  pointer-events: none;
}
.func-option {
  margin: 0 20px;
}
.form-item {
  width: 250px !important;
}
.save-button {
  float: right;
  margin: 20px;
}
.item-header {
  width: 200px;
  height: 49px;
  line-height: 49px;
  font-size: 14px;
  font-weight: bold;
  padding-left: 20px;
}
</style>