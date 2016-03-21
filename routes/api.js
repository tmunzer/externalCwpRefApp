var express = require('express');
var router = express.Router();
var API = require(appRoot + "/bin/aerohive/api/main");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
    var email, phone, deliverMethod;
    if (req.body.hasOwnProperty("email")) email = req.body.email;
    if (req.body.hasOwnProperty("phone")) phone = req.body.phone;
    if (phone && email) deliverMethod = 'EMAIL_AND_SMS';
    else if (phone) deliverMethod = "SMS";
    else deliverMethod = "EMAIL";
    API.identity.credentials.POST(
        req.body.vpcUrl,
        req.body.accessToken,
        req.body.ownerId,
        null,
        null,
        {
            phone: phone,
            email: email,
            groupId: req.body.groupId,
            deliverMethod: deliverMethod,
            'policy': 'GUEST'
        },
        function (err, cred){
            if (err) res.json(err);
            else res.json(cred);
        })
});

module.exports = router;
