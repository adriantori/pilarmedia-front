<template>
    <div class="container my-5">
        <div class="col-8">
            <router-link 
                :to="{ name: 'karyawan.index'}"
                class="btn btn-primary btn-sm rounded shadow mb-3"
            >Back</router-link>

            <div class="card rounded shadow">
                <div class="card-header">
                    Absensi Karyawan
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Masuk</th>
                                <th>Keluar</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr v-for="(absensi, index) in absensis.data" :key="index">
                                <td>{{ absensi.absen_in }}</td>
                                <td>{{ absensi.absen_out }}</td>
                                <td>{{ absensi.kary_id }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'

export default{
    setup(){
        //reactive state
        let absensis = ref([]);
        
        const route = useRoute();

        onMounted(() =>{
            //get data from api endpoint
            axios.get(`http://localhost:8000/api/absensi/`)
            .then((result)=>{
                absensis.value = result.data
            }).catch((err)=>{
                console.log(err.response)
            });
        });

        return{
            absensis
        }
    }
}


</script>
