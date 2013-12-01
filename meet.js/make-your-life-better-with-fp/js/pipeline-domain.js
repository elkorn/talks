/* module 1, domain-related */
function compute(baseValue) {
    var x1 = Math.sqrt(Math.exp(baseValue));
    var x2 = Math.pow(Math.atan(baseValue), baseValue % 3);
    return parseInt(Math.pow(x1, x2), 10);
}