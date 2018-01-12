var app = require('../server');
var http = require('http');
var debug = require('debug')('server:server');
var port = normalizePort(process.env.PORT || '8233');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('started on http://localhost:' + port);

// var db = require('../mysql/connect');
// var client = db.connectServer();

// var count;
// db.employeeNo_search(client, function(result) {
//     count = result.length;
//     console.log(result[0]);
//     var data = {
//         name: '朱格建国',
//         sex: '男',
//         address: '中南民族大学',
//         workTelExt: '15928221807',
//         homeTelNo: '15928221807',
//         emplEmailAddress: '1102304904@qq.com',
//         sociaSecurityNumber: '1102304904',
//         DOB: '1997-03-23',
//         position: '技术总监',
//         salary: '100000',
//         dateStarted: '2018-01-11',
//         employeeNo: '2018' + (count + 1)
//     }
//     db.employee_add(client, data, function(result) {

//     })
// })

//对port进行一些处理，使之能用
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}



function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port

    switch (error.code) {
        case 'EACCES':
            console.log(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'Pipe ' + addr :
        'port ' + addr.port;
}