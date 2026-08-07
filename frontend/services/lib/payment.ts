import {
  createPaymentOrder,
  verifyPayment,
} from "../api";

import { loadRazorpay } from "./razorpay";

export async function startPayment(
  plan: "india" | "international"
) {
  // Load Razorpay SDK
  const loaded = await loadRazorpay();

  if (!loaded) {
    alert("Unable to load Razorpay.");
    return;
  }

  // Create order from backend
  const data = await createPaymentOrder(plan);

  const order = data.order;

  const options = {
    key: data.key,

    amount: order.amount,

    currency: order.currency,

    name: "DocuMind AI",

    description: "Lifetime License",

    order_id: order.id,

    handler: async function (response: any) {

    try {

    const verifyResponse = await verifyPayment({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });

    if (verifyResponse.success) {

      alert("Payment Verified Successfully!");

      window.location.href = "/payment-success";

    }

  } catch (error) {

    console.error(error);

    alert("Payment Verification Failed!");

  }

},

    theme: {
      color: "#06B6D4",
    },

    modal: {
      ondismiss: function () {
        console.log("Payment cancelled");
      },
    },
  };

  const paymentObject = new window.Razorpay(options);

  paymentObject.open();
}