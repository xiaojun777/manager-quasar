<template>
  <q-card square class="column fit">
    <q-bar
      v-if="editable || titleshow"
      class="row bg-primary text-white q-pl-md full-width"
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

    <q-card-section class="q-portlet-body col full-width">
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
