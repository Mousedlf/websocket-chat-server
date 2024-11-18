const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req,res)=>{
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('serveur nodejs en fonctionnement');
});

const io = socketIo(server, {
	transports: ['websocket', 'polling'],
	cors: {
		origin: '*', // url appli
		methods: ['GET','POST','PUT','DELETE']
	}
});

io.on('connection', (socket)=>{
	console.log('New user socket id' + socket.id);

	socket.on('message', (msg)=>{
		console.log('Received message from the client : ' + msg);

		//io.emit('message',"A user joined")
		io.emit('message',{
			author : socket.id,
			content: msg,
		});
	})


})

server.listen(8080, ()=>{
	console.log('Server listening on port 8080');
});
