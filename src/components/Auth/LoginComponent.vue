<template>
    <v-app>
      <v-main class="signupForm">
        <v-card elevation="2" width="500px" class="rounded-lg mx-auto">
          <div class="signupCard" tile>
            <v-alert v-model="alert" type="error">{{ message }}</v-alert>
            <h2 class="brandcolor text-center">Login</h2>
            <div class="text-center">Welcome back to LNChat 🚀</div>
          

            <div class="mt-3">
            <v-btn class="primarybtn" large block> ⚡ Continue with Lightning</v-btn>
           </div>
            
           
           <div class="or">
              <h2 class="orText">OR</h2>
              <div class="line"></div>
            </div>
          
          
            <v-form ref="form">
              <label>Email address</label>
              <v-text-field
                v-model="email"
               
                dense
                color="#4c248a"
                single-line
                outlined
              />
  
              <label>Password</label>
              <v-text-field
                v-model="password"
                dense
                color="#4c248a"
                single-line
                :type="show ? 'text' : 'password'"
                outlined
                @click:append="show = !show"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              />
          
            
            </v-form>

            <div class="py-3 text-center">
              <p>Don't have an account? <router-link to="/signup">Signup</router-link></p>
            </div>
  
            <div class="my-3">
              <v-btn
                :loading="loading"
                @click="login"
                block
                x-large
                color="#310059"
                class="white--text"
                >Login</v-btn
              >
            
            </div>
          </div>
        </v-card>
      </v-main>
    </v-app>
  </template>
    
    
    
<script lang="ts">
  import axios from "axios";
  
  export default {
    name:"LoginComponent",
    data:()=> ({
        email: "",
        password: "",
        loading: false,
        alert:false,
        message:"",
        show:false
    
    }),
    methods: {
      async login() {
        if (this.password == "") {
          this.alert = true;
          this.message = "Please enter your password";
          setTimeout(() => {
            this.alert = false;
          }, 1000);
          window.scrollTo(0, 0);
          return;
        }
  
        this.loading = true;
        axios({
          method: "POST",
          url: "http://localhost:5000/admin/login",
          headers: {
            Accept: "*/*",
            ContentType: "application/json",
          },
          data: {
            email: this.email,
            password: this.password,
          },
        })
          .then((response) => {
            console.log(response)
            if(response.status == 290){
              this.alert = true
              this.message = "Invalid login details"
              this.loading = false
              return
            }
            sessionStorage.setItem("adminToken",response.data.token)
            window.location.href = "/admin/dashboard"
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.$swal({
              icon: "error",
              title: "Account Not Created",
              text: error.response.data.email,
              confirmButtonText: `<p class="brandcolor">Ok</p>`,
            });
          });
      },
    },
  };
  </script>
    
  