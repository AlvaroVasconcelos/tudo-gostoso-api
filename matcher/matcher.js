const  rules = require('./rules.js')

let sample = "Mexa em fogo alto até começar a estourar a pipoca (pode demorar uns 15 minutos), tenha cuidado para não se queimar quando a pipoca pular.";

let match = /.* ([0-9]+) (minutos).*/
const flags = {};
for(var option in rules){
    //console.log(option);
    flags[option] = sample.match(rules[option])?true:false;
}
console.log(flags);

module.exports = {}