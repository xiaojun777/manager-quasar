<template>
  <q-card square class="column fit"
    :style="{'color': titleColor, 'border': portlet.bordershow ? '1px solid ' + bgColor : 'none'}">
    <q-bar
      v-if="editable || portlet.titleshow"
      class="q-pl-md full-width"
      :style="{'background-color': bgColor}"
    >
      <template v-if="portlet.titleshow">
        <q-icon v-if="portlet.titleicon" :name="portlet.titleicon"/>
        <div class="text-h6 text-no-wrap no-scroll">{{ portlet.title }}</div>
      </template>
      <q-space />
      <template v-if="editable">
        <q-btn
          flat
          round
          dense
          icon="edit"
          class="q-ml-sm"
          size="xs"
          @click="onEdit"
        />
        <q-btn
          flat
          round
          dense
          icon="delete"
          class="q-ml-sm"
          size="xs"
          @click="onDelete"
        />
      </template>
    </q-bar>

    <q-card-section
      v-ripple
      class="q-portlet-body col full-width cursor-pointer ">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DoardWidget",
  props: {
    portlet: Object,
    editable: Boolean,
  },
  data: function () {
    return {
      titleColor: 'white',
      bgColor: '#2a2abd',
    };
  },
  watch: {
    'portlet.titlecolor': {
      handler (val) {
        this.titleColor = val;
      }
    },

    'portlet.bgcolor': {
      handler (val) {
        this.bgColor = val;
      }
    },
  },

  emits: {
    delete: null,
    edit: null,
  },
  methods: {
    onEdit() {
      this.$emit("edit");
    },

    onDelete() {
      this.$emit("delete");
    },
  },
});
</script>

<style lang="sass" scoped>
.q-portlet-body
  padding: 0px
.q-card
  box-shadow: none
</style>
