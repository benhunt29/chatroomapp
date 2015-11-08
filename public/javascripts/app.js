
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
    var $usernameDisplay = $('#usernameDisplay');
    $usernameInput.focus();
    var username;

    $chatDiv.hide();

    //$usernameForm.submit(setUsername());

    function addChatMessage(data){
        var $msg = $('<span>').text(data.message);
        var $user = $('<span>').text(data.username + ': ');
        $messages.append($('<li>'));
        var $msgLi = $messages.children().last();
        $msgLi.append($user,$msg);
        $chatDiv.scrollTop($chatDiv.prop("scrollHeight"));
    }

    function userJoined(data){
        var $userInfo = $('<span>').text(data.userInfo + ' joined the chat. ');
        var $numUsers = $('<span>').text('There are ' + data.numUsers + ' users currently in the chat.');
        $messages.append($('<li>'));
        var $msgLi = $messages.children().last();
        $msgLi.append($userInfo,$numUsers);
        $chatDiv.scrollTop($chatDiv.prop("scrollHeight"));
    }

    function sendMessage(){

        var messageObj = {
            message: $m.val(),
            username: username
        };
        addChatMessage(messageObj);

        socket.emit('chat', messageObj);
        $m.val('');
        return false;
    };

    $window.keydown(function (event) {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $usernameInput.focus();
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
            $usernameDisplay.text(username);
            $chatDiv.show();
            //$loginPage.off('click');
            $m.focus();

            // Tell the server your username
            socket.emit('add user', username);
        }
    }

    function cleanInput (input) {
        return $('<div/>').text(input).text();
    }

    socket.on('chat',function(data){
        addChatMessage(data);
    });

    socket.on('user joined', function(data){
       userJoined(data);
    });

});

