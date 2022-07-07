<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    :bordershow="innerPortlet.bordershow"
    :bgcolor="innerPortlet.bgcolor"
    :titlecolor="innerPortlet.titlecolor"
    @edit="onPortletEdit"
    @delete="onPortletDelete"
    :editable="editable"
  >
    <q-carousel
      swipeable
      animated
      arrows
      autoplay
      v-model="slide"
      v-model:fullscreen="fullscreen"
      infinite
      :class="fullscreen ? '' : 'ratio-16-9'"
    >
      <template v-for="(item, index) in images" :key="index">
        <q-carousel-slide :name="index" :img-src="item.image" />
      </template>
      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </board-widget>

  <portlet-editor
    v-model:portlet="innerPortlet"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >
    <template v-slot="{portlet}">
      {{portlet}}
    </template>
  </portlet-editor>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import portletbase from "../mixins/portletbase";
import editorbase from "../mixins/editorbase";
import PortletEditor from "./portleteditor.vue";

export default defineComponent({
  name: "WidgetGallery",
  props: [],
  mixins: [portletbase, editorbase],
  components: {
    BoardWidget,
    PortletEditor,
  },
  data: function () {
    return {
      fullscreen: false,
      images: this.portlet.params.images,
      slide: 1,
      width: 100,
    };
  },
  emits: {
    delete: null,
  },
  mounted: function () {},
  methods: {
    onDelete() {
      this.$emit("delete", this.portlet.name);
    },
  },
});
</script>

<style lang="sass" scoped>
.ratio-4-3
  aspect-ratio: 4 / 3 !important
  height: auto !important

.ratio-16-9
  aspect-ratio: 16 / 9 !important
  height: auto !important
</style>
