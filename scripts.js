document.getElementById('createMessageBtn').addEventListener('click', function() {
    const message = document.getElementById('messageInput').value;
    if (message.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    const messageId = generateMessageId();
    localStorage.setItem(messageId, message);

    const messageLink = `${window.location.href}?messageId=${messageId}`;
    document.getElementById('messageLink').textContent = messageLink;
    document.getElementById('messageLink').href = messageLink;
    document.getElementById('messageLinkContainer').style.display = 'block';

    document.getElementById('messageInput').value = '';
});

function generateMessageId() {
    return 'msg-' + Math.random().toString(36).substr(2, 9);
}

window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const messageId = urlParams.get('messageId');
    if (messageId) {
        const message = localStorage.getItem(messageId);
        if (message) {
            document.body.innerHTML = `
                <div id="warningBox" class="warning-box">
                    <p>You only have 2 minutes to read this message.</p>
                    <button id="okButton">OK</button>
                </div>
                <div id="messageContainer" class="container" style="display: none;">
                    <h1>Self-Destructing Message</h1>
                    <p id="messageContent">${message}</p>
                    <p id="timerMessage">You only have 2 minutes to read this message.</p>
                </div>`;
            
            document.getElementById('okButton').addEventListener('click', function() {
                document.getElementById('warningBox').style.display = 'none';
                document.getElementById('messageContainer').style.display = 'block';

                setTimeout(function() {
                    alert('This message will now self-destruct!');
                    window.location.href = window.location.pathname; // Clear URL params
                }, 120000); // 120000 milliseconds = 2 minutes
            });

            localStorage.removeItem(messageId);
        } else {
            alert('This message has already been read or does not exist.');
        }
    }
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.getElementById('screenshotWarning').style.display = 'block';
    } else {
        document.getElementById('screenshotWarning').style.display = 'none';
    }
});
