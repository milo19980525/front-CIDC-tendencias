import { onMounted, ref } from 'vue'

export function useFetch(url){
    const arrayData = ref([])
    
    onMounted(async () => {
        try {
            const res = await fetch(url)
            arrayData.value = await res.json()
            console.log("ARAYYYYYYYY DATAAAAAAA")
            console.log(arrayData)
        } catch (error) {
            console.log(error)
        }
    })
    return {arrayData}
}