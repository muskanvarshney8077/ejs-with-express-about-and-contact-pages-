const express=require ('express');
const bodyParser=require ('body-parser');
const date = require(__dirname + "/date.js");
console.log(date());

const app=express();
var items = ['cook food','eat food','tea'];
var workItems=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

	
app.get("/",function(req,res)
{
	var day = date();
	res.render("list",{listTitle:day , newListItems:items  });
	
});

app.get("/work",function(req,res)
{
	res.render("list",{listTitle:"work list" , newListItems:workItems  });
})
app.get("/about",function(req,res)
{
	res.render("about");
})

app.post("/work",function(req,res)
{
	
	var item=req.body.newItem;
	workItems.push(item);
	res.redirect('/work');
})

app.post("/",function(req,res)
{   
    var item=req.body.newItem;
    console.log(req.body);
	if(req.body.list === "work")
	{
		workItems.push(item);
		res.redirect("/work");
	}
	else
	{
	items.push(item);
	res.redirect('/');	
	}
}
);



app.listen(3000,function()
{
	console.log("connected");
})