<template>
    <div class="container my-5">
        <div class="col-8">
            <router-link 
                :to="{ name: 'karyawan.index'}"
                class="btn btn-primary btn-sm rounded shadow mb-3"
            >Back</router-link>

            <div class="card rounded shadow">
                <div class="card-header">
                    Create Ijin Karyawan
                </div>
                <div class="card-body">
                    <form @submit.prevent="store()">
                        <div class="mb-3">
                            <label for="" class="form-label">Tanggal mulai cuti (YYYY-MM-DD)</label>
                            <input type="text" class="form-control" v-model="cuti.cuti_in">
                            <div v-if="validation.cuti_in" class="text-danger">
                                {{ validation.cuti_in[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Tangal berhenti ijin (YYYY-MM-DD)</label>
                            <input type="text" class="form-control" v-model="cuti.cuti_out">
                            <div v-if="validation.cuti_out" class="text-danger">
                                {{ validation.cuti_out[0] }}
                            </div>
                        </div>                
                        <div class="mb-3">
                            <label for="" class="form-label">Jenis ijin</label>
                            <select id="" class="form-select" v-model="cuti.cuti_type">
                                <option value="sakit">Sakit</option>
                                <option value="cuti">Cuti</option>
                            </select>
                            <div v-if="validation.cuti_type" class="text-danger">
                                {{ validation.cuti_type[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Alasan ijin</label>
                            <input type="text" class="form-control" v-model="cuti.cuti_reason">
                            <div v-if="validation.cuti_reason" class="text-danger">
                                {{ validation.cuti_reason[0] }}
                            </div>
                        </div>     
                        <button class="btn btn-outline-primary">
                            Create Cuti
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //data binding
        
        const validation = ref([]);

        const router = useRouter();
        
        const route = useRoute();


        const cuti = reactive({
            cuti_in: '',
            cuti_out: '',
            cuti_type: '',
            cuti_reason: ''
        });


        function store(){
            axios.post(
                `http://localhost:8000/api/cuti/create/${route.params.id}`,
                cuti
            )
            .then(() => {
                router.push({
                    name: 'karyawan.index'
                });
            }).catch((err) =>{
                validation.value = err.response.data
            });
        }

        return{
            cuti,
            validation,
            router,
            store
        }

    }
}


</script>
