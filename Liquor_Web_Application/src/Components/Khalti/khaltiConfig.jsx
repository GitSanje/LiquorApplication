
import axios from "axios";

const secretKey= "test_secret_key_a40c0e9764424956a3764de3c4ac0139";
let config = {
  
  publicKey: "test_public_key_10786aa904ab4debb4318217d3fcdb4c",
  productIdentity: "123766",
  productName: "My Liquor Store",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get(
          `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${secretKey}`
        )
        .then((response) => {
          console.log(response.data);
          alert("Thank you for generosity");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    
  ],
};

export default config;