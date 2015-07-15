var Reflect = require('reflect');

function Checker(data) {
    var ast = Reflect.parse(data);
    return getRequires([], ast.body);
}

function getRequires(requires, body) {
    for (var i = 0; i < body.length; i++) {
        if (!body[i] || !body[i].type) return;

        if (body[i].type === 'VariableDeclarator') {
            getRequires(requires, [body[i].init])
        }
        if (body[i].type === 'VariableDeclaration') {
            getRequires(requires, body[i].declarations)            
        }
        if (body[i].type === 'ConditionalExpression') {
            getRequires(requires, [body[i].test, body[i].consequent])
        }
        if (body[i].type === 'ExpressionStatement') {
            getRequires(requires, [body[i].expression.left, body[i].expression.right])
        }
        if (body[i].type === 'FunctionDeclaration') {
            getRequires(requires, (body[i].body.body || []))
        }
        if (body[i].type === 'CallExpression') {
            if (body[i].callee.type === 'MemberExpression') {
                getRequires(requires, [body[i].callee.object])
            }

            if (body[i].callee.name === 'require') {
                requires.push(body[i].arguments[0].value)
            }
        }
    }
    return requires;
}

module.exports = Checker;