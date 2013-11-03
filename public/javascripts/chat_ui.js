/*global io, Chat */

function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
	var message = $('#send-message').val()
	  , systemMessage;

	if (message[0] === '/') {
		systemMessage = chatApp.processCommand(message);
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}

	$('#send-message').val('');
}

var socket = io.connect();
$(document).ready(function() {
	var chatApp = new Chat(socket);
	socket.on('nameResult', function(result) {
		var message;

		if (result.success) {
			message = 'You are known as ' + result.name + '.';
		} else {
			message = result.message;
		}

		$('#messages').append(divSystemContentElement(message));
	});

	
});