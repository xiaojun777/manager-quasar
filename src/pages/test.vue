<template>
  <q-page class="row no-wrap">
    <q-tab-panels class="col-12" v-model="panel" vertical>
      <q-tab-panel class="fit" name="hello">
        <div>hello</div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'simple',
  order: 0,
  components: {},
  data: function () {
    return {
      editorData: '<p>Content of the editor.</p>',
      panel: 'hello'
    }
  },
  computed: {},
  methods: {}
})
</script>
