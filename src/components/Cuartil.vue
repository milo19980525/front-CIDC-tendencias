<template>
   <!--  <div class=text-center>
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
    </div> -->
     <form @submit.prevent="procesarFormulario"
     style="text-align: center">
            <!-- <h3
                class="my-3 mx-auto"
                style="text-align: center"
            >
                Filtros disponibles
            </h3> -->
            <h5
                class="my-5 mx-auto"
                style="text-align: center"
            >
                  
                <!-- Seleccione los filtros necesarios para satisfacer su busqueda. -->
            </h5>
            <div class="alert alert-danger" v-if="mostrarError === true">
                {{error_componente}}
            </div>
             <div class="form-row">
                 <div class="form-group col-md-6">
                    <h5 class="my-3 mx-auto">
                        Área de conocimiento
                    </h5>
                    <select id="inputState" class="form-control" v-model="area">
                        <option selected>All subject areas</option>
                        <option>Agricultural and Biological Sciences</option>
                        <option>Arts and Humanities</option>
                        <option>Biochemistry, Genetics and Molecular Biology</option>
                        <option>Business, Management and Accounting</option>
                        <option>Chemical Engineering</option>
                        <option>Chemistry</option>
                        <option>Computer Science</option>
                        <option>Decision Sciences</option>
                        <option>Dentistry</option>
                        <option>Earth and Planetary Sciences</option>
                        <option>Agricultural and Biological Sciences</option>
                        <option>Agricultural and Biological Sciences</option>
                        <option>Energy</option>
                        <option>Engineering</option>
                        <option>Environmental Science</option>
                        <option>Health Professions</option>
                        <option>Immunology and Microbiology</option>
                        <option>Materials Science</option>
                        <option>Mathematics</option>
                        <option>Medicine</option>
                        <option>Multidisciplinary</option>
                        <option>Neuroscience</option>
                        <option>Nursing</option>
                        <option>Pharmacology, Toxicology and Pharmaceutics</option>
                        <option>Physics and Astronomy</option>
                        <option>Psychology</option>
                        <option>Social Sciences</option>
                        <option>Veterinary"</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <h5
                    class="my-3 mx-auto">
                        Cuartiles
                    </h5>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Q1" value="Q1" v-model="consulta1">
                        <label class="form-check-label" for="inlineCheckbox1">Q1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Q2" value="Q2" v-model="consulta2">
                        <label class="form-check-label" for="inlineCheckbox2">Q2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Q3" value="Q3" v-model="consulta3">
                        <label class="form-check-label" for="inlineCheckbox3">Q3</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Q4" value="Q4" v-model="consulta4">
                        <label class="form-check-label" for="inlineCheckbox4">Q4</label>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <h5 class="my-3 mx-auto">
                        Cantidad mínima de artículos: {{minarticulos}}
                    </h5>
                    <div class="form-group">
                        <input type="range" class="form-control-range" id="formControlRange" min="1" max="4001" step="100" v-model="minarticulos">
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <h5 class="my-3 mx-auto">
                        Cantidad máxima de artículos: {{maxarticulos}}
                    </h5>
                    <div class="form-group">
                        <input type="range" class="form-control-range" id="formControlRange" v-bind:min="minarticulos" max="4001" step="100" v-model="maxarticulos">
                    </div>
                </div>
            </div>
            <button 
                type="submit"
                class="btn btn-primary"
                :disabled="bloquear">
                Buscar
            </button>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            consulta1: '',
            consulta2 : '',
            consulta3: '',
            consulta4: '',
            minarticulos: 1,
            maxarticulos: 101,
            area: '',
            error_componente: ''
        }
    },
    computed:{
        bloquear(){
            /* console.log(this.pass1)*/
            if(!this.consulta1 && !this.consulta2 && !this.consulta3 && !this.consulta4){
                return true
            }
            if(this.maxarticulos > this.minarticulos && this.area !== ''){
                return false    
            }
            return true
        },
        mostrarError(){
            if(this.maxarticulos <= this.minarticulos){
                this.error_componente = "La cantidad de artículos máxima debe ser mayor que la definida en el mínimo."
                console.log(this.error_componente)
                return true
            }
            if(this.area === ''){
                this.error_componente = "Seleccione un área de conocimiento."
                console.log(this.error_componente)
                return true
            }
            if(!this.consulta1 && !this.consulta2 && !this.consulta3 && !this.consulta4){
                this.error_componente = "Seleccione por lo menos un cuartil."
                console.log(this.error_componente)
                return true
            }
        },
        ...mapState(['suscripcion'])
    },
    methods:{
        ...mapActions(['obtenerRevistas']),
        async procesarFormulario(){
            console.log("CONSULTAAAAAAAAAAAS")
            console.log(this.consulta1)
            console.log(this.consulta2)
            console.log(this.consulta3)
            console.log(this.consulta4)
            this.obtenerRevistas({consulta1: this.consulta1, consulta2: this.consulta2, consulta3: this.consulta3, 
            consulta4: this.consulta4, minarticulos: this.minarticulos, maxarticulos: this.maxarticulos, area: this.area, suscripcion: this.suscripcion
            })
        }
    }
}
</script>