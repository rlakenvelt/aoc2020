
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 16A");
const input = shared.getInput('\n\n');
const fields = input[0].split('\n')
                       .map(line=> {
                            const words = line.split(' ');
                            const field = words[0].replace(':', '');
                            const validValues = [];
                            let range=words[1].split('-');
                            for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
                                validValues.push(i);
                            }
                            range=words[3].split('-');
                            for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
                                validValues.push(i);
                            }
                            return {field: field, valid: validValues};                        
                       });

const nearby = input[2].split('\n');
nearby.shift();
answer = nearby.reduce((total, ticket) => {
          ticket.split(',')
                .map(x=>parseInt(x))
                .forEach(value=>{
                    let found = false;
                    for (let i = 0; i<fields.length; i++){
                        if (fields[i].valid.some(f=> f===value)) {
                            found=true;
                            break;
                        }
                    }
                    if (!found) total+=value;
                });
          return total;
      },0);


shared.end(answer);



