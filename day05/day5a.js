
const shared = require('../common/base.js');

let answer = 0;

shared.start("day 5A");
const seats = shared.getInput();
seatIDs = seats.reduce((list, seat) => {
                    seat = seat.replace(/F/g, '0');
                    seat = seat.replace(/B/g, '1');
                    seat = seat.replace(/L/g, '0');
                    seat = seat.replace(/R/g, '1');
                    const row = parseInt(seat.substring(0,7), 2);
                    const col = parseInt(seat.substring(7), 2);
                    list.push(row*8+col);
                    return list;
                }, [])
                .sort((a, b) => b-a);
answer = seatIDs[0];                

shared.end(answer);



