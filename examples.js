if (!Solver){
    var Solver = require('./js-solver')
}

var triangleSolver = new Solver({
    area: 'base*h/2',
    c: 'Math.sqrt(a^2+b^2) || base/2',
    a: 'Math.sqrt(Math.pow(c,2)-Math.pow(b,2))',
    b: 'sqrt(c**2-a**2)',
    h: 'area*2/base',
    base: 'area*2/h'
})

var rectangleSolver = new Solver({
    area: 'l*w',
    l: 'area/w',
    w: 'area/l',
    perimiter: 'sqrt(s1)+cos(s2)+tan(s3)+s4*PI',
    s1: 's1',
    s2: 's2',
    s3: 's3',
    s4: 'perimiter-s1-s2-s3',
});

console.log(triangleSolver.solve({
    base: 4
}));
console.log(triangleSolver.solve({
    c: 5,
    b: 3,
    area: 50,
    h: 10
}))
console.log(rectangleSolver.solve({
    area: 100,
    l: 10,
    s1: 10,
    s2: 10,
    s3: 10,
    s4: 1
}))
