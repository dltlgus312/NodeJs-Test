var app = require( 'express' )(  );
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );

// URL ������
app.get('/', ( req, res ) => {
	res.sendfile( 'rtcClient.html' );
});

// ���� ����
http.listen( 3000, (  ) => {
	console.log( 'listening on :3000' );
});

// Socket io �����
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