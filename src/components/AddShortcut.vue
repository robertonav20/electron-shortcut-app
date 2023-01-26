<template>
  <a-modal :visible="visible" title="Add Shortcut">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol" :form="form">
      <a-form-item
        label="Title"
        required
      >
        <a-input
          placeholder="Insert title"
          v-decorator="[
            'title',
            { initialValue: '', rules: [{ required: true, message: 'Please insert title!' }] },
          ]"
        >
          <template #prefix>
            <a-icon type="font-size" />
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="Action"
        required
      >
        <a-input
          placeholder="Action like http://google.it"
          v-decorator="[
            'action',
            { rules: [{ required: true, message: 'Please insert action!' }] },
          ]"
        >
          <template #prefix>
            <a-icon type="setting" />
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="reset">Cancel</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="submit"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
        >Add</a-button
      >
    </template>
  </a-modal>
</template>

<script>
import { ref } from "vue";
import { addShortcut } from "@/storage/crud";
import { send } from "@/service/utils";

export default {
  name: "AddShortcut",
  props: ["open", "close"],
  data() {
    return {
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      loading: ref(false),
      form: this.$form.createForm(this, { name: "add" }),
    };
  },
  watch: {
    open: function () {
      this.openModal();
    },
    close: function () {
      this.closeModal();
    },
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    openModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    hasErrors(fieldsError) {
      return Object.keys(fieldsError).some((field) => fieldsError[field]);
    },
    reset() {
      this.form.resetFields();
      this.closeModal();
    },
    submit(e) {
      console.log(e);
      console.log(this.form);
      e.preventDefault();
      this.form.validateFields((error, values) => {
        this.loading = true;
        addShortcut(
          values.action,
          'code',
          'large',
          values.title,
          false,
          () => {
            this.reset();
            this.loading = false;
            this.closeModal();
            send("reload-shortcut-list");
          }
        );
      });
    },
  },
};
</script>