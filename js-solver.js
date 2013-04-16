var Solver = (function () {

    function Solver(equations){
        this.params = Object.keys(equations)
        this.equations = equations
    }
    
    Solver.prototype.solve = function solve(obj) {        
        var out = {},
            nullCount = Object.keys(this.equations).length,
            lastNull = 0
        
        for (var key in this.params) {
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

if(typeof module !=='undefined')
    module.exports = Solver;