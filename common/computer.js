
const computer = {
    accumulator: 0,
    visited: [],
    program: [],
    halted: false,
    load(program) {
        this.program = [...program];
    },
    getAccumulator() {
        return this.accumulator;
    },
    hasError() {
        return this.halted;
    },
    run() {
        this.halted = false;
        this.visited = [];
        this.accumulator = 0;
        this.execute(0);
    },    
    execute(pointer) {
        if (pointer>= this.program.length) {
            return;
        }
        if (this.visited.includes(pointer)) {
            this.halted = true;
            return;
        }
        this.visited.push(pointer);
        switch (this.program[pointer].instruction) {
            case 'acc': 
                this.accumulator+=this.program[pointer].value;
                pointer++;
                break;   
            case 'jmp': 
                pointer+=this.program[pointer].value;
                break;   
            case 'nop': 
                pointer++;
                break;   
        }
        this.execute(pointer);
    }
  }
module.exports = { computer };