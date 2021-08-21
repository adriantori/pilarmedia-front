import { createRouter, createWebHistory } from "vue-router";


const routes = [{
        path: '/',
        name: 'karyawan.index',
        component: () =>
            import ('../views/karyawan/Index.vue')
    }, {
        path: '/register',
        name: 'karyawan.create',
        component: () =>
            import ('../views/karyawan/Create.vue')
    }, {
        path: '/edit',
        name: 'karyawan.edit',
        component: () =>
            import ('../views/karyawan/Edit.vue')
    }, {
        path: '/absensi',
        name: 'karyawan.absensi',
        component: () =>
            import ('../views/karyawan/Absensi.vue')
    }, {
        path: '/absensiall',
        name: 'karyawan.absensiall',
        component: () =>
            import ('../views/karyawan/Absensi-all.vue')
    }, {
        path: '/cutiall',
        name: 'karyawan.cutiall',
        component: () =>
            import ('../views/karyawan/Cuti-all.vue')
    }, {
        path: '/cuti',
        name: 'karyawan.cuti',
        component: () =>
            import ('../views/karyawan/Cuti-make.vue')
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;