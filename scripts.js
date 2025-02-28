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

function startCountdown(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert('This message will now self-destruct!');
            window.location.href = window.location.pathname; // Clear URL params
        }
    }, 1000);
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
                </div>
                <div id="countdown">02:00</div>`;
            
            document.getElementById('okButton').addEventListener('click', function() {
                document.getElementById('warningBox').style.display = 'none';
                document.getElementById('messageContainer').style.display = 'block';

                const twoMinutes = 60 * 2,
                      display = document.getElementById('countdown');
                startCountdown(twoMinutes, display);
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
