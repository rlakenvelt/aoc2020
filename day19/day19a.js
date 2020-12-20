
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 19A");
const input = shared.getInput('\n\n', 'inputa');
const rules = input[0].split('\n')
                      .map(analyseRules);

const messages = input[1].split('\n');

answer = messages.reduce(countMatchingMessages, 0);

shared.end(answer);

function analyseRules(rule) {
    rule = rule.replace(/\"/g, '');  
    const parts = rule.split(' ');
    const rulenumber = parseInt(parts[0].replace(':', ''));
    parts.shift();
    let letter = '';
    const subrules = [[]]
    parts.forEach(part=>{
        if (part.match(/[a-z]/)) {
            letter = part;
        } else {
            if (part==='|') {
                subrules.unshift([]);
            } else {
                subrules[0].push(parseInt(part));
            }
        }
    });
    return {rulenumber, letter, subruleSets: subrules.reverse()};
  }

function countMatchingMessages(total, message) {  
    const matchingPart = matches(message, 0, 0);
    // console.log('MESSAGE', matchingPart.length, message.length, matchingPart, message);
    if (matchingPart.length===message.length) total++; 
    return total;
}

function matches(message, rulenumber, level) {
    let totalmatch='';
    if (message==='') return '';
    const ruleDefinition = rules.find(r=>r.rulenumber===rulenumber);
    if (ruleDefinition.letter!=='') {
        if (message.substring(0, 1)!==ruleDefinition.letter) {
        // console.log(fill(level), 'NO MATCH', message, ruleDefinition.letter);
        return '';
        }
        // console.log(fill(level), 'MATCH', message, ruleDefinition.letter);
        return ruleDefinition.letter;
    } 

    // console.log(fill(level), 'CHECK MATCH', message, rulenumber, ruleDefinition.subruleSets);
    let ruleMatches = false;
    for (let set = 0; set<ruleDefinition.subruleSets.length&& !ruleMatches; set++) {
        const subruleSet = ruleDefinition.subruleSets[set];
        let setMatches = true;
        totalmatch='';
        // console.log(fill(level), 'SUBRULESET START', subruleSet);
        for (let rule = 0; rule<subruleSet.length; rule++) {
            // console.log(fill(level), 'CALC RULE', subruleSet[rule], totalmatch, message);
            const matching = matches(message.substring(totalmatch.length), subruleSet[rule], level+1);
            if (matching==='') {
                setMatches = false;
                break;
            }
            totalmatch+=matching;
        }
        if (setMatches) {
            ruleMatches=true;
        }
        // console.log(fill(level), 'SUBRULESET END', subruleSet, ruleMatches);
    }
    // console.log(fill(level), 'RULE MATCHES', ruleMatches);
    
    if (!ruleMatches) return '';
    // console.log(fill(level), 'MATCHCOUNT', totalmatch);

    return totalmatch;
}

function fill(count) {
    return '.'.repeat(count*3) ;
}

