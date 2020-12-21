const shared = require('../common/base.js');

let answer = 0;
shared.start("day 19B");
const input = shared.getInput('\n\n');
const rules = input[0].split('\n')
                      .map(analyseRules);
const messages = input[1].split('\n');

// Change rule 8 and 11
let rule=getRule(8);
rule.subruleSets = [[42],[42,8]];
rule=getRule(11);
rule.subruleSets = [[42, 31],[42,11,31]];


answer = messages.reduce(countMatchingMessages, 0);

shared.end(answer);

function analyseRules(rule) {
    const parts = rule.replace(/\"/g, '').split(' ');
    const rulenumber = parseInt(parts[0].replace(':', ''));
    parts.shift();
    return parts.reduce((rule, part) => {
        if (part.match(/[a-z]/)) rule.letter=part;
        if (part==='|') 
            rule.subruleSets.push([]);
        else
            rule.subruleSets[rule.subruleSets.length-1].push(parseInt(part));
        return rule;
    }, {rulenumber, subruleSets: [[]]});
}

function countMatchingMessages(total, message) {  
    const matchingParts = matchingStrings(message, 0, 0);
    if (matchingParts.includes(message)) total++;
    return total;
}

function matchingStrings(message, rulenumber, level) {
    const ruleDefinition = getRule(rulenumber);

    if (ruleDefinition.letter) {
        if (message.substring(0, 1)===ruleDefinition.letter) return [ruleDefinition.letter];
        return [];
    } 

    let matchingSets=[];
    for (let set = 0; set<ruleDefinition.subruleSets.length; set++) {
        const subruleSet = ruleDefinition.subruleSets[set];
        let setMatches=[''];
        for (let rule = 0; rule<subruleSet.length; rule++) {
            const newSetMatches=[];
            for (let s=0; s<setMatches.length; s++) {
                const matching = matchingStrings(message.substring(setMatches[s].length), subruleSet[rule], level+1);
                matching.forEach(m=> {
                    newSetMatches.push(setMatches[s]+m);
                })               
            }
            setMatches=newSetMatches;
        }
        matchingSets=[...matchingSets, ...setMatches];
    }
    if (matchingSets.length===0||matchingSets[0]==='') return [];
    return matchingSets;
}

function getRule(rulenumber) {
    return rules.find(r=>r.rulenumber===rulenumber);
}