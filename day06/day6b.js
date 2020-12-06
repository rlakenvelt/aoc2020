
const shared = require('../common/base.js');

shared.start("day 6B");
const groups = shared.getInput('\n\n');
const answer = groups.reduce(countQuestionsPergroup, [])
                     .reduce(countGroups, 0);      

shared.end(answer);

function countGroups(total, list) {
    total += list.length;
    return total;
}

function countQuestionsPergroup (list, line) {
    const passengers = line.split('\n')
                           .reduce((list, item, index) => {
                               const questions = item.split('');
                               if (index===0)  return [...questions];
                               return list.filter(question => questions.includes(question));
                           }, []);
    list.push(passengers);
    return list;
}



