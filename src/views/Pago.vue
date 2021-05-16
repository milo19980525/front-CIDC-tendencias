<template>
    <h1 class="my-5" align="center">
      Suscripción
    </h1>
    <div class="w-100" v-if="verificar" align="center">
        <h2 class="my-5">
            El costo de la suscripción es:
        </h2>
        <p></p>
        <h3>$10 USD</h3>
        <div class="mx-auto w-50" ref="paypal"></div>
    </div>
    <div class ="w-100" v-if="!verificar" align="center">
        <h2>Usted se encuentra con la versión Premium activada</h2>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <h4>El tiempo restante de la susucripción es:</h4>
    </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data(){
        return{
            product: {
                price: 10,
                description: "Suscripción por 1 mes"
            }
        }
    },
    computed:{
        ...mapState(['suscripcion']),
        verificar(){
            console.log("Entroooooooooooooooooooooooooooooooooo")
            console.log(this.suscripcion)
            if (this.suscripcion === 'Free'){
                return true;
            }else{
                return false;
            }
        }
    },
    mounted: function(){
        const script = document.createElement("script");
        script.src = 
        "https://www.paypal.com/sdk/js?client-id=AWxl68kad5UqI8vZkuLrtuyKZIF7TRdu-iBzWHIrk_lmgAW5BeKindYzeNa6kxFkL2em7OowKit1A3zk";
        script.addEventListener("load",this.setLoaded);
        document.body.appendChild(script);
    },

    methods:{
        setLoaded: function(){
            window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.product.description,
                                amount: {
                                    currency_code: "USD",
                                    value: this.product.price
                                }
                            }
                        ]
                    });
                },
                onApprove: async(data, actions) => {
                    // This function captures the funds from the transaction
                        await this.updateSuscripcion({suscripcion_enviar: "Premium"});
                        await gmail.sendMail();
                        console.log('Enviando email...');
                        this.data;       
                },
                onError: err => {
                    console.log(err);
                }
            }).render(this.$refs.paypal);
        },
        ...mapActions(['updateSuscripcion']),
        async procesarFormulario(){
            
        },
    }
}
</script>