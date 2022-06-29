<template>
  <q-card bordered :class="editable ? 'q-mt-lg' : 'q-mt-md'">
    <div
      v-if="editable"
      :style="{ 'margin-top': '-30px' }"
      class="row absolute-top-right q-gutter-sm"
      align="right"
    >
      <q-btn
        flat
        round
        dense
        color="white"
        text-color="primary"
        icon="edit"
        class="q-ml-sm"
        size="xs"
        @click="onEdit"
      />
      <q-btn
        flat
        round
        dense
        color="white"
        text-color="primary"
        icon="delete"
        class="q-ml-sm"
        size="xs"
        @click="onDelete"
      />
    </div>

    <template v-if="titleshow">
      <q-card-section :style="{ padding: '6px' }">
        <div class="text-h7">{{ title }}</div>
      </q-card-section>
      <q-separator :style="{ 'margin-left': '4px', 'margin-right': '4px' }" />
    </template>
    <q-card-section class="q-portlet-body">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DoardWidget',
  props: {
    title: String,
    titleshow: Boolean,
    editable: Boolean
  },
  data: function () {
    return {}
  },

  emits: {
    delete: null,
    edit: null
  },
  methods: {
    onEdit() {
      this.$emit('edit')
    },

    onDelete() {
      this.$emit('delete')
    }
  }
})
</script>

<style lang="sass" scoped>
.q-portlet-body
  padding: 0px
.q-card
  box-shadow: none
</style>
