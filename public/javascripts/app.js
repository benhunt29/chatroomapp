
$(document).ready(function() {
    var socket = io();

    var $m = $('#m');
    var $messages = $('#messages');
    var $chatForm = $('#chat');
    $chatForm.submit(function(){
        $messages.append($('<li>').text($m.val()));
        socket.emit('chat', $m.val());
        $m.val('');
        return false;
    });

    socket.on('chat',function(msg){
       $messages.append($('<li>').text(msg));
    });
});

