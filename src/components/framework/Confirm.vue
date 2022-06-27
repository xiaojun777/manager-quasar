<template>
    <q-dialog v-model="showed">
      <q-card>
        <q-card-section>
          <div class="text-h6">确认信息</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{info}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat
            icon="cancel"
            label="取消"
            color="secondary"
            v-close-popup
            @click="this.emitter.emit('cancel', false)"/>
          <q-btn flat
            icon="done"
            label="确认"
            color="primary"
            v-close-popup
            @click="this.emitter.emit('done', true)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import mitt from 'mitt';

export default defineComponent({
  name: 'ConfirmDialog',
  props: {
    value: Boolean
  },
  data: function () {
    return {
      info: '',
      showed: false
    };
  },
  mounted: function () {
    this.emitter = mitt();
  },
  emits: {
  },
  watch: {
    value (val) {
      this.$emit('update', val);
    }
  },
  methods: {
    async show (info) {
      let me = this;
      this.info = info;
      this.showed = true;
      return new Promise(function (resolve, reject){
        let handler = function (val) {
          me.emitter.all.clear();
          resolve(val);
        }
        me.emitter.on('cancel', handler);
        me.emitter.on('done', handler);
      });
    }
  }
})
</script>
