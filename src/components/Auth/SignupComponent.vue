<template>
  <v-app>
    <v-main class="signupForm">
      <v-card elevation="6" width="500px" class="pa-3 rounded-xl mx-auto">
        <div class="signupCard" tile>
          <v-alert v-model="alert" type="error">{{ message }}</v-alert>
          <h3 class="brandcolor text-center">Welcome to LN⚡CHAT 👋🏾</h3>
          <div class="text-center subtitle">
            Chatting is fun when Bitcoin ₿ is involved
          </div>
<!-- 
          <div class="mt-3">
            <v-btn class="primarybtn" large block>
              🗲 Continue with Lightning</v-btn
            >
          </div> -->

          <!-- <div class="or">
            <h2 class="orText">OR</h2>
            <div class="line"></div>
          </div> -->

          <v-form ref="form" class="my-5">
            <label>Name</label>
            <v-text-field
              v-model="name"
              dense
              color="#e86b10"
              single-line
              outlined
              placeholder="You should use a pseudonym"
            />

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

          <div class="my-3">
            <v-btn
              :loading="loading"
              @click="signup"
              block
              x-large
              color="#f97316"
              class="white--text"
              >Signup</v-btn
            >
          </div>

          <div class="text-center subtitle">
            Already have an account?
            <router-link to="/login">Login</router-link>
          </div>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>
    
    
    
<script lang="ts">
import db from "../../db";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

export default {
  name: "LoginComponent",
  data: () => ({
    name: "",
    email: "",
    password: "",
    loading: false,
    alert: false,
    message: "",
    show: false,
  }),
  methods: {
    async signup() {
      if (this.password == "" || this.name == "" || this.email == "") {
        this.alert = true;
        this.message = "Please enter your full details";
        setTimeout(() => {
          this.alert = false;
        }, 1000);
        window.scrollTo(0, 0);
        return;
      }

      this.loading = true;
      const user = {
        displayName: this.name,
        email: this.email,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/tellbookstore.appspot.com/o/avatar.png?alt=media&token=593af39b-6c6d-47d8-afc5-ab8560b08dd2",
      };
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (data) => {
          const docRef = doc(db, "users", data.user.uid);
          await updateProfile(getAuth().currentUser, user);
          setDoc(docRef, {
            name: this.name,
            email: this.email,
            uid:data.user.uid,
            transactions:[],
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/tellbookstore.appspot.com/o/avatar.png?alt=media&token=593af39b-6c6d-47d8-afc5-ab8560b08dd2",
          })
            .then((response) => {
              console.log(response);
              sessionStorage.setItem("token", data.user.uid);
              localStorage.setItem("userData",JSON.stringify(user))
              this.loading = false;
              window.location.href = "/dashboard";
            })
            .catch((error) => {
              console.log(error.message);
              this.loading = false;
              this.alert = true;
              this.message = error.message;
            });
        })
        .catch((error) => {
          console.log(error.message);
          this.loading = false;
          this.alert = true;
          this.message = error.message;
        });
    },
  },
};
</script>
    
    
    <style>
.signupForm {
  background: #f97316;
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
  background-image: linear-gradient(120deg, #8b3694, #e86b10);
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

.orangePill {
  background: #ff6600;
  color: white;
  padding: 3px;
  font-size: 15px;
  border-radius: 10px;
}

.primarybtn {
  background: #f97316 !important;
  border-radius: 5px;
  color: white !important;
  padding: 10px 0px;
}

.or {
  text-align: center;
}
.line {
  height: 1px;
  background: black;
}
.orText {
  position: relative;
  top: 10px;
  color: black;
  font-size: 13px;
  background: white;
  display: inline-block;
  padding: 0 20px;
  border-radius: 30px;
}

.subtitle {
  font-size: 13px;
}
</style>