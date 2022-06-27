<template>
  <q-dialog v-model="showed">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ info }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat icon="done" label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlertDialog",
  data: function () {
    return {
      info: "",
      showed: false,
    };
  },
  methods: {
    show(info) {
      this.info = info;
      this.showed = true;
    },
  },
});
</script>
