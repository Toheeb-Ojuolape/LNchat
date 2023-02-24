<template>
  <v-main class="container">
    <v-card
      height="200px"
      class="card text-center pa-3 rounded-lg"
      width="500px"
    >
      <div style="width: 98px" class="top-right">
        <v-select
          :loading="convertLoading"
          single-line
          color="white"
          dense
          outlined
          :items="currencyTypes"
          :item-text="'code'"
          :item-value="'code'"
          :value="currency"
          :label="currency"
        />
      </div>

      <div class="balance">
        <h1>
          ₿ {{ balance ? parseFloat(balance).toLocaleString("en") : "" }}
          <v-progress-circular
            v-if="loading"
            indeterminate
          ></v-progress-circular>
        </h1>
      </div>
    </v-card>
    
    <div class="my-5 actionButtons">
        <v-btn large to="/transactions"><v-icon class="mr-3">mdi-swap-horizontal</v-icon>View Transactions</v-btn>
        <v-btn to="/chat" large color="#141b3a" class="white--text">Start Conversation <v-icon class="tilt ml-3">mdi-send</v-icon></v-btn>
    </div>
  </v-main>
</template>




<script lang="js">
export default {
    data:()=>({
        currency:'BTC',
        currencyTypes:[
               {country:'Bitcoin',code:'BTC'},
               {country:'America',code:'USD'},
               {country:'Nigeria',code:'NGN'},
                ],
        convertLoading:false
    }),
    props:{
        balance:{
            type:String
        },
        loading:{
            type:Boolean
        }
    }
}
</script>


<style scoped>
.container {
  padding: 30px 0px 0px 300px !important;
}

.card {
  background: linear-gradient(to right, #f83600 0%, #f9d423 100%);
  color: white;
}
.top-right {
  position: absolute;
  top: 14px;
  right: 16px;
}

.balance {
  margin: 60px 0px 0px 0px;
}

h1 {
  font-size: 50px;
}

.tilt{
    transform: rotate(-20deg);
}

.actionButtons{
    max-width:500px;
    text-align: end;
    display:flex;
    justify-content: space-around;
}
</style>