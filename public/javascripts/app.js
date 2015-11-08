
$(document).ready(function() {
    var socket = io();
    var $window = $(window);
    var $m = $('#m');
    var $messages = $('#messages');
    var $chatForm = $('#chatForm');
    var $chatDiv = $('#chatDiv');
    var $usernameDiv = $('#usernameDiv');
    var $usernameForm = $('#usernameForm');
    var $usernameInput = $('#usernameInput');
    $usernameInput.focus();
    var username;

    //$chatDiv.hide();

    //$usernameForm.submit(setUsername());

    $chatForm.submit(function(){
        $messages.append($('<li>').text($m.val()));
        socket.emit('chat', $m.val());
        $m.val('');
        return false;
    });

    $window.keydown(function (event) {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            //$usernameInput.focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            if (username) {
                sendMessage();
                socket.emit('stop typing');
                typing = false;
            } else {
                setUsername();
            }
        }
    });

    function setUsername(){
        username = $usernameInput.val();
        if (username) {
            $usernameDiv.hide();
            $chatDiv.show();
            //$loginPage.off('click');
            //$currentInput = $inputMessage.focus();

            // Tell the server your username
            socket.emit('add user', username);
        }
    }

    function cleanInput (input) {
        return $('<div/>').text(input).text();
    }

    socket.on('chat',function(msg){
       $messages.append($('<li>').text(msg));
    });

    //socket.on('login', function(){
    //    usernameForm.hide();
    //})

});

