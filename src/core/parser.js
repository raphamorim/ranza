var BabelCore = require('babel-core');

function Parser(data) {
    var ast = BabelCore.parse(data);
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
        if (body[i].type === 'AssignmentExpression') {
            getRequires(requires, [body[i].left, body[i].right])
        }
        if (body[i].type === 'ExpressionStatement') {
            if (body[i].expression.type === 'SequenceExpression')
                getRequires(requires, body[i].expression.expressions)

            getRequires(requires, [body[i].expression.left, body[i].expression.right])
        }
        if (body[i].type === 'FunctionDeclaration') {
            getRequires(requires, (body[i].body.body || []))
        }
        if (body[i].type === 'ImportDeclaration') {
            requires.push(body[i].source.value);
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

module.exports = Parser;