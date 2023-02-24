<template>
  <v-main class="container">
    <v-sheet class="chatContainer">
      <v-overlay v-if="loading" class="text-center">
        <v-progress-circular
          indeterminate
          color="#f97316"
        ></v-progress-circular>
        <p>Fetching chat. Please wait...</p>
      </v-overlay>

      <div class="text-center">
        <v-chip>
          You're currently chatting with
          <span class="brandcolor ml-1"
            >{{
              chatData.firstPerson === user.displayName
                ? chatData.secondPerson
                : chatData.firstPerson
            }}
          </span></v-chip
        >
      </div>
      <ChatView
        :user="user"
        :messages="messages"
        :chatData="chatData"
        @payInvoice="payInvoice"
        :payinvoice="payinvoice"
      />
    </v-sheet>

    <div class="chatField d-flex justify-center">
      <div class="formContainer">
        <v-icon @click="createinvoice = !createinvoice" class="plusIcon"
          >mdi-qrcode-plus</v-icon
        >
        <form @submit.prevent="sendButton">
          <input
            ref="chatBox"
            class="chatBox rounded-l-pill"
            v-model="message"
            flat
            placeholder="Type something here"
            solo
            color="red"
          />
          <v-btn
            @click="sendButton"
            class="sendButton"
            color="#0582D2"
            depressed
            fab
            ><img style="width: 19px" src="../assets/Icons/send.svg"
          /></v-btn>
        </form>

        <input id="image" ref="image" hidden type="file" accept="image/*" />
      </div>
    </div>
    <v-dialog persistent v-model="createinvoice" max-width="500px">
      <v-card class="pa-4 py-4">
        <v-window v-model="step">
          <v-window-item :value="1">
            <div class="d-flex justify-space-between">
              <h3>Create Invoice</h3>
              <v-btn depressed fab small @click="createinvoice = !createinvoice"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>

            <v-form lazy-validation ref="form" v-model="valid">
              <label>Amount (in sats)</label>
              <v-text-field
                type="number"
                :rules="amountRules"
                inputmode="numeric"
                dense
                v-model="amount"
                single-line
                outlined
                color="#f97316"
              />

              <label>Description (optional)</label>
              <v-text-field
                dense
                v-model="description"
                single-line
                outlined
                color="#f97316"
              />

              <div class="my-4">
                <v-btn
                  :loading="btnloading"
                  large
                  block
                  class="white--text"
                  color="#f97316"
                  @click="createInvoice"
                  >Create Invoice</v-btn
                >
              </div>
            </v-form>
          </v-window-item>

          <v-window-item :value="2">
            <div style="height: 500px">
              <div class="d-flex justify-space-between">
                <h3>Send Invoice</h3>
                <v-btn
                  depressed
                  fab
                  small
                  @click="createinvoice = !createinvoice"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
              <div class="mx-auto text-center">
                <div>
                  <qr-code
                    style="display: flex; justify-content: center"
                    :text="invoice"
                  ></qr-code>
                  <v-textarea
                    class="mt-3"
                    color="#f97316"
                    height="190px"
                    outlined
                    v-model="invoice"
                    readonly
                  />
                </div>
                <div>
                  <v-btn @click="copyToClipboard()"
                    ><v-icon>mdi-clipboard</v-icon> Copy to clipboard</v-btn
                  >
                </div>

                <div class="floatingButton">
                  <v-btn
                    :loading="sendloading"
                    @click="sendInvoice"
                    block
                    color="#f97316"
                    class="white--text"
                  >
                    Send Invoice
                  </v-btn>
                </div>
              </div>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>
    <v-snackbar right color="#f97316" v-model="snackbar">
      <v-icon class="ml-4"> mdi-check-circle</v-icon>{{ info }}</v-snackbar
    >

    <v-dialog max-width="500px" v-model="payinvoice">
      <v-card class="pa-6">
        <div class="d-flex justify-space-between">
          <h3>Pay Invoice</h3>
          <v-btn depressed fab small @click="payinvoice = !payinvoice"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <p class="my-5">
          Are you sure you want to pay this invoice? Your wallet will
          automatically be debited and funds would be sent to
          {{
            chatData.firstPerson === user.displayName
              ? chatData.secondPerson
              : chatData.firstPerson
          }}
        </p>

        <div class="d-flex justify-end">
          <v-btn
            outlined
            color="#f97316"
            class="mr-3"
            @click="payinvoice = !payinvoice"
          >
            Close</v-btn
          >
          <v-btn
            :loading="paymentloading"
            @click="sendPayment"
            class="white--text"
            color="#f97316"
          >
            Make Payment</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </v-main>
