var app = require( 'express' )(  );
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );

// URL ������
app.get('/', ( req, res ) => {
	res.sendfile( 'client.html' );
});

// ���� ����
http.listen( 3000, (  ) => {
	console.log( 'listening on :3000' );
});

// Socket io �����
io.on( 'connection', ( socket ) => {

	console.log( 'a user connected' );

	// �̺�Ʈ ����
	socket.emit( 'new connection', 'hellow world' );

	// �̺�Ʈ �ޱ�
	socket.on('user chat', ( msg ) => {  
		console.log( msg );	
		io.emit( 'user chat', msg );
	});
});