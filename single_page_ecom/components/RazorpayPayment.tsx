import React, { useEffect } from 'react';

interface RazorpayPaymentProps {
  amount: number;  // Amount in paise (1 INR = 100 paise)
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, onFailure }) => {

  useEffect(() => {
    // Step 1: Dynamically load the Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
    };
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    // Check if Razorpay is available before trying to use it
  
      // Step 2: Set Razorpay options with a fixed amount and test mode credentials
      const options = {
        key: "rzp_live_ILgsfZCZoFIKMb", // Use your Razorpay test key
        amount: amount, // Amount in paise (100 paise = 1 INR)
        currency: "INR",
        name: "DotShop", // The name of your company or product
        description: "We Responce for your product", // Payment description
        // image: "https://your-logo-url.com/logo.png", // Optional logo
        handler: function (response: any) {
          // Handle payment success and pass Razorpay payment ID to the onSuccess function
          onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999", // Optional contact number
        },
        notes: {
          address: "Some note",
        },
        theme: {
          color: "#F37254", // Change the theme color as needed
        },
      };

      // Step 3: Open Razorpay Checkout in test mode
      const razorpay = new (window as any).Razorpay(options);
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