</template>
    
    
    
    
<script>
import db from "@/db";
import ChatView from "./ChatView.vue";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import moment from "moment";
import axios from "axios";
import { mapState } from "vuex";

export default {
  data: () => ({
    search: "",
    createinvoice: false,
    amountRules: [
      (v) => !!v || "Amount is required",
      (v) => parseFloat(v) >= 100 || "Amount must be greater than 100 sats",
    ],
    valid: true,
    amount: 0,
    description: "",
    btnloading: false,
    step: 1,
    invoice: "",
    snackbar: false,
    message: "",
    info: "",
    sendloading: false,
    payinvoice: false,
    paymentloading: false,
  }),
  components: {
    ChatView,
  },
  computed: {
    ...mapState({
      VUE_APP_HOST: "VUE_APP_HOST",
      VUE_APP_CERT: "VUE_APP_CERT",
      VUE_APP_MACAROON: "VUE_APP_MACAROON",
      OTHER_VUE_APP_HOST: "OTHER_VUE_APP_HOST",
      OTHER_VUE_APP_CERT: "OTHER_VUE_APP_CERT",
      OTHER_VUE_APP_MACAROON: "OTHER_VUE_APP_MACAROON",
    }),
  },
  props: {
    chatData: {
      type: Object,
    },
    loading: {
      type: Boolean,
    },
    messages: {
      type: Array,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    searchUsers() {
      this.$store.dispatch("searchUsers", this.search);
    },

    updateChat(chat) {
      this.$emit("updateChat", chat);
    },

    payInvoice(invoice) {
      this.invoice = invoice;
      this.payinvoice = !this.payinvoice;
    },

    sendPayment() {
      this.paymentloading = true;
      axios({
        method: "POST",
        url: "http://localhost:5000/send-payment",
        data: {
          host:
            this.user.displayName == "Kal El"
              ? this.VUE_APP_HOST
              : this.OTHER_VUE_APP_HOST,
          cert:
            this.user.displayName == "Kal El"
              ? this.VUE_APP_CERT
              : this.OTHER_VUE_APP_CERT,
          macaroon:
            this.user.displayName == "Kal El"
              ? this.VUE_APP_MACAROON
              : this.OTHER_VUE_APP_MACAROON,
          invoice: this.invoice,
          email: this.user.email,
          name: this.user.displayName,
        },
      })
        .then(async (response) => {
          //add payment made to chat
          const chatPayload = {
            message: "Invoice payment made by "+this.user.displayName+" on "+moment(Date.now()).format("LLL"),
            payer: this.user.displayName,
            email: this.user.email,
            type: "confirmation",
          };
          console.log(response.data.paymentRoute.totalAmt)
          console.log(chatPayload)
          this.updateChat(chatPayload)
          const transactionsPayload = {
            amount: response.data.paymentRoute.totalAmt,
            description: "Invoice payment by " + this.user.displayName,
            time: moment(Date.now()).format("LLL"),
          };

          await setDoc(doc(db, "chats", this.$route.params.id), {
            chats: arrayUnion(chatPayload),
          },{merge:true});

          const docRef = doc(
            db,
            "users",
            this.user.uid === this.chatData.firstPersonUID
              ? this.chatData.secondPersonUID
              : this.chatData.firstPersonUID
          );
          setDoc(
            docRef,
            {
              transactions: arrayUnion(transactionsPayload),
            },
            { merge: true }
          ).then(() => {
            this.$swal({
              icon: "success",
              title: "Payment successful",
              text: "Invoice has successfully been paid",
            }).then(()=>{
              this.paymentloading = false;
              this.payinvoice = !this.payinvoice;
            })
        
          });
        })
        .catch((error) => {
          console.log(error)
          this.paymentloading = false;
          this.payinvoice = !this.payinvoice;
          this.$swal({
            icon: "warning",
            title: "Invalid request",
            text: error.response.data.data.message,
          });
        });
    },
    sendButton() {
      if (this.message == "") {
        return;
      }
      const chatPayload = {
        message: this.message,
        sender: this.user.uid,
        email: this.user.email,
        type: "text",
        timestamp: moment(Date.now()).format("LLL"),
      };
      this.message = "";
      this.updateChat(chatPayload);
      const docRef = doc(db, "chats", this.$route.params.id);
      setDoc(
        docRef,
        {
          chats: arrayUnion(chatPayload),
        },
        { merge: true }
      ).then(() => {
        this.message = "";
      });
    },

    async createInvoice() {
      const isvalid = await this.$refs.form.validate();
      if (isvalid) {
        this.btnloading = true;
        axios({
          method: "POST",
          url: "http://localhost:5000/invoice",
          data: {
            host:
            this.user.displayName == "Kal El"
              ? this.VUE_APP_HOST
              : this.OTHER_VUE_APP_HOST,
          cert:
            this.user.displayName == "Kal El"
              ? this.VUE_APP_CERT
              : this.OTHER_VUE_APP_CERT,
          macaroon:
            this.user.displayName == "Kal El"
              ? this.VUE_APP_MACAROON
              : this.OTHER_VUE_APP_MACAROON,
            amount: this.amount,
          },
        })
          .then((response) => {
            this.btnloading = false;
            console.log(response);
            this.invoice = response.data;
            this.step = 2;
          })
          .catch((error) => {
            console.log(error);
            this.btnloading = false;
          });
      }
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.invoice).then(() => {
        (this.snackbar = true), (this.info = "Invoice copied to clipboard");
      });
    },

    sendInvoice() {
      this.sendloading = true;
      const chatPayload = {
        invoice: this.invoice,
        sender: this.user.uid,
        email: this.user.email,
        type: "invoice",
        timestamp: moment(Date.now()).format("LLL"),
        caption:
          "Invoice of " + this.amount + " sats from " + this.user.displayName,
      };
      this.updateChat(chatPayload);
      this.step = 1
      this.createinvoice = !this.createinvoice;
      const docRef = doc(db, "chats", this.$route.params.id);
      setDoc(
        docRef,
        {
          chats: arrayUnion(chatPayload),
        },
        { merge: true }
      ).then(() => {
        this.sendloading = false;
        this.message = "";
      });
    },
  },
};
</script>
    
    
    <style scoped>
.container {
  padding: 30px 0px 0px 100px !important;
}

.chatContainer {
  padding: 50px 100px 90px 100px;
  border-radius: 20px;
  margin: 20px;
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

img {
  width: 128px;
  height: 128px;
}

.noTransactionContainer {
  padding: 32px 0px 195px 0px;
}
.noTransactionContainer p {
  color: #959ba7;
  width: 500px;
  margin: auto;
}

.chatField {
  width: 600px;
  margin: auto;
}

.chatBox {
  background: #f8f8f9 !important;
  width: 100%;
  padding: 0px 0px 0px 70px;
  height: 56px;
  margin: 0px 0px 0px 0px;
  border-bottom: 1px solid #9ba3a6;
  border-top: 1px solid #9ba3a6;
}

.formContainer {
  position: relative;
  width: 100%;
  height: 70px;
  padding: 0px 19px;
}

input:focus {
  outline: none;
}

.plusIcon {
  position: absolute;
  left: 0;
  margin: 17px 0px 0px 40px;
  cursor: pointer;
}

.sendButton {
  position: absolute;
  color: white !important;
}

.floatingButton {
  position: absolute;
  bottom: 0;
  margin-top: 7px;
  width: 100%;
}
</style>