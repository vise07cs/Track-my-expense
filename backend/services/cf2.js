// //* cashfree-service.js  (contains code written by me)

//  const { Cashfree , CFEnvironment } = require("cashfree-pg"); // You have to install this package
//  // Setup

// const cashfree = new Cashfree(CFEnvironment.SANDBOX,"TEST108112953e5d2311426854abfdf759211801","cfsk_ma_test_e38269ac5b46ccdc30c6c5f7de5250cd_81725c26")



//  // This function will generate session ID for us so, we can make payment
//  exports.createOrder = async ( orderId, orderAmount, orderCurrency, customerID,customerName,customerEmail,customerPhone ) => {
//  try {
//  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
//  const formattedExpiryDate = expiryDate.toISOString();
//  const request = {
//  order_amount: orderAmount,
//  order_currency: orderCurrency,
//  order_id: orderId,
//  customer_details: {
//  customer_id: customerID,
// customer_name: customerName,
// customer_email: customerEmail,
//  customer_phone: customerPhone,
//  },
//  order_meta: {
//  // This will make a GET API call on your site
//  return_url: `http://localhost:5000/api/payment-status/${orderId}`,
//  },
//  Order_expiry_time: formattedExpiryDate, // Set the valid expiry date
//  };
//  const response = await cashfree.PGCreateOrder( request);
//  return response.data.payment_session_id;
//  } catch (error) {
//  console.error("Error creating order:", error.message);
//  }
//  };

//  exports.getPaymentStatus=async(orderId)=>{
//  try{
//  const response=await cashfree.PGOrderFetchPayment(orderId);
//  let getOrderResponse=response.data;
//  let orderStatus;
//  if(getOrderResponse.filter((transaction)=>transaction.payment_status==="SUCCESS").length>0)
//  {
//  orderStatus="Success";
//  }
 
//  else if(getOrderResponse.filter((transaction)=>transaction.payment_status==="PENDING").length>0)
//  {
//  orderStatus="Pending";
//  }
//  else{
//  orderStatus="Failure";
//  }

//  returnorderStatus;

//  }catch(error){
//  console.error("Errorfetchingorderstatus:",error.message);
//  }
//  };

