<template>
  <board-widget :title="title" @edit="onEdit">
    <q-table
        flat
        class="full-width"
        :rows="rows"
        :columns="cols"
        field="name"
        hide-header
        hide-bottom>
    </q-table>
  </board-widget>
</template>

<script>
import { defineComponent } from 'vue';
import BoardWidget from "./widget.vue";
import rows from 'src/components/mixins/rows.js';

export default defineComponent({
    name: 'WidgetRows',
    mixins: [rows],
    components: {
      BoardWidget
    },
    props: ['title', 'params'],
    data: function () {
        return {
            searching: this.params
        }
    },
    methods: {
      onEdit () {
        console.log('on edit...');
      }
    }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
