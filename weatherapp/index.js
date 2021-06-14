//e052e23cda99505aac4836bd4ba3c781
//api.openweathermap.org/data/2.5/weather?q=gwalior&appid=e052e23cda99505aac4836bd4ba3c781
const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homefile = fs.readFileSync("home.html" , "utf-8");
const replaceVal = (tempval,orgval) => {
    let temperature =tempval.replace("{%tempval%}", orgval.main.temp);
        // temperature=tempval.replace("{%weather%}",orgval.weather.main)
     temperature =temperature.replace("{%location%}", orgval.name);
     temperature =temperature.replace("{%country%}", orgval.sys.country);
     return temperature;
    // res.wr

}
const server = http.createServer( (req,res) => {
if(req.url=="/")
{
    requests("https://api.openweathermap.org/data/2.5/weather?q=gwalior&appid=e052e23cda99505aac4836bd4ba3c781")
.on('data', (chunk) => {
    const objdata = JSON.parse(chunk);
    //object to array
    const arrdata = [objdata];

    const realdata = arrdata.map((val)=> 
        replaceVal(homefile,val)).join("");
       res.write(realdata);
      // console.log(realdata);
    //console.log(arrdata[0].main.temp) ;
})
.on('end', (err) => {
  if (err) return console.log('connection closed due to errors', err);
 res.end();
 
});

}
});
server.listen(8000, "127.0.0.1");