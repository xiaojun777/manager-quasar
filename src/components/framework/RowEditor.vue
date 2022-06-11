<template>
    <q-dialog full-width full-height v-model="showed">
        <q-card>
            <div class="q-pa-md">
                <div class="q-gutter-md">
                    <template v-for="item in app.schema.items" :key="item.id">
                        <q-form>
                            <q-input v-if="item.type=='string'"
                                :readonly="this.method=='view'"
                                type="text"
                                :label="item.label"
                                v-model="values[item.id]"/>
                            <q-input v-if="item.type=='number'"
                                :readonly="this.method=='view'"
                                type="number"
                                :label="item.label"
                                v-model="values[item.id]"/>
                            <q-select v-if="item.type=='option'"
                                :readonly="this.method=='view'"
                                v-model="values[item.id]"
                                emit-value
                                map-options
                                :options="this.getOptions(item.options)"
                                :label="item.label" />
                        </q-form>
                    </template>
                    <div class="row justify-end q-pa-md q-gutter-sm">
                    <q-btn
                        :loading="submitting"
                        label="Cancel"
                        class="q-mt-md"
                        icon="cancel"
                        @click="onCancel">
                    </q-btn>
                    <q-btn v-if="this.method!='view'"
                        :loading="submitting"
                        label="Save"
                        class="q-mt-md"
                        icon="save"
                        @click="onSave">
                    </q-btn>
                    </div>
                </div>
                <div v-for="item in app.schema.items" :key="item.id">
                    <span>{{this.values[item.id]}}</span>
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'RowEditor',
    props: {
        app: null
    },
    data: function () {
        return {
            showed: false,
            values: {},
            method: 'new',
            submitting: false
        }
    },

    mounted: async function () {
    },

    computed: {

    },

    methods: {
        getOptions (options) {
            let opts = [];
            for (let opt in Object.keys(options)) {
                opts.push({
                    value: opt,
                    label: options[opt]
                });
            }
            return opts;
        },

        newRow () {
            this.method = 'new';
            this.resetValues();
            this.show();
        },

        editRow (vals) {
            this.method = 'edit';
            this.resetValues();
            this.updateValues(vals);
            this.show();
        },

        viewRow (vals) {
            this.method = 'view';
            this.resetValues();
            this.updateValues(vals);
            this.show();
        },

        updateValues (vals) {
            this.values = vals;
        },

        resetValues () {
            this.values = {};
        },

        hide () {
            this.resetValues();
            this.showed = false;
        },

        show () {
            this.showed = true;
        },

        onCancel () {
            this.hide();
        },

        onSave () {
            if (this.method === 'new'){
                this.submitting = true;
                this.$emit('new', this.values, (val) => {
                    this.submitting = false;
                    if (val.code){
                        this.hide();
                        this.$emit('afternew');
                    }else{

                    }
                });
            }else{
                this.submitting = true;
                this.$emit('edit', this.values, (val) => {
                    this.submitting = false;
                    if (val.code){
                        this.hide();
                        this.$emit('afteredit');
                    }else{

                    }
                });
            }

        }
    },

    computed: {

    }

})
</script>
