<template>
    <q-card bordered class="q-mt-lg">
        <q-card-section>
            <div class="text-h6">{{title}}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
            <q-table
                flat
                class="full-width"
                :rows="rows"
                :columns="cols"
                field="name"
                hide-header
                hide-bottom>
            </q-table>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import rows from 'src/components/mixins/rows.js';

export default defineComponent({
    name: 'WidgetRows',
    mixins: [rows],
    props: ['title', 'params'],
    data: function () {
        return {
            searching: this.params
        }
    }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
