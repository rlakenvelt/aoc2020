
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 18B");
const expressions = shared.getInput();

answer = expressions.reduce((total, expression) => {
                        const result = calculate(expression);
                        total += result;
                        return total;
                    }, 0)

shared.end(answer);

function tokenize(expression) {
    var results = expression.replace(/\(/g, ' ( ')
                            .replace(/\)/g, ' ) ')
                            .split(' ')
                            .filter(c=>c!=' '&&c!='');
    return results;
}

function calculate(expression) {
    const tokens = tokenize(expression);
    const valueStack = [];
    const parenthesesStack = [];
    let stack = [];
    const operandStack = [];    
    let lastToken = '';
    let count = 0;
    let length = tokens.length;
    // Preprocess tokens. Put parenthesis around + operators
    for (let i = 0; i<length; i++) {
        if (tokens[i] === '+') {

            length++;
            let openParenthesis = 0;

            for (let j = i; j>=0; j--) {
                if (tokens[j]===')') openParenthesis++;
                if (tokens[j]==='(') openParenthesis--;
                if ((tokens[j]==='(' || tokens[j].match(/^[0-9]+$/)) &&openParenthesis===0) {
                    tokens.splice(j, 0, "(");
                    length++;                    
                    break;
                }
            }
            openParenthesis=0;            
            i++;
            for (let j = i; j< length; j++) {
                if (tokens[j]==='(') openParenthesis++;
                if (tokens[j]===')') openParenthesis--;
                if ((tokens[j]===')' || tokens[j].match(/^[0-9]+$/)) &&openParenthesis===0) {
                    tokens.splice(j+1, 0, ")");
                    length++;                    
                    break;
                }
            }
        }
    }
    // Create RPN stack
    do {
        token = tokens.shift();
        if (token.match(/^[0-9]+$/)) {
            stack.push({type: "number", value: parseInt(token)});

            if (lastToken!='('&&operandStack.length>0) {
                stack.push(operandStack.pop());
            }            
        } else
        if (token.match(/^[\+\*]+$/)) {
            operandStack.push({type: "operand", value: token, level: parenthesesStack.length});
        } else
        if (token==='(') {
            parenthesesStack.push(token);
        } else 
        if (token===')') {
            parenthesesStack.pop();
            if (operandStack.length>0) {
                lastOperand = operandStack[operandStack.length-1];
                if (lastOperand.level===parenthesesStack.length) {
                    stack.push(operandStack.pop());
                }
            }
        }       

        count++;
        lastToken=token;
    } while (tokens.length > 0);
    stack=[...stack,...operandStack];
    // Execute RPN stack
    do {
        const entry = stack.shift();
        if (entry.type==='number') valueStack.push(entry.value);
        if (entry.type==='operand') {
            const value1 = valueStack.pop();
            const value2 = valueStack.pop();
            switch (entry.value) {
                case '+': 
                  valueStack.push(value1+value2);
                  break;                 
                  case '*': 
                  valueStack.push(value1*value2);
                  break;                             
            }
        }

    } while (stack.length > 0);

    return valueStack[0];

}


