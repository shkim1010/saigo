document.addEventListener('DOMContentLoaded', () => {
    const lockScreen = document.querySelector('.container'); // 잠금화면 전체를 감싸는 .container 요소를 선택

    let startY = 0; // 터치/클릭 시작 Y 좌표
    let endY = 0;   // 터치/클릭 끝 Y 좌표
    let threshold = 50; // 스와이프를 인식할 최소 이동 거리 (px)

    // 터치 시작 이벤트 (모바일)
    lockScreen.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY; // 첫 번째 터치의 Y 좌표 기록
    });

    // 마우스 누르기 시작 이벤트 (데스크톱, 테스트용)
    lockScreen.addEventListener('mousedown', (e) => {
        startY = e.clientY; // 마우스 클릭의 Y 좌표 기록
    });

    // 터치 끝 이벤트 (모바일)
    lockScreen.addEventListener('touchend', (e) => {
        endY = e.changedTouches[0].clientY; // 마지막 터치 지점의 Y 좌표 기록
        handleSwipe();
    });

    // 마우스 놓기 이벤트 (데스크톱, 테스트용)
    lockScreen.addEventListener('mouseup', (e) => {
        endY = e.clientY; // 마우스 뗀 지점의 Y 좌표 기록
        handleSwipe();
    });

    // 스와이프 처리 함수
    function handleSwipe() {
        if (startY - endY > threshold) { // 위로 스와이프 (startY가 endY보다 크면 위로 움직인 것)
            console.log('위로 스와이프 감지!');
            // 여기에 페이지 전환 로직을 넣습니다.
            // window.location.href = 'main.html'; // 예시: 'main.html' 페이지로 이동
            
            // 만약 CSS 전환 효과를 사용한다면 (선택 사항):
            // document.body.classList.add('page-transition-up'); // 전환 효과 클래스 추가
            // setTimeout(() => {
                window.location.href = 'main.html'; // 일정 시간 후 페이지 이동
            // }, 500); // CSS transition 시간(0.5s)과 맞춤
            
        } else if (endY - startY > threshold) { // 아래로 스와이프 (현재는 필요 없지만 확장성을 위해)
            console.log('아래로 스와이프 감지!');
        } else {
            console.log('스와이프 아님 또는 짧은 스와이프');
        }
        // 다음 스와이프를 위해 초기화
        startY = 0;
        endY = 0;
    }
});
