<template>
    <v-app class="authBackground">
        <LoginComponent />
    </v-app>
</template>



<script lang="ts">
import LoginComponent from "../../components/Auth/LoginComponent.vue"
export default {
    name:"LoginPage",
    components:{
        LoginComponent
    }
}
</script>


