<template>
    <q-dialog full-width full-height v-model="showed">
        <q-card>
            <div class="q-pa-md">
                <q-form class="q-gutter-lg">
                    <template v-for="item in app.schema.items" :key="item.id">
                        <q-input v-if="item.type=='string' && item.searchable"
                            type="text" 
                            stack-label
                            :label="item.label"
                            v-model="values[item.id]"/>
                        <div v-if="item.type=='number' && item.searchable"
                            class="row">
                            <q-input class="col"
                                type="number" 
                                stack-label
                                :label="item.label+'(min)'" 
                                v-model="values[item.id]['min']"/>
                            <div class="col-1 text-subtitle1" style="text-align:center; margin-top: 10px">---</div>
                            <q-input class="col"
                                type="number"
                                stack-label
                                :label="item.label+'(max)'" 
                                v-model="values[item.id]['max']"/>               
                        </div>
                        <q-select v-if="item.type=='option' && item.searchable"
                            v-model="values[item.id]"
                            stack-label
                            emit-value
                            map-options
                            multiple
                            :options="this.getOptions(item.options)" 
                            :label="item.label" />
                    </template>   
                    <div class="row justify-end q-pa-md q-gutter-sm">
                        <q-btn
                            label="Cancel"
                            class="q-mt-md"
                            icon="cancel"
                            @click="onCancel">
                        </q-btn>                        
                        <q-btn
                            label="Search"
                            class="q-mt-md"
                            icon="search"
                            @click="onSearch">
                        </q-btn>
                    </div>                                                              
                </q-form>
            </div>
        </q-card>
    </q-dialog>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchView',
    props: {
        app: {}
    },
    data: function () {
        return {
            values: {},
            showed: false,
            initialized: false
        }
    },

    mounted: function () {
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

        show () {
            if (this.app !== void 0 && !this.initialized){
                this.initialized = true;
                this.resetSearch();
            }
            this.showed = true;
        },

        hide () {
            this.showed = false;
        },

        resetSearch () {
            this.values = {};
            for (let i = 0; i < this.app.schema.items.length; i++) {
                let item = this.app.schema.items[i];
                if (item.searchable){
                    switch(item.type){
                        case 'string': {
                            this.values[item.id] = '';
                            break;
                        }
                        case 'number': {
                            this.values[item.id] = {};
                            break;
                        }
                        case 'option': {
                            this.values[item.id] = null;
                            break;
                        }
                    }
                }
            }
        },

        onCancel () {
            this.hide();
        },
        
        onSearch () {
            this.$emit('search', this.values);
            this.hide();
        }        
    }    
});
</script>