var Solver = (function () {

    function Solver(equations) {
        this.params = Object.keys(equations)
        this.equations = this.parseEquations(equations)
    }
    
    Solver.prototype.parseEquations = function(equations){
        var replacements = {
            power : {
                re: /([\w.]+)\^([\w.]+)/g,
                res: 'Math.pow($1,$2)'
            },
            powerPython : {
                re: /([\w.]+)\*\*([\w.]+)/g,
                res: 'Math.pow($1,$2)'
            },
        }
        for(var key in equations){
            var eq = equations[key]
            for(var re in replacements){
                var repl = replacements[re]
                eq = eq.replace(repl.re, repl.res)
            }
            equations[key] = eq
        }
        return equations;
    }

    Solver.prototype.solve = function solve(obj) {
        var out = {},
            nullCount = Object.keys(this.equations).length,
            lastNull = 0;

        for (var key = 0; key < this.params.length; key++) {
            eval(this.params[key] + '=undefined')
        }

        for (var key in obj) {
            if (this.params.indexOf(key) != -1) {
                eval(key + '=' + obj[key]),
                out[key] = obj[key]
            }
        }

        while (lastNull !== nullCount) {
            lastNull = nullCount;
            for (var eq in this.equations) {
                with(Math)
                    var result = eval(this.equations[eq]);
                if (result) {
                    out[eq] = result;
                    this.equations[eq] = undefined;
                }
            }
            nullCount = Object.keys(this.equations).length;
        }
        return out;
    }

    return Solver;

}());

if (typeof module !== 'undefined') module.exports = Solver;