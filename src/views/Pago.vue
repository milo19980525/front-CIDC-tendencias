<template>
    Las BOLASSS 
  {{suscripcion}}
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