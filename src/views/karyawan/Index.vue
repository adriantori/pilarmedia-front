<template>
    <div class="container my-5">
        <div class="col-8">
            <router-link 
                :to="{ name: 'karyawan.create'}"
                class="btn btn-info btn-sm rounded shadow mb-3"
            >Add</router-link>
            <router-link 
                :to="{ name: 'karyawan.absensiall'}"
                class="btn btn-danger btn-sm rounded shadow mb-3 mx-4"
            >Cek Absensi All</router-link>
            <router-link 
                :to="{ name: 'karyawan.cutiall'}"
                class="btn btn-danger btn-sm rounded shadow mb-3 mx-4"
            >Cek Cuti All</router-link>

            <div class="card rounded shadow">
                <div class="card-header">
                    List Karyawan
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Jabatan</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr v-for="(karyawan, index) in karyawans.data" :key="index">
                                <td>{{ karyawan.kary_nama }}</td>
                                <td>{{ karyawan.kary_user }}</td>
                                <td>{{ karyawan.kary_role }}</td>
                                <td>
                                    <div class="btn-group">   
                                        <button class="btn btn-sm btn-outline-info mx-2"
                                        @click.prevent="checkIn(karyawan.kary_id)"
                                        >Check In
                                        </button>
                                        <button class="btn btn-sm btn-outline-info mx-2"
                                        @click.prevent="checkOut(karyawan.kary_id)"
                                        >Check Out
                                        </button>     
                                        <router-link
                                            :to="{ name: 'karyawan.absensi', params:{id: karyawan.kary_id}}"
                                            class="btn btn-sm btn-outline-info mx-2"
                                        >Check Absensi
                                        </router-link>                                
                                        <router-link
                                            :to="{ name: 'karyawan.cuti', params:{id: karyawan.kary_id}}"
                                            class="btn btn-sm btn-outline-info mx-2"
                                        >Ijin kerja
                                        </router-link>                                
                                        <router-link
                                            :to="{ name: 'karyawan.edit', params:{id: karyawan.kary_id}}"
                                            class="btn btn-sm btn-outline-danger mx-2"
                                        >Edit
                                        </router-link>
                                        <button class="btn btn-sm btn-outline-danger mx-2"
                                        @click.prevent="destroy(karyawan.kary_id, index)"
                                        >Delete
                                        </button>
                                    </div>
                                </td>
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
import {onMounted, ref} from 'vue'

export default{
    setup(){
        //reactive state
        let karyawans = ref([]);
        let absensis = ref([]);

        onMounted(() =>{
            //get data from api endpoint
            axios.get('http://localhost:8000/api/karyawan')
            .then((result)=>{
                karyawans.value = result.data
            }).catch((err)=>{
                console.log(err.response)
            });
        });

        function destroy(id, index) {
            axios.delete(
                `http://localhost:8000/api/karyawan/${id}`,
                karyawans
            )
            .then(() => {
                karyawans.value.data.splice(index, 1)
            }).catch((err) =>{
                console.log(err.response.data);
            });
        }

        function checkIn(id){
            axios.post(
                `http://localhost:8000/api/absensi/in/${id}`,
                absensis
            )
            .then(() => {
                router.push({
                    name: 'karyawan.index'
                });
            }).catch((err) =>{
                console.log(err.response);
            });
        }

        function checkOut(id){
            axios.put(
                `http://localhost:8000/api/absensi/out/${id}`,
                absensis
            )
            .then(() => {
                router.push({
                    name: 'karyawan.index'
                });
            }).catch((err) =>{
                console.log(err.response);
            });
        }

        return{
            karyawans,
            checkIn,
            checkOut,
            destroy
        }
    }
}


</script>
