<template>
  <div class="card">
      <div class="card-body">
          <h5 class="text-center">{{revista.Nombre}}</h5>
          <!-- <p class="text-center">
              <img :src="pais.flag" :alt="`bandera-${pais.name}`" class="img-fluid w-50">
          </p>
          -->
          <p class="card-text">
              <span class="badge badge-dark d-block mb-1">Factor de Impacto: {{revista.Factor}}</span>
              <span class="badge badge-info d-block p-3 mb-1">Quartil: {{revista.Categoria}}</span>
              <span class="badge badge-dark d-block mb-1">Índice H: {{revista.IndiceH}}</span>
              <span class="badge badge-info d-block p-3 mb-1">Cantidad de artículos publicados por año: {{numeroFormato(revista.CantidadArticulosUltimo)}}</span>
              <span class="badge badge-dark d-block mb-1">Cantidad de artículos publicados cada tres años: {{numeroFormato(revista.CantidadArticulosUltimosTres)}}</span>
              <span class="badge badge-dark d-block mb-1">Página web: <a v-bind:href="revista.Enlace" style="color:yellow">{{revista.Nombre}}</a></span>
              <span class="badge badge-dark d-block mb-1">ISSN: {{revista.ISSN}}</span>
              <span class="badge badge-info d-block p-3 mb-1">Homologación por Colciencias: {{revista.Homologacion}}</span>
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