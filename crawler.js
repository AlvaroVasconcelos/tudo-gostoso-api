var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')
const readline = require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


rl.question('O que você deseja cozinhar hoje? ',  (answer) => {
    
    searching(answer,(result)=>{
         
        chooseOption(result)
        
    })     
    
    
rl.close();
});


function chooseOption(result){

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    for ( var i = 0;i<result.length;i++){console.log(i,': ',result[i].title)}

    rl.question('Escolha uma opção acima ',  (answer) => {
        acessRecipe(result[answer].link)
        
        rl.close()
    })
}


 function searching(answer, callback){
    request('https://www.tudogostoso.com.br/busca?page=1&q='+answer, function(err,res,body){

        if(err) console.log('Erro: ' + err);
        var $ = cheerio.load(body);
        var results = []

        $('.col-lg-5 > .rounded').find('.card.recipe-card.recipe-card-with-hover a').each(function(){
            var title = $(this).find('.recipe-title').text().trim()
            var link = $(this).attr('href').trim()
            results.push({title: title, link: link})
        });
        
        return callback(results)
        
    });
}
function acessRecipe(option, callback){
    request('https://www.tudogostoso.com.br'+option, function(err,res,body){
        if(err) console.log('Erro: ' + err);
        var $ = cheerio.load(body);
        var results = []
        console.log($('.col-lg-8.ingredients-card > ul >li>span>p').text().trim())
        console.log($('.instructions.e-instructions > ol >li>span>p').text().trim())
        
        
        


    })

}