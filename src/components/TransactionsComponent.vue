<template>
  <v-main class="container">
    <v-sheet class="pa-8">
      <h2>Transactions</h2>

      <v-progress-circular v-if="loading" indeterminate></v-progress-circular>

      <div v-for="(transaction, i) in transactions" :key="i">
        <v-list>
          <v-list-item>
            <v-list-item-icon
              ><v-btn depressed color="" fab
                ><v-icon color="#ffcc00">mdi-lightning-bolt</v-icon></v-btn
              ></v-list-item-icon
            >
            <v-list-item-title
              >{{ transaction.description }}
              <div>
              <span>{{ transaction.time}}</span>
            </div>
            </v-list-item-title>
            <v-list-item-action
              ><v-btn depressed class="white--text" :color="parseFloat(transaction.amount) < 0 ?'#ff2000':'#f97316'"
                >{{ transaction.amount }} sats</v-btn
              ></v-list-item-action
            >
          </v-list-item>
        </v-list>
      </div>
    </v-sheet>
  </v-main>
</template>
  
  
  
  
  <script lang="js">
  import moment from 'moment';

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
          transactions:{
              type:Array
          },  
          loading:{
            type:Boolean
          } 
      },

      filters: {
  moment: function (date) {
    return moment(parseInt(date*1000)).format('LLL');
  }
},



  }
  </script>
  
  
  <style scoped>
.container {
  padding: 30px 0px 0px 230px !important;
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

.tilt {
  transform: rotate(-20deg);
}

.actionButtons {
  max-width: 500px;
  text-align: end;
  display: flex;
  justify-content: space-around;
}
</style>