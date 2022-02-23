var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "5rjrq8c7bn4zncfy",
  publicKey: "wf5z5gbdkggxdtf6",
  privateKey: "2c4f04064ed19b0eb02dcd050a72864d"
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
