
const shared = require('../common/base.js');

let answer = 0;
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

shared.start("day 4A");
const rows = shared.getInput();
const passports = rows.reduce((list, line) => {
    if (line==='') {
        list.push([]);
        return list;
    }
    const pairs = line.split(' ')
                      .reduce((list, pair) => {
                          list.push({key: pair.split(':')[0], value: pair.split(':')[1]});
                          return list;
                      }, []);
    list[list.length-1].push(...pairs);
    return list;
}, [[]]);           
passports.forEach(passport => {
    const fields = required.reduce((count, field) => {
        if (passport.find(x => x.key===field)) count++;
        return count;
    }, 0);
    if (fields===7) answer++
});
shared.end(answer);



