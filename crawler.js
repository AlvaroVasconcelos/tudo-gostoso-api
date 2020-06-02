var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')
const readline = require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
rl.question('O que você deseja cozinhar hoje? ', (answer) => {
    searching(answer)


rl.close();
});

function searching(answer){
    request('https://www.tudogostoso.com.br/busca?page=1&q='+answer, function(err,res,body){

        if(err) console.log('Erro: ' + err);

        var $ = cheerio.load(body);
        results = []

        $('.col-lg-5 > .rounded').find('.card.recipe-card.recipe-card-with-hover a').each(function(){
            var title = $(this).find('.recipe-title').text().trim()
            var link = $(this).attr('href').trim()
            results.push([title, link])
        });

        console.log(results)
    });
}
