const shared = require('../shared');

const passwords = shared.getInput();
shared.start("day 2A");
let answer = 0;
passwords.forEach(line => {
    const element = line.split(' ').map(x =>x);
    const min = element[0].split('-')[0];
    const max = element[0].split('-')[1];
    const character = element[1].split(':')[0];
    const password = element[2]; 
    const occurences = password.split(character).length-1;
    if (occurences>=min && occurences <=max) answer++;
})
shared.end(answer);

