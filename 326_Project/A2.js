var app = require("express")(); 
var bodyParser = require("body-parser"); 
var path = require('path');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://abhinavp403:tplanners123@travelplanner-kpu15.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var arr1 = [];
var arr2 = [];
var arr3 = [];
var t1 = new Map();
var t2 = new Map();
var t3 = new Map();
var d1 = new Map();
var d2 = new Map();
var d3 = new Map();
var name;
var hotel;

//Set view engine to ejs
app.set("view engine", "ejs"); 

//Tell Express where we keep our index.ejs 
app.set("views", __dirname + "/views"); 
app.engine('html', require('ejs').renderFile);

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

app.get('/', function(req, res) {
    __dirnamee = __dirname + "\\views";
    res.sendFile(path.join(__dirnamee + '/abcd.html'));
});

app.get("/", (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        client.connect(err => {
            console.log('Connected...');
            const collection1 = client.db("TravelPlanner").collection("Restaurants");
            const collection2 = client.db("TravelPlanner").collection("Sites");
            const collection3 = client.db("TravelPlanner").collection("Bars");
            collection1.find({}, {projection: {Name: 1}}).toArray(function(err, doc) { 
                if (doc == null) {
                    db.close();
                }
                for(var i=0; i<doc.length; i++)
                    arr1[i] = doc[i].Name;
            });
            collection2.find({}, {projection: {Name: 1}}).toArray(function(err, doc) { 
                //console.log(doc);
                if (doc == null) {
                    db.close();
                }
                for(var i=0; i<doc.length; i++)
                    arr2[i] = doc[i].Name;
            });
            collection3.find({}, {projection: {Name: 1}}).toArray(function(err, doc) { 
                //console.log(doc);
                if (doc == null) {
                    db.close();
                }
                for(var i=0; i<doc.length; i++)
                    arr3[i] = doc[i].Name;
            });
        });
    });    
});

app.post("/", function (req, res) {
    console.log(req.body['day']);
    var day = req.body['day'];
    name = req.body['firstname'];
    hotel = req.body['hoteladdress'];
    MongoClient.connect(uri, function(err, db) {
        client.connect(err => {
            console.log('Connected...');
            const collection1 = client.db("TravelPlanner").collection("Restaurants");
            const collection2 = client.db("TravelPlanner").collection("Sites");
            const collection3 = client.db("TravelPlanner").collection("Bars");
            collection1.find().toArray(function(err, doc) {
                if (doc == null)
                    db.close();
                for(var i=0; i<doc.length; i++)
                    if(doc[i][day] !== "") {
                        arr1.push(doc[i]["Name"]);
                        t1.set(doc[i]["Name"], doc[i][day]);
                        d1.set(doc[i]["Name"], doc[i]["Duration"]);
                    }
            });
            collection2.find().toArray(function(err, doc) {
                if (doc == null)
                    db.close();
                for(var i=0; i<doc.length; i++)
                    if(doc[i][day] !== "") {
                        arr2.push(doc[i]["Name"]);
                        t2.set(doc[i]["Name"], doc[i][day]);
                        d2.set(doc[i]["Name"], doc[i]["Duration"]);
                    }
            });
            collection3.find().toArray(function(err, doc) {
                if (doc == null)
                    db.close();
                for(var i=0; i<doc.length; i++)
                    if(doc[i][day] !== "") {
                        arr3.push(doc[i]["Name"]);
                        t3.set(doc[i]["Name"], doc[i][day]);
                        d3.set(doc[i]["Name"], doc[i]["Duration"]);
                    }
            });
        });
    });
    res.render("abcd.html", {restaurants: arr1, sites: arr2, bars: arr3, restaurants_timings: t1, sites_timings: t2, bars_timings: t3, restaurants_duration: d1, sites_duration: d2, bars_duration: d3}); 
});

app.route('/Output')
 	.post(function (req, res) {
        var pathn = process.cwd();
        res.sendFile(pathn + "\\views" + '/output.html');
        res.render("output.html", {name: name, hotel: hotel});
	});

app.listen(8080, function() { console.log("Server online on http://localhost:8080"); });