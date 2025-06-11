const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'rzp_test_QtnS8TbkLtokIo', // Replace with your Razorpay Test Key ID
    key_secret: 'lVenYqGGSu1Uf2nNEVLdiYyM', // Replace with your Razorpay Test Secret
});

module.exports = razorpay;
