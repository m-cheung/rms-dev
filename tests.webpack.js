var context = require.context('./public', true, /-test\.js$/);
context.keys().forEach(context);
