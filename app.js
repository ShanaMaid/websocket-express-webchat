var express = require('express');
var socket = require('socket.io');
var app = express();

var person = [];//记录在线情况
var history = [];//需要缓存的消息
var history_num = 20 ; //服务器存储的历史消息条数
var server = app.listen(80);
var io = new socket(server);

app.use(express.static('node_modules'));
app.use('/static',express.static('public'));

app.get('/',  (req, res)  => {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection',  (socket) => {
	var user = '';
	var id;
	socket.emit('history',history); //发送服务器记录的历史消息
	io.sockets.emit('updatePerson', person);


	socket.on('sendMsg', (data) => {
		io.sockets.emit('news',{data:data,time:Now(),user:user});
		if (history.length==history_num)
			history.shift();
		history.push({data:data,time:Now(),user:user});
	});

	socket.on('setUserName',(data) => {
		user = data;
		person.push(user);
		id = person.length - 1;//数组下标
		io.sockets.emit('updatePerson',person);
		io.sockets.emit('news',{data:user+'进入房间',time:Now(),user:'系统消息'});
	});

	socket.on('disconnect',  (socket) => {
		if(user!='') {
			io.sockets.emit('news', {data: user + '离开房间', time: Now(), user: '系统消息'});
			person.splice(id,1);
		}
		io.sockets.emit('updatePerson', person);
	});

});

function  Now() {
	var date = new Date();
	var time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	return time;
}





