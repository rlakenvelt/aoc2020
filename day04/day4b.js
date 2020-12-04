
const shared = require('../common/base.js');

let answer = 0;
const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

shared.start("day 4B");
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
        const property = passport.find(x => x.key===field);
        if (property) {
            switch(property.key) {
                case 'byr':
                    const value1 = parseInt(property.value);
                    if (value1>=1920&&value1<=2002) count++;
                    break;
                case 'iyr':
                    const value2 = parseInt(property.value);
                    if (value2>=2010&&value2<=2020) count++;
                    break;
                case 'eyr':
                    const value3 = parseInt(property.value);
                    if (value3>=2020&&value3<=2030) count++;
                    break;
                case 'hgt':
                    let unit = '';
                    if (property.value.search('in') > 0) unit = 'in';
                    if (property.value.search('cm') > 0) unit = 'cm';
                    const value4 = parseInt(property.value.replace(unit, ''));
                    if (unit==='cm') {
                        if (value4>=150&&value4<=193) count++;
                    }
                    if (unit==='in') {
                        if (value4>=59&&value4<=76) count++;
                    }
                    break;
                case 'hcl':
                    if (property.value.match(/^#([0-9a-f]{6})$/g)) count++;
                    break;
                case 'ecl':
                    if (['amb','blu','brn','gry','grn','hzl','oth'].some(item => item === property.value)) count++;
                    break;
                case 'pid':
                    const value5 = parseInt(property.value);
                    if (value5&&property.value.length===9) count++;
                    break;
            }
        }
        return count;
    }, 0);
    if (fields===7) answer++
});
shared.end(answer);



