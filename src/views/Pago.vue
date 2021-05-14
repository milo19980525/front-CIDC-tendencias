<template>
    Las BOLASSS Ya empecé a programar en VUE
    <div>
        {{suscripcion}}
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    computed:{
        ...mapState(['suscripcion'])
    },
    methods:{
        ...mapActions(['cargarLocalStorage'])
    },
    created(){
        this.cargarLocalStorage()
    }
}
</script>