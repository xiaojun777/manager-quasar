<template>
  <q-card square class="column fit"

    :style="{'background-color': bgcolor, 'color': titlecolor, 'border': bordershow ? '1px solid ' + bgcolor : 'none'}">
    <q-bar
      v-if="editable || titleshow"
      class="q-pl-md full-width bg-transparent"
    >
      <template v-if="titleshow">
        <div>{{ title }}</div>
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
      class="q-portlet-body col full-width cursor-pointer">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DoardWidget",
  props: {
    title: String,
    titleshow: Boolean,
    titlecolor: {
      type: String,
      default: '#fff'
    },
    bgcolor: {
      type: String,
      default: '#0080ff'
    },
    bordershow: {
      type: Boolean,
      default: false,
    },

    editable: Boolean,
  },
  data: function () {
    return {};
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
