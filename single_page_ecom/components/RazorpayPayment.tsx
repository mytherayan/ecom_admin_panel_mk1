import React, { useEffect } from 'react';

// Define the types for the Razorpay response
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Define the options for Razorpay
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
}

// Extend the Window interface to include the Razorpay property
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

// Define the Razorpay instance type
interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: RazorpayErrorResponse) => void) => void;
}

// Define the Razorpay error response type
interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      payment_id: string;
      order_id: string;
    };
  };
}

interface RazorpayPaymentProps {
  amount: number; // Amount in paise (1 INR = 100 paise)
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, onFailure }) => {
  useEffect(() => {
    // Dynamically load the Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      onFailure('Failed to load Razorpay script');
    };
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [onFailure]);

  const handlePayment = () => {
    if (!window.Razorpay) {
      onFailure('Razorpay is not available');
      return;
    }

    // Razorpay options
    const options: RazorpayOptions = {
      key: "rzp_live_ILgsfZCZoFIKMb", // Replace with your Razorpay key
      amount: amount, // Amount in paise (100 paise = 1 INR)
      currency: "INR",
      name: "DotShop",
      description: "We Responce for your product",
      handler: (response: RazorpayResponse) => {
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Some note",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', (response: RazorpayErrorResponse) => {
      console.error("Payment failed:", response.error);
      onFailure(response.error.description);
    });
    razorpay.open();
  };

  return (
    <div>
      <button onClick={handlePayment} className="btn btn-primary">
        Pay with Razorpay
      </button>
    </div>
  );
};

export default RazorpayPayment;



// import React, { useEffect } from 'react';

// // Define the types for the Razorpay response to avoid using 'any'
// interface RazorpayResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// // Extend the Window interface to include the Razorpay property
// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// interface RazorpayPaymentProps {
//   amount: number; // Amount in paise (1 INR = 100 paise)
//   onSuccess: (paymentId: string) => void;
//   onFailure: (error: string) => void;
// }

// const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, onFailure }) => {
//   useEffect(() => {
//     // Step 1: Dynamically load the Razorpay script
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => {
//       console.log("Razorpay script loaded successfully");
//     };
//     script.onerror = () => {
//       console.error("Failed to load Razorpay script");
//       onFailure('Failed to load Razorpay script');
//     };
//     document.body.appendChild(script);

//     // Clean up the script when the component is unmounted
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [onFailure]);

//   const handlePayment = () => {
//     if (!window.Razorpay) {
//       onFailure('Razorpay is not available');
//       return;
//     }

//     // Step 2: Set Razorpay options
//     const options = {
//       key: "rzp_live_ILgsfZCZoFIKMb", // Use your Razorpay key
//       amount: amount, // Amount in paise (100 paise = 1 INR)
//       currency: "INR",
//       name: "DotShop", // The name of your company or product
//       description: "We Responce for your product", // Payment description
//       handler: (response: RazorpayResponse) => {
//         // Handle payment success and pass Razorpay payment ID to the onSuccess function
//         onSuccess(response.razorpay_payment_id);
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9999999999", // Optional contact number
//       },
//       notes: {
//         address: "Some note",
//       },
//       theme: {
//         color: "#F37254", // Change the theme color as needed
//       },
//     };

//     // Step 3: Open Razorpay Checkout
//     const razorpay = new window.Razorpay(options);
//     razorpay.on('payment.failed', (response: any) => {
//       console.error("Payment failed:", response.error);
//       onFailure('Payment failed. Please try again.');
//     });
//     razorpay.open();
//   };

//   return (
//     <div>
//       <button onClick={handlePayment} className="btn btn-primary">
//         Pay with Razorpay
//       </button>
//     </div>
//   );
// };

// export default RazorpayPayment;





// import React, { useEffect } from 'react';

// // Define the types for the Razorpay response to avoid using 'any'
// interface RazorpayResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// interface RazorpayPaymentProps {
//   amount: number;  // Amount in paise (1 INR = 100 paise)
//   onSuccess: (paymentId: string) => void;
//   onFailure: (error: string) => void;
// }

// // const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, onFailure }) => {

// //   useEffect(() => {
// //     // Step 1: Dynamically load the Razorpay script
// //     const script = document.createElement('script');
// //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //     script.onload = () => {
// //       console.log("Razorpay script loaded successfully");
// //     };
// //     script.onerror = () => {
// //       console.error("Failed to load Razorpay script");
// //       // Optionally, invoke the onFailure callback if the script fails to load
// //       onFailure('Failed to load Razorpay script');
// //     };
// //     document.body.appendChild(script);

// //     // Clean up the script when the component is unmounted
// //     return () => {
// //       document.body.removeChild(script);
// //     };
// //   }, [onFailure]);

// //   const handlePayment = () => {
// //     // Check if Razorpay is available before trying to use it
// //     // if (typeof (window as any).Razorpay === 'undefined') {
// //     //   onFailure('Razorpay is not available');
// //     //   return;
// //     // }
  
