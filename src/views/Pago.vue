<template>
    <h1 class="my-5" align="center">
      Suscripción
    </h1>
    <div class="w-100" v-if="verificar" align="center">
        <h2 class="my-5">
            El costo de la suscripción es:
        </h2>
        <p></p>
        <h3>$5 USD</h3>
        <div class="mx-auto w-50" ref="paypal"></div>
    </div>
    <div class ="w-100" v-if="!verificar" align="center">
        <h2>Usted se encuentra con la versión Premium activada</h2>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'
import emailjs from 'emailjs-com';

export default {
    data(){
        return{
            product: {
                price: 5,
                description: "Suscripción por 1 mes"
            },
            
        }
    },
    computed:{
        ...mapState(['suscripcion', 'user']),
        verificar(){
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
                        await this.updateSuscripcion({suscripcion_enviar: "Premium"});
                        emailjs.init('user_fcP5NcOfe2dyX3pz7CKKM')
                        emailjs.send('service_uxnfisn','template_ks1pf2p', {email: this.user.email, name: this.name, message: "Mensaje"}
                            ).then((response) => {
                                console.log('Enviando email...');
                            }, (error) => {
                                console.log('Error en el envio del email...');
                            })
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