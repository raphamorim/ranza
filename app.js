var BabelCore = require('babel-core');

// var data = require('fs').readFileSync('./src/core/colorizer.js', 'utf-8');
var data = require('fs').readFileSync('./src/cli.js', 'utf-8');

var ast = BabelCore.parse(data);

// console.log(ast.body)

var requires = [];
function getDependenciesFromRequires(body) {
    for (var i = 0; i < body.length; i++) {
        if (!body[i] || !body[i].type) return;

        if (body[i].type === 'VariableDeclarator') {
            getDependenciesFromRequires([body[i].init])
        }
        if (body[i].type === 'VariableDeclaration') {
            getDependenciesFromRequires(body[i].declarations)            
        }
        if (body[i].type === 'ExpressionStatement') {
            getDependenciesFromRequires([body[i].expression.left, body[i].expression.right])
        }
        if (body[i].type === 'ConditionalExpression') {
            getDependenciesFromRequires([body[i].test, body[i].consequent])
        }
        if (body[i].type === 'FunctionDeclaration') {
            getDependenciesFromRequires((body[i].body.body || []))
        }
        if (body[i].type === 'ImportDeclaration') {
            requires.push(body[i].source.value);
        }
        if (body[i].type === 'CallExpression') {
            if (body[i].callee.type === 'MemberExpression') {
                getDependenciesFromRequires([body[i].callee.object])
            }

            if (body[i].callee.name === 'require') {
                requires.push(body[i].arguments[0].value)
            }
        }
    }
    return requires;
}

var body = ast.body;
console.log(getDependenciesFromRequires(body))