// //     // Step 2: Set Razorpay options with a fixed amount and test mode credentials
// //     const options = {
// //       key: "rzp_live_ILgsfZCZoFIKMb", // Use your Razorpay test key
// //       amount: amount, // Amount in paise (100 paise = 1 INR)
// //       currency: "INR",
// //       name: "DotShop", // The name of your company or product
// //       description: "We Responce for your product", // Payment description
// //       // image: "https://your-logo-url.com/logo.png", // Optional logo
// //       handler: function (response: RazorpayResponse) {
// //         // Handle payment success and pass Razorpay payment ID to the onSuccess function
// //         onSuccess(response.razorpay_payment_id);
// //       },
// //       prefill: {
// //         name: "Customer Name",
// //         email: "customer@example.com",
// //         contact: "9999999999", // Optional contact number
// //       },
// //       notes: {
// //         address: "Some note",
// //       },
// //       theme: {
// //         color: "#F37254", // Change the theme color as needed
// //       },
// //     };

// //     // Step 3: Open Razorpay Checkout in test mode
// //     // const razorpay = new (window as any).Razorpay(options);
// //     // razorpay.open();
// //   };

// //   return (
// //     <div>
// //       <button onClick={handlePayment} className="btn btn-primary">
// //         Pay with Razorpay 
// //       </button>
// //     </div>
// //   );
// // };

// const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, onFailure }) => {

//   useEffect(() => {
//     // Step 1: Dynamically load the Razorpay script
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => {
//       console.log("Razorpay script loaded successfully");
//     };
//     script.onerror = () => {
//       console.error("Failed to load Razorpay script");
//       // Optionally, invoke the onFailure callback if the script fails to load
//       onFailure('Failed to load Razorpay script');
//     };
//     document.body.appendChild(script);

//     // Clean up the script when the component is unmounted
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [onFailure]);

//   const handlePayment = () => {
//     // Step 2: Set Razorpay options with a fixed amount and test mode credentials
//     const options = {
//       key: "rzp_live_ILgsfZCZoFIKMb", // Use your Razorpay test key
//       amount: amount, // Amount in paise (100 paise = 1 INR)
//       currency: "INR",
//       name: "DotShop", // The name of your company or product
//       description: "We Responce for your product", // Payment description
//       // image: "https://your-logo-url.com/logo.png", // Optional logo
//       handler: function (response: RazorpayResponse) {
//         // Handle payment success and pass Razorpay payment ID to the onSuccess function
//         onSuccess(response.razorpay_payment_id);
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9999999999", // Optional contact number
//       },
//       notes: {
//         address: "Some note",
//       },
//       theme: {
//         color: "#F37254", // Change the theme color as needed
//       },
//     };

//     // Step 3: Open Razorpay Checkout in test mode
//     // const razorpay = new (window as any).Razorpay(options);
//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   return (
//     <div>
//       <button onClick={handlePayment} className="btn btn-primary">
//         Pay with Razorpay 
//       </button>
//     </div>
//   );
// };



// export default RazorpayPayment;


// // import React, { useEffect } from 'react';

// // interface RazorpayPaymentProps {
// //   amount: number;  // Amount in paise (1 INR = 100 paise)
// //   onSuccess: (paymentId: string) => void;
// //   onFailure: (error: string) => void;
// // }

// // const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, onFailure }) => {

// //   useEffect(() => {
// //     // Step 1: Dynamically load the Razorpay script
// //     const script = document.createElement('script');
// //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //     script.onload = () => {
// //       console.log("Razorpay script loaded successfully");
// //     };
// //     script.onerror = () => {
// //       console.error("Failed to load Razorpay script");
// //     };
// //     document.body.appendChild(script);

// //     // Clean up the script when the component is unmounted
// //     return () => {
// //       document.body.removeChild(script);
// //     };
// //   }, []);

// //   const handlePayment = () => {
// //     // Check if Razorpay is available before trying to use it
  
// //       // Step 2: Set Razorpay options with a fixed amount and test mode credentials
// //       const options = {
// //         key: "rzp_live_ILgsfZCZoFIKMb", // Use your Razorpay test key
// //         amount: amount, // Amount in paise (100 paise = 1 INR)
// //         currency: "INR",
// //         name: "DotShop", // The name of your company or product
// //         description: "We Responce for your product", // Payment description
// //         // image: "https://your-logo-url.com/logo.png", // Optional logo
// //         handler: function (response: any) {
// //           // Handle payment success and pass Razorpay payment ID to the onSuccess function
// //           onSuccess(response.razorpay_payment_id);
// //         },
// //         prefill: {
// //           name: "Customer Name",
// //           email: "customer@example.com",
// //           contact: "9999999999", // Optional contact number
// //         },
// //         notes: {
// //           address: "Some note",
// //         },
// //         theme: {
// //           color: "#F37254", // Change the theme color as needed
// //         },
// //       };

// //       // Step 3: Open Razorpay Checkout in test mode
// //       const razorpay = new (window as any).Razorpay(options);
// //       razorpay.open();
    
// //   };

// //   return (
// //     <div>
// //       <button onClick={handlePayment} className="btn btn-primary">
// //         Pay with Razorpay 
// //       </button>
// //     </div>
// //   );
// // };

// // export default RazorpayPayment;
