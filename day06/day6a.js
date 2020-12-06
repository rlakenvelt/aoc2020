
const shared = require('../common/base.js');

shared.start("day 6A");
const groups = shared.getInput('\n\n');
const answer = groups.reduce(countQuestionsPerGroup, [])
                     .reduce(countGroups, 0);      

shared.end(answer);

function countGroups(total, list) {
    total += list.length;
    return total;
}

function countQuestionsPerGroup (list, line) {
    const passengers = line.split('\n')
                           .reduce((list, item) => {
                               const questions = item.split('');
                               return [...list, ...questions];
                           }, []);
    list.push([...new Set(passengers)]);
    return list;
}
