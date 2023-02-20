<template>
    <v-app>
      <v-main class="signupForm">
        <v-card elevation="2" width="500px" class="rounded-lg mx-auto">
          <div class="signupCard" tile>
            <v-alert v-model="alert" type="error">{{ message }}</v-alert>
            <h2 class="brandcolor text-center">Welcome to LNchat 👋🏾</h2>
            <div class="text-center">Chatting is fun when Bitcoin <span class="orangePill">₿</span> is involved</div>
            

            <div class="mt-3">
            <v-btn class="primarybtn" large block> ⚡ Continue with Lightning</v-btn>
           </div>
            
           
           <div class="or">
              <h2 class="orText">OR</h2>
              <div class="line"></div>
            </div>
            
            <v-form ref="form" class="my-5">

              <label>Full name</label>
              <v-text-field
                v-model="name"
               
                dense
                color="#4c248a"
                single-line
                outlined
              />


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
  
            <div class="my-3">
              <v-btn
                :loading="loading"
                @click="signup"
                block
                x-large
                color="#310059"
                class="white--text"
                >Signup</v-btn
              >
            
            </div>

            <div class="text-center">Already have an account? <router-link to="/login">Login</router-link></div>
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
        name:"",
        email: "",
        password: "",
        loading: false,
        alert:false,
        message:"",
        show:false
    
    }),
    methods: {
      async signup() {
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
    
    
    <style>
  .signupForm {
    background:#310059 ;
    background-size: cover;
    padding: 60px !important;
  }
  
  .signupCard {
    padding: 20px 40px;
    background: white;
  }
  
  label {
    font-size: 13px;
  }
  
  .v-text-field {
    height: 54px !important;
  }
  
  span {
    font-size: 12px;
    margin: 0px;
    padding: 0px;
    line-height: 12px;
  }
  
  h2 {
    margin-bottom: -3px;
  }
  
  .image::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(120deg, #8b3694, #4c248a);
    opacity: 0.7;
  }
  
  @media screen and (max-width: 600px) {
    .signupForm {
      background: #feeaf3;
      padding: 60px 15px !important;
    }
    .signupCard {
      padding: 20px 20px;
    }
  }

  .orangePill{
    background:#ff6600;
    color:white;
    padding:3px;
    font-size:15px;
    border-radius:10px
  }

  .primarybtn{
    background:#310059 !important;
    border-radius:5px;
    color:white !important;
    padding:10px 0px
  }


  
.or {
  text-align: center;
}
.line {
  height: 1px;
  background:black;
}
.orText {
  position: relative;
  top: 10px;
  color:black;
  font-size:13px;
  background:white;
  display: inline-block;
  padding: 0 20px;
  border-radius:30px
}

  </style>