var fs      = require('fs');
var request = require('request');
var cards = require('./cards.json');



var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    if (err) callback(err, filename);
    else {
        var stream = request(uri);
        stream.pipe(
            fs.createWriteStream(filename)
                .on('error', function(err){
                    callback(error, filename);
                    stream.read();
                })
            )
        .on('close', function() {
            callback(null, filename);
        });
    }
  });
}



cards.map(card => card.idName)
     .map(idName => ({url: `http://www.clashapi.xyz/images/cards/${idName}.png`, fileName:`${idName}.png`}))
     .forEach(({url, fileName}, idx) => {


            setTimeout(()=>{
                download(url, fileName, ()=>{
                    console.log('DONE ', url);
                });


            }, idx*100);

                      
     })


// const url = `http://www.clashapi.xyz/images/cards/${cardIdName}.png`
// const url = `http://www.clashapi.xyz/images/cards/goblins.png`;
// let fileName = 'goblin.png'


// request.get({url, encoding: null}, function (err, response, body) {
//   fs.writeFile("/Users/yaronbiton/Dev/VueJS/ClashRocards/static/img/cards/goblin.png", body, 'binary', function(err) {
//     if(err)
//       console.log(err);
//     else
//       console.log("The file was saved!");
//   }); 
// });




