<template>
  <div>
    <div v-for="(messages, i) in messages" :key="i">
      <div
        v-if="
          messages.type == 'text' && chatData.firstPersonUID === messages.sender
        "
        class="d-flex align-end flex-column mt-2"
      >
        <v-card
          flat
          color="#207CFE"
          style="max-width: 75%;padding: 10px 20px 10px 20px;border-radius: 15px 0px 15px 15px;float: right;margin: 5px 20px 0px 20px;min-width: 140px;"
        >
          <div class="text-left">
            <!-- <div style="font-weight: 600" class="white--text">{{ messages.name }}</div> -->
            <div class="white--text">{{ messages.message }}</div>
          </div>
          <div class="text-right">
            <span class="white--text timestamp">{{ messages.timestamp }}</span>
          </div>
        </v-card>
      </div>
      <div
        v-if="
          messages.type == 'text' && chatData.firstPersonUID !== messages.sender
        "
        class="d-flex align-start flex-column mb-3"
      >
        <v-card
          color="#DEDFE3"
          style="max-width: 75%;padding: 10px 20px 10px 20px;border-radius: 15px 15px 15px 0px;float: left;margin: 10px 20px 0px 20px;"
          flat
        >
          <!-- <div style="font-weight: 600">{{ messages.name }}</div> -->
          <div class="text-left">{{ messages.message }}</div>
          <div class="text-left">
            <span class="black--text timestamp">{{ messages.timestamp }}</span>
          </div>
        </v-card>
      </div>
      <div v-if="messages.text" style="margin: 0px 20px 0px 20px">
        <div class="white--text d-flex align-start flex-column">
          {{ messages.message }}
        </div>
      </div>
      <div
        v-if="messages.other"
        class="d-flex align-end flex-column"
        style="margin: 0px 20px 5px 20px"
      >
        <div class="white--text d-flex align-end flex-column">
          {{ messages.message }}
        </div>
      </div>
      <div
        v-if="
          messages.type == 'invoice' &&
          chatData.firstPersonUID !== messages.sender
        "
        style="margin: 0px 20px 0px 20px"
      >
        <div class="sellerImageContainer">
          <qr-code :text="messages.invoice"> </qr-code>
          <div class="text-caption text-left">{{ messages.caption }}</div>
          <div class="text-left">
            <span class="timestamp">{{ messages.timestamp }}</span>
          </div>
        </div>
        <div v-if="user.uid !== messages.sender" class="my-3">
          <v-btn @click="copyInvoice(messages.invoice)" color="white"
            >Copy Invoice</v-btn
          >
          <v-btn
            @click="payInvoice(messages.invoice)"
            color="#f97316"
            class="white--text ml-3"
            >Pay Invoice</v-btn
          >
        </div>
      </div>
      <div
        v-if="
          messages.type == 'invoice' &&
          chatData.firstPersonUID === messages.sender
        "
        class="d-flex align-end flex-column"
        style="margin: 10px 20px 0px 20px"
      >
        <div class="buyerImageContainer">
          <qr-code :text="messages.invoice"> </qr-code>
          <div class="white--text text-caption text-left">
            {{ messages.caption }}
          </div>
          <div class="text-right">
            <span class="white--text timestamp">{{ messages.timestamp }}</span>
          </div>
        </div>

        <div v-if="user.uid !== messages.sender" class="my-3">
          <v-btn @click="copyInvoice(messages.invoice)" color="white"
            >Copy Invoice</v-btn
          >
          <v-btn
          @click="payInvoice(messages.invoice)"
            color="#f97316"
            class="white--text ml-3"
            >Pay Invoice</v-btn
          >
        </div>
      </div>

      <div class="mt-6 mb-3 text-center">
      <v-chip class="text-center" v-if="messages.type=='confirmation'">{{ messages.message }}</v-chip>
    </div>
    </div>

    <v-snackbar right color="#f97316" v-model="snackbar">
        <v-icon class="ml-4"> mdi-check-circle</v-icon>{{ info }}</v-snackbar
      >
  </div>
</template>



<script>
export default {
  data() {
    return {
      snackbar: false,
      info: "",
      invoice:""
    };
  },

 
  methods: {
    copyInvoice(invoice) {
      navigator.clipboard.writeText(invoice).then(() => {
        (this.snackbar = true), (this.info = "Invoice copied to clipboard");
      });
    },
    payInvoice(invoice) {
      this.$emit("payInvoice",invoice)
    },

    sendPayment(){
      console.log(this.invoice)
    }
  },

  props: {
    messages: {
      type: Array,
    },
    user: {
      type: Object,
    },
    chatData: {
      type: Object,
    },
    payinvoice:{
      type:Boolean
    }
  },
};
</script>



<style scoped>
.timestamp {
  font-size: 9px;
}

.buyerImageContainer {
  background: #207cfe;
  color: white;
  padding: 9px;
  border-radius: 10px;
  margin: 10px 0px 0px 0px;
}

.sellerImageContainer {
  background: #dedfe3;
  color: black;
  padding: 9px;
  border-radius: 10px;
  max-width: 273px;
  margin: 10px 0px 0px 0px;
}
</style>