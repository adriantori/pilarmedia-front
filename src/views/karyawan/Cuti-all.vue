<template>
  <div class="container my-5">
    <div class="col-8">
      <router-link
        :to="{ name: 'karyawan.index' }"
        class="btn btn-primary btn-sm rounded shadow mb-3"
        >Back</router-link
      >

      <div class="card rounded shadow">
        <div class="card-header">List Ijin Karyawan</div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Mulai ijin</th>
                <th>Selesai ijin</th>
                <th>Verifikasi</th>
                <th>Jenis ijin</th>
                <th>Alasan</th>
                <th>User ID</th>
                <th>Accept / Decline</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cuti, index) in cutis.data" :key="index">
                <td>{{ cuti.cuti_in }}</td>
                <td>{{ cuti.cuti_out }}</td>
                <td>{{ cuti.cuti_verified }}</td>
                <td>{{ cuti.cuti_type }}</td>
                <td>{{ cuti.cuti_reason }}</td>
                <td>{{ cuti.kary_id }}</td>
                <button
                  class="btn btn-sm btn-outline-danger mx-2"
                  @click.prevent="accept(cuti.kary_id, index)"
                >
                  Accept
                </button>
                <button
                  class="btn btn-sm btn-outline-danger mx-2"
                  @click.prevent="decline(cuti.kary_id, index)"
                >
                  Decline
                </button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    //reactive state
    let cutis = ref([]);

    const route = useRoute();

    onMounted(() => {
      //get data from api endpoint
      axios
        .get(`http://localhost:8000/api/cuti/`)
        .then((result) => {
          cutis.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
    function accept(id) {
      axios
        .put(`http://localhost:8000/api/cuti/accept/${id}`, cutis)
        .then(() => {
          router.push({
            name: "karyawan.cutiall",
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    function decline(id) {
      axios
        .put(`http://localhost:8000/api/cuti/decline/${id}`, cutis)
        .then(() => {
          router.push({
            name: "karyawan.cutiall",
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    return {
        accept,
        decline,
        cutis,
    };
  },
};
</script>
