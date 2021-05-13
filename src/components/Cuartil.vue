<template>
    <div class=text-center>
        <h5>
        Filtrar por Quartil
        </h5>
        <div class="btn-group mb-3">
            <button class="btn btn-dark" @click="filtro('1')">Q1</button>
            <button class="btn btn-dark" @click="filtro('2')">Q2</button>
            <button class="btn btn-dark" @click="filtro('3')">Q3</button>
            <button class="btn btn-dark" @click="filtro('4')">Q4</button>
            <button class="btn btn-dark" @click="filtro('N/A')">N/A</button>
            <button class="btn btn-dark" @click="filtro('')">Todos</button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    setup(){
        const store = useStore()

        const filtro = (quartil) =>{
            store.dispatch('filtrarQuartil', quartil)
        }

        return {filtro}
    }
}
</script>

<style>

</style>