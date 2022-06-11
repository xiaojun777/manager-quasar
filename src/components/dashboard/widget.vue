<template>
  <q-card bordered class="q-mt-lg">
    <q-card-section>
      <q-bar :style="{'background-color': 'transparent'}">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn
          flat
          class="q-ml-sm"
          icon="edit"
          @click="onEdit"
        />
        <q-btn
          flat
          class="q-ml-sm"
          icon="delete"
          @click="onDelete"
        />
      </q-bar>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DoardWidget',
  props: {
    title: String
  },
  data: function () {
    return {};
  },

  emits: {
    'delete': null,
    'edit': null
  },
  methods: {
    onEdit () {
      this.$emit('edit');
    },

    onDelete () {
      this.$emit('delete');
    }
  }
})
</script>
