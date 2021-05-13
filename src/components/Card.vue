<template>
  <div class="card">
      <div class="card-body">
          <h5 class="text-center">{{revista.name}}</h5>
          <!-- <p class="text-center">
              <img :src="pais.flag" :alt="`bandera-${pais.name}`" class="img-fluid w-50">
          </p>
          -->
          <p class="card-text">
              <span class="badge badge-dark d-block mb-1">ISSN: {{revista.issn}}</span>
              <span class="badge badge-info d-block p-3 mb-1">Quartil: {{revista.quartil}}</span>
              <span class="badge badge-dark d-block mb-1">Cantidad de artículos: {{numeroFormato(revista.cantidadArticulos)}}</span>
              <span class="badge badge-dark d-block mb-1">Colciencias: {{revista.colciencias}}</span>
          </p> 

      </div>
  </div>
</template>

<script>
export default {
    props:['revista'],
    setup(){
        const numeroFormato = (num) => {
            return new Intl.NumberFormat("de-DE").format(num)
        }

        return {numeroFormato}
    }
}
</script>

<style>

</style>