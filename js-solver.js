let Solver = (function () {

    function Solver(equations) {
        this.params = Object.keys(equations)
        this.equations = this.parseEquations(equations)
    }
    
    Solver.prototype.parseEquations = function(equations){
        let replacements = {
            power : {
                re: /([\w.]+)\^([\w.]+)/g,
                res: 'Math.pow($1,$2)'
            },
            powerPython : {
                re: /([\w.]+)\*\*([\w.]+)/g,
                res: 'Math.pow($1,$2)'
            },
        }
        for(let key in equations){
            let eq = equations[key]
            for(let re in replacements){
                let repl = replacements[re]
                eq = eq.replace(repl.re, repl.res)
            }
            equations[key] = eq
        }
        return equations;
    }

    Solver.prototype.solve = function solve(obj) {
        let out = {},
            nullCount = Object.keys(this.equations).length,
            lastNull = 0;

        for (let key = 0; key < this.params.length; key++) {
            eval(this.params[key] + '=undefined')
        }

        for (let key in obj) {
            if (this.params.indexOf(key) != -1 && (obj[key]==0 || obj[key])) {
                eval(key + '=' + obj[key]),
                out[key] = obj[key]
            }
        }
        let equations = JSON.parse(JSON.stringify(this.equations))
        while (lastNull !== nullCount) {
            lastNull = nullCount;
            for (let eq in equations) {
                with(Math)
                    var result = eval(equations[eq]);
                if (result) {
                    out[eq] = result;
                    equations[eq] = undefined;
                }
            }
            nullCount = Object.keys(equations).length;
        }
        return out;
    }

    return Solver;

}());

if (typeof module !== 'undefined') module.exports = Solver;