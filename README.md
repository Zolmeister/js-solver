##js-solver
###algebraic equation solving helper library

##include
<pre><code>//node.js
var Solver = require('./js-solver')
//browser
&lt;script src='js-solver.js'>&lt;/script>
</code></pre>


##usage
<pre><code>var mySolver = new Solver({
  a: 'b+c',
  b: 'a-c',
  c: 'a-c'
})

mySolver.solve({
  b: 2,
  c: 3
})
/* solved for 'a' based on equation
  {
    a:5, b:2, c:3
  }
*/
</code></pre>

##more in depth example
<pre><code>var triangleSolver = new Solver({
    area: 'base*h/2',
    c: 'Math.sqrt(Math.pow(a,2)+Math.pow(b,2)) || base/2', //base/2 is an example of a dual-equation definition
    a: 'Math.sqrt(Math.pow(c,2)-Math.pow(b,2))',
    b: 'Math.sqrt(Math.pow(c,2)-Math.pow(a,2))',
    h: 'area*2/base',
    base: 'area*2/h'
})
triangleSolver.solve({
    c: 5,
    b: 3,
    area: 50,
    h: 10
}))
/*
  { c: 5, b: 3, area: 50, h: 10, a: 4, base: 10 }
*/
</code></pre>


###notes:
The equations are evaled, so be aware of that.
