# gpsTracker [뚜벅뚜벅]
## 프로그램 소개
GPS Tracking Application using Apache Cordova<br><br>
경희대학교 소프트웨어융합학과 학부생 수업에서 사용자의 위치를 분석하는 실습을 지원하기 위하여 만들어진 프로그램입니다.<br>
Apache Cordova를 기반으로 개발하여, HTML5/CSS3/Javascript를 개발도구로 활용합니다.<br>
Apache License 2.0 오픈소스 소프트웨어로 공개하니, 누구나 공부하고 확장할 수 있습니다.<br>
## 프로그램 사용 방법
소스코드를 다운받아 빌드하지 않아도, 다음의 방법으로 이미 만들어진(build된) 프로그램을 사용할 수 있습니다.<br>
### 프로그램 기능 설명
프로그램은 단순하게 정보수집을 활성화/비활성화하고, 수집한 정보를 확인하는 것으로 단순화 되어 있습니다.<br>
메인 메뉴에서 선택을 하신후, 서브 메뉴에서 다시 메인 메뉴로 이동하실 때에는, 화면 위 왼쪽의 '홈' 버튼을 누르시면 됩니다.<br>
#### (1) 프로그램 설정
정보수집 활성화 기능을 활성화/비활성화 하는 버튼입니다.<br>
정보수집 주기설정 기능은 위치정보를 수집하는 주기를 분 단위로 설정하는 슬라이드 버튼입니다.<br>
위의 기능을 변경한 경우는 반드시 프로그램 설정확인 버튼을 클릭합니다.<br>
프로그램의 설정이 변경되면, 메뉴 선택의 하단부(프로그램 설명 메뉴 밑)에 프로그램의 동작 변화를 작은 글씨로 알려줍니다.<br>
#### (2) 이동정보 보기
수집한 정보를 보여주고, 사용자가 어떻게 수집한 정보를 다룰수 있는지 알려줍니다.<br>
수정정보 읽어오기 버튼을 누르면, 수집한 정보와 함께 어떻게 사용자가 활용할 수 있는지 알려줍니다.<br>
본 프로그램은 개인정보 보호에 대한 차원에서 스마트폰 밖으로 수집한 정보를 전송하지 않습니다.<br>
따라서 화면에 표시한 수집정보를 사용법에 맞춰서 copy & paste 후 활용하시면 됩니다.<br>
개인 정보를 별도의 서버나 이메일로 전송하지 않으니 안심하고 사용하시면 됩니다.<br>
수정정보 삭제하기 버튼을 누르면, 수집한 정보를 프로그램에서 모두 지웁니다.<br>
#### (3) 프로그램 설명
프로그램에 대한 간단한 소개와 개발자 정보, 그리고 수집하는 위치정보가 어떤 것인지 설명합니다.<br>
그리고 활용한 오픈소스 소프트웨어들에 대한 정보 및 이에 대한 라이센스 공지를 확인할 수 있습니다.<br>
### Android 스마트폰에 설치하기
추후 업데이트 합니다.<br>
### IOS 스마트폰에 설치하기
추후 업데이트 합니다.<br>
### 웹브라우저에서 실행하기
기본적으로 아래에서 설명할 background 모드 플러그인을 제외하고는 모든 기능을 웹브라우저에서도 실행할 수 있습니다.<br>
웹브라우저에서의 동작을 위해서는 소스코드의 다운로드 및 "cordova run browser"를 통한 실행이 필요합니다.<br>
## 소스코드 활용 방법
소스코드를 이해하기 위해서는 다음 프로그램을 설치하고 사용할 줄 알아야 합니다.<br>
소스코드의 수정을 위해서는 HTML5, CSS3, Javascript ES5에 대한 이해와 경험이 필요합니다.<br> 
### Apache Cordova
https://cordova.apache.org/<br>
Apache 재단에서 관리하는 WepApp 개발도구로써, PhoneGap/Ionic의 기반 기술로 사용됩니다.<br>
gpsTracker 개발 시점의 버전은 9.0.0 입니다.<br>
### jQuery Mobile
https://jquerymobile.com/<br>
HTML5 기반의 반응형 웹사이트와 앱의 UI 플랫폼으로서, 데스크탑컴퓨터/스마트폰/태플릿컴퓨터 등에 사용 가능합니다.<br>
gpsTracker 개발 시점의 버전은 jquery-1.11.1과 jquery.mobile-1.4.5 입니다.<br>
### Node.js & npm (Node Package Manager)
Node.js(https://nodejs.org/ko/)와 npm(https://www.npmjs.com/)를 사용하여 개발 도구들을 설치하고 운영합니다.<br>
각각은 다음의 사이트를 통해서 설치할 수 있으며, gpsTracker 개발 시점의 버전은 각각 10.16.0, 6.10.1 입니다.<br>
### Cordova Plugin : cordova-plugin-geolocation
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/<br>
사용자의 위치정보(GPS 등)을 확인할 수 있습니다.<br>
### Cordova Plugin : katzer/cordova-plugin-background-mode
https://github.com/katzer/cordova-plugin-background-mode<br>
스마트폰은 응용 프로그램이 background 모드로 진입하는 경우, 배터리 절약을 위하여 일정 시간이 지나면 프로그램을 중지합니다.<br>
배터리 절약을 위해서는 좋지만, gpsTracker와 같이 지속적인 위치를 측정하거나 채팅 등을 하는 프로그램엔 문제가 발생합니다.<br>
이 프로그램의 월활한 수행을 위해서, 스마트폰 배터리 최적화 기능을 잠시 꺼두는 것이 좋습니다.<br>
https://dontkillmyapp.com/에서 더 많은 정보를 스마트폰 제조사 및 모델별로 확인 가능합니다.<br>
이 plugin은 WebApp이 background 모드로 진입하더라도 동작이 가능하도록 지원합니다.<br>
https://github.com/mauron85/cordova-plugin-background-geolocation/가 유명하지만 상용화 이후 개선이 잘 안되는 점에서,<br>
본 plugin은 2019년 8월 기준 안정적인 background 모드에서의 위치 정보 수집 기능을 지원합니다.<br>
다음의 설치 명령으로 cordova에 추가할 수 있습니다.<br>
"cordova plugin add https://github.com/katzer/cordova-plugin-background-mode"<br>
## 라이센스
APACHE LICENSE 2.0<br>
Copyright 2019, Sungwon Lee @ KHU
