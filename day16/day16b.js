
const shared = require('../common/base.js');

let answer = 1;
shared.start("day 16B");
const input = shared.getInput('\n\n');
const fields = input[0].split('\n')
                       .map(line=> {
                            const parts = line.split(':');
                            const field = parts[0];
                            const ranges = parts[1].trim().split(' or ');
                            const validValues = ranges.reduce((list, range) => {
                                let numbers=range.split('-').map(x=>parseInt(x));
                                for (let i = numbers[0]; i <= numbers[1]; i++) {
                                    list.push(i);
                                }
                                return list;
                            }, []);
                            return {field: field, valid: validValues};                        
                       });
const nearby = input[2].split('\n');
nearby.shift();
validTickets = nearby.reduce((list, ticket) => {
                            let isValid = true;
                            ticket.split(',')
                                    .map(x=>parseInt(x))
                                    .forEach(value=>{
                                        let found = false;
                                        for (let i = 0; i<fields.length&&!found; i++){
                                            if (fields[i].valid.some(f=> f===value)) {
                                                found=true;
                                            }
                                        }
                                        if (!found) isValid = false;
                                    });
                                if (isValid) list.push(ticket);
                                return list;
                        },[])
                        .map(t=>t.split(',')
                        .map(t=>parseInt(t)));
myTicket=input[1].split('\n')[1].split(',');

const numberOfFields = validTickets[0].length;
// Get valid columns for field
fields.forEach(field => {
    field.validColumn = [];
    for (let c = 0; c<numberOfFields; c++) {
        let validForField = true;
        for (let t = 0; t<validTickets.length&&validForField; t++) {
            if (!field.valid.some(f=> f===validTickets[t][c])) validForField = false;
        }
        if (validForField) field.validColumn.push(c);
    }
});

// Reduce valid columns
let done = false;
do {
   done=true; 
   fields.filter(f1 => f1.validColumn.length===1)
        .forEach(f1=> {  
            fields.filter(f2 => f2.validColumn.length>1)
                  .forEach(f2=> {
                      f2.validColumn=f2.validColumn.filter(c=>c!==f1.validColumn[0]);
                      if (f2.validColumn.length>1) done=false;
                  })
        }
    );
} while (!done);
// Count departure fields
fields.filter(field=> field.field.substring(0,9)==='departure')
      .forEach(f=> answer=answer*myTicket[f.validColumn[0]]);

shared.end(answer);
