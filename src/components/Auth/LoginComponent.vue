<template>
  <v-app>
    <v-main class="signupForm">
      <v-card elevation="2" width="500px" class="rounded-xl mx-auto">
        <div class="signupCard" tile>
          <v-alert v-model="alert" type="error">{{ message }}</v-alert>
          <h3 class="brandcolor text-center">Login</h3>
          <div class="text-center subtitle">Welcome back to LN⚡CHAT 🚀</div>

          <!-- <div class="mt-3">
            <v-btn class="primarybtn" large block>
              🗲 Continue with Lightning</v-btn
            >
          </div>

          <div class="or">
            <h2 class="orText">OR</h2>
            <div class="line"></div>
          </div> -->

          <v-form ref="form" class="my-5">
            <label>Email address</label>
            <v-text-field
              v-model="email"
              dense
              color="#e86b10"
              single-line
              outlined
            />

            <label>Password</label>
            <v-text-field
              v-model="password"
              dense
              color="#e86b10"
              single-line
              :type="show ? 'text' : 'password'"
              outlined
              @click:append="show = !show"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            />
          </v-form>

          <div class="py-1 text-center">
            <p class="subtitle">
              Don't have an account?
              <router-link to="/signup">Signup</router-link>
            </p>
          </div>

          <div class="my-3">
            <v-btn
              :loading="loading"
              @click="login"
              block
              x-large
              color="#f97316"
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
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";

export default {
  name: "LoginComponent",
  data: () => ({
    email: "",
    password: "",
    loading: false,
    alert: false,
    message: "",
    show: false,
  }),
  methods: {
    async login() {
      if (this.password == "" || this.email == "") {
        this.alert = true;
        this.message = "Please enter your email & password";
        setTimeout(() => {
          this.alert = false;
        }, 1000);
        window.scrollTo(0, 0);
        return;
      }

      this.loading = true;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          const payLoad = {
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
            uid: data.user.uid,
          };
          sessionStorage.setItem("token",data.user.uid)
          localStorage.setItem("userData", JSON.stringify(payLoad));
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.log(error);
          this.message = error.message;
          this.alert = true;
          this.loading = false
        });
    },
  },
};
</script>
    
  