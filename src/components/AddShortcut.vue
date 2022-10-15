<template>
  <a-modal :visible="visible" title="Add Shortcut">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Title">
        <a-input v-model:value="shortcut.title" placeholder="Insert title">
          <template #prefix>
            <user-outlined type="user"/>
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)"/>
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="Action">
        <a-input v-model:value="shortcut.action" placeholder="Action like http://google.it">
          <template #prefix>
            <user-outlined type="user"/>
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)"/>
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="Icon">
        <a-input v-model:value="shortcut.icon" placeholder="Icon">
          <template #prefix>
            <user-outlined type="user"/>
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)"/>
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="Size">
        <a-input v-model:value="shortcut.size" placeholder="Size like 20, 30, 40">
          <template #prefix>
            <user-outlined type="user"/>
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)"/>
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="error-infos" :wrapper-col="{ span: 1, offset: 1 }" v-bind="errorInfos" />
    </a-form>
    <template #footer>
      <a-button key="back" @click="reset">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submit">Add</a-button>
    </template>
  </a-modal>
</template>

<script>
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons-vue';
import {reactive, ref, computed} from "vue";
import {addShortcut} from "@/storage/crud";
import {ipcRenderer} from "electron";
import { Form } from 'ant-design-vue';

const shortcut = reactive({
  title: '',
  action: '',
  icon: '',
  size: null
})

const rules = reactive({
  title: [{
    required: true,
    message: 'Please input title',
    type: 'string'
  }],
  action: [{
    required: true,
    message: 'Please input action',
    type: 'string'
  }],
  icon: [{
    required: true,
    message: 'Please input icon',
    type: 'string'
  }],
  size: [{
    required: true,
    asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value < 10) {
          reject('Too short value, correct value is between > 9 and < 30');
        } else if (value > 29) {
          reject('Too much value, correct value is between > 9 and < 30');
        } else {
          resolve();
        }
      });
    },
  }]
})

const {
  resetFields,
  validate,
  validateInfos,
  mergeValidateInfo,
} = Form.useForm(shortcut, rules);

const errorInfos = computed(() => {
  return mergeValidateInfo([
      validateInfos.title,
      validateInfos.action,
      validateInfos.icon,
      validateInfos.size
  ]);
});

export default {
  name: 'AddShortcut',
  props: ['open', 'close'],
  components: {
    UserOutlined,
    InfoCircleOutlined,
  },
  data() {
    return {
      visible: false,
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      loading: ref(false),
      shortcut,
      rules,
      errorInfos,
      mergeValidateInfo,
      resetFields,
      validate,
      validateInfos
    }
  },
  watch: {
    open: function () {
      this.openModal();
    },
    close: function () {
      this.closeModal();
    }
  },
  methods: {
    openModal() {
      this.visible = true
    },
    closeModal() {
      this.visible = false
    },
    reset() {
      this.shortcut.title = ''
      this.shortcut.action = ''
      this.shortcut.icon = ''
      this.shortcut.size = null
      this.closeModal()
    },
    submit() {
      console.log(this.shortcut)
      this.validate()
        .then(() => {
          this.loading = true
          addShortcut(
              this.shortcut,
            false,
            () => {
              this.loading = false
              this.closeModal()
              ipcRenderer.send('reload-shortcut-list')
            }
          )
        })
        .catch(() => {})
    }
  }
}
</script>