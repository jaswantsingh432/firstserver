const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    
    const data1 = {
        members:[
            {
                email_address:email,
                status : "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName

                }
            }
        ]
    };

    const jsonData = JSON.stringify(data1);
    const url = "https://us14.api.mailchimp.com/3.0/lists/5915351c45";

    const option = {
        method:"POST",
        auth:"jaswant:84ebf94d5f84e603e65c275e1ac80bd7-us14"
    }

    const request = https.request(url,option,function(response){
            response.on("data", function(data){
            console.log(JSON.parse(data));
            if (response.statusCode == 200){
                res.sendFile(__dirname+"/success.html")
            }
            else{
                res.sendFile(__dirname+"/failure.html")
            }
        })
    });

    request.write(jsonData);
    request.end();

});


app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT, function(){
    console.log("Server stared on port 3000");
})