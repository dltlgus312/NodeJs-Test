var fs = require('fs');

const options = {
  pfx: fs.readFileSync('./keys/server.pfx'),
  passphrase: 'root'
};

var app = require( 'express' )(  );
var https = require('https').Server( options, app );
var io = require( 'socket.io' )( https );


https.listen(443, ( ) => {
	console.log("https open");
});

// URL ������
app.get('/', ( req, res ) => {
	res.sendfile( 'rtcClient.html' );
});

// Socket io 
io.on( 'connection', ( socket ) => {

	console.log( 'Connection User');

	// �̺�Ʈ ����
	socket.emit( 'new', 'hellow' );

	// �̺�Ʈ �ޱ�
	socket.on('sdp', ( data ) => {
		console.log( 'sdp');	
		socket.broadcast.emit( 'sdp', data );
	});

	socket.on('candidate', ( data ) => {  
		console.log( 'candidate');	
		socket.broadcast.emit( 'candidate', data );
	});
});