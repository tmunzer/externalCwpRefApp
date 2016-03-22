var express = require('express');
var router = express.Router();
var API = require(appRoot + "/bin/aerohive/api/main");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/', function (req, res, next) {
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
        function (err, cred) {
            if (err) res.json(err);
            else res.json(cred);
        })
});

router.post("/resendCredentials", function (req, res, next) {
    var email, phone;
    var credentials =req.body.credential.replace("+", "%2B");
    if (req.body.credential.indexOf("@") >= 0) email = req.body.credential;
    else phone = req.body.credential.replace("+", "%2B");
    API.identity.credentials.GET(
        req.body.vpcUrl,
        req.body.accessToken,
        req.body.ownerId,
        null, null, null, null, null, credentials,
        null, null, null, null, null, null,
        function (err, accounts) {
            console.log(accounts);

            if (err) res.json(err);
            else if (accounts.length === 0) res.json({error: "cant' find your account..."});
            else {
                accounts.forEach(function(account){
                    if (account.userName == req.body.credential){
                        var hmCredentialDeliveryInfoVo = {};
                        if (email && phone)
                            hmCredentialDeliveryInfoVo = {
                                "credentialId": account.id,
                                "deliverMethod": "EMAIL_AND_SMS",
                                "email": email,
                                "phone": phone
                            };
                        else if (email)
                            hmCredentialDeliveryInfoVo = {
                                "credentialId": account.id,
                                "deliverMethod": "EMAIL",
                                "email": email,
                                "phone": ""
                            };
                        else
                            hmCredentialDeliveryInfoVo = {
                                "credentialId": account.id,
                                "deliverMethod": "SMS",
                                "email": "",
                                "phone": phone
                            };
                        API.identity.credentials.DELIVER(
                            req.body.vpcUrl,
                            req.body.accessToken,
                            req.body.ownerId,
                            null, null,
                            hmCredentialDeliveryInfoVo,
                            function (err, result) {
                                if (err) res.json(err);
                                else res.json(result);
                            });
                    }
                })

            }
        });

});

module.exports = router;
