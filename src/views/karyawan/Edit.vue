<template>
    <div class="container my-5">
        <div class="col-8">
            <router-link 
                :to="{ name: 'karyawan.index'}"
                class="btn btn-primary btn-sm rounded shadow mb-3"
            >Back</router-link>

            <div class="card rounded shadow">
                <div class="card-header">
                    Edit Karyawan
                </div>
                <div class="card-body">
                    <form @submit.prevent="update()">
                        <div class="mb-3">
                            <label for="" class="form-label">Nama</label>
                            <input type="text" class="form-control" v-model="karyawan.kary_nama">
                            <div v-if="validation.kary_nama" class="text-danger">
                                {{ validation.kary_nama[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Username</label>
                            <input type="text" class="form-control" v-model="karyawan.kary_user">
                            <div v-if="validation.kary_user" class="text-danger">
                                {{ validation.kary_user[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="karyawan.kary_pass">
                            <div v-if="validation.kary_pass" class="text-danger">
                                {{ validation.kary_pass[0] }}
                            </div>
                        </div>                        
                        <div class="mb-3">
                            <label for="" class="form-label">Jabatan</label>
                            <select id="" class="form-select" v-model="karyawan.kary_role">
                                <option value="karyawan">Karyawan</option>
                                <option value="HRD">HRD</option>
                                <option value="manager">Manageer</option>
                            </select>
                            <div v-if="validation.kary_role" class="text-danger">
                                {{ validation.kary_role[0] }}
                            </div>
                        </div>
                        <button class="btn btn-outline-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //data binding
        let karyawan = reactive({
            kary_nama: '',
            kary_user: '',
            kary_pass: '',
            kary_role: '',
        });

        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(()=>{
            axios.get(`http://localhost:8000/api/karyawan/${route.params.id}`)

            .then((result) => {
                karyawan.kary_nama = result.data.data.kary_nama
                karyawan.kary_user = result.data.data.kary_user
                karyawan.kary_pass = result.data.data.kary_pass
                karyawan.kary_role = result.data.data.kary_role
            }).catch((err) => {
                console.log(err.response.data)
            });
        });

        function update(){
            axios.put(
                `http://localhost:8000/api/karyawan/${route.params.id}`,
                karyawan
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
            karyawan,
            validation,
            router,
            update
        }

    }
}


</script>
