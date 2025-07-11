document.addEventListener('DOMContentLoaded', function() {
    const messagesDisplay = document.querySelector('.chat-area');
    const inputBar = document.querySelector('.input-bar');
    let currentInputState = 0; // 0: 첫 번째 문장 ('노래'), 1: 두 번째 문장 ('가수'), 2: 일반 입력

    const defaultInputMessage = "메시지를 입력하세요..."; // 기본 입력창 문구 정의
    const messageInterval = 2000; // 모든 자동 메시지 사이의 간격 (1.5초)
    const transitionDelayAfterLastMessage = 7000; // 마지막 자동 메시지 후 화면 전환까지의 시간 (7초)

    // 메시지를 채팅창에 추가하는 헬퍼 함수
    function addMessageToChat(text, type = 'right', bubbleColor = 'blue') {
        const newMessageDiv = document.createElement('div');
        newMessageDiv.classList.add('message-row', type); 
        
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', bubbleColor);
        messageBubble.textContent = text;

        newMessageDiv.appendChild(messageBubble);
        messagesDisplay.appendChild(newMessageDiv);

        // 스크롤을 맨 아래로
        messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
    }

    // 모든 자동 메시지 시퀀스를 처리하고 마지막에 화면을 전환하는 함수
    function startFullAutoSequence() {
        const autoMessages = [
            { text: "그거 무슨 향인지 궁금해서..ㅠ", type: 'right', color: 'blue' },
            { text: "참고로 이걸 구실로 어떻게 다시 해보자는 거 아니니까 진짜 향만 알려주라", type: 'right', color: 'blue' },
            { text: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", type: 'left', color: 'gray' },
            { text: "아", type: 'left', color: 'gray' },
            { text: "탑은 [1]고, 미들은 [2]고, 베이스는 [3]", type: 'left', color: 'gray' },
            { text: "ㄱㅅㄱㅅ", type: 'right', color: 'blue' },
            { text: "어이없겠지만 혹시 향료 비율도 알려줄 수 있어?", type: 'right', color: 'blue' },
            { text: "어이없는데 웃겨서 말해줄게", type: 'left', color: 'gray' },
            { text: "[1] {}%, [2] {}%, [3] {}%", type: 'left', color: 'gray' },
            { text: "ㄱㅅㄱㅅ", type: 'right', color: 'blue' },
            { text: "야 너 진짜 이게 목적이네..", type: 'left', color: 'gray' }
        ];

        let currentDelay = 0; // 현재까지의 누적 지연 시간

        autoMessages.forEach((msg, index) => {
            currentDelay += messageInterval; // 각 메시지마다 1.5초 추가
            setTimeout(() => {
                addMessageToChat(msg.text, msg.type, msg.color);
            }, currentDelay);
        });

        // 마지막 메시지가 출력될 예상 시간 (currentDelay에 마지막 메시지 시간까지 모두 더해짐)
        // 이 시간으로부터 7초 후에 화면 전환
        setTimeout(() => {
            window.location.href = 'loading.html'; // loading.html로 이동
        }, currentDelay + transitionDelayAfterLastMessage);
    }

    // 메시지를 추가하고 입력창을 업데이트하는 함수
    function sendMessage() {
        const messageText = inputBar.textContent.trim();

        // 기본 문구를 그대로 전송하는 경우 무시
        if (messageText === defaultInputMessage) {
            return; 
        }

        if (messageText !== '') { // 메시지가 비어있지 않다면
            addMessageToChat(messageText, 'right', 'blue');

            if (currentInputState === 0) {
                inputBar.innerHTML = '<span contenteditable="true" class="editable-text"> 가수 </span>?이 부른 거였는데..';
                currentInputState = 1;
            } else if (currentInputState === 1) {
                inputBar.innerHTML = `<span contenteditable="true" class="editable-text">${defaultInputMessage}</span>`;
                currentInputState = 2;
                startFullAutoSequence(); // 모든 자동 메시지 및 화면 전환 시퀀스 시작
            } else {
                inputBar.innerHTML = `<span contenteditable="true" class="editable-text">${defaultInputMessage}</span>`;
            }
            
            const newEditableText = inputBar.querySelector('.editable-text');
            if (newEditableText) {
                newEditableText.focus();
                const range = document.createRange();
                const sel = window.getSelection();
                if (newEditableText.childNodes.length > 0 && newEditableText.childNodes[0].nodeType === Node.TEXT_NODE) {
                    range.setStart(newEditableText.childNodes[0], newEditableText.childNodes[0].length);
                } else {
                    range.setStart(newEditableText, 0); 
                }
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    // 엔터 키를 눌렀을 때 메시지 추가
    inputBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            sendMessage();
        }
    });

    // '전송' 버튼 클릭 시 메시지 추가
    const sendButton = document.querySelector('.send-button');
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
});
