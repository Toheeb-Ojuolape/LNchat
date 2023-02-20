<template>
    <v-app class="authBackground">
        <SignupComponent />
    </v-app>
</template>



<script lang="ts">
import SignupComponent from "../../components/Auth/SignupComponent.vue"
export default {
    name:"SignupPage",
    components:{
        SignupComponent
    }
}
</script>


