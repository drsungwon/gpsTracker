# gpsTracker [뚜벅뚜벅]
## 프로그램 소개
GPS Tracking Application using Apache Cordova<br><br>
경희대학교 소프트웨어융합학과 학부생 수업에서 사용자의 위치를 분석하는 실습을 지원하기 위하여 만들어진 프로그램입니다.<br>
Apache Cordova를 기반으로 개발하여, HTML5/CSS3/Javascript를 개발도구로 활용합니다.<br>
Apache License 2.0 오픈소스 소프트웨어로 공개하니, 누구나 공부하고 확장할 수 있습니다.<br>
## 프로그램 사용 방법
소스코드를 다운받아 빌드하지 않아도, 다음의 방법으로 이미 만들어진(build된) 프로그램을 사용할 수 있습니다.<br>
#### Android 스마트폰
추후 업데이트 합니다.<br>
#### IOS 스마트폰
추후 업데이트 합니다.<br>
#### 웹브라우저
기본적으로 아래에서 설명할 background 모드 플러그인을 제외하고는 모든 기능을 웹브라우저에서도 실행할 수 있습니다.<br>
웹브라우저에서의 동작을 위해서는 소스코드의 다운로드 및 "cordova run browser"를 통한 실행이 필요합니다.<br>
## 소스코드 활용 방법
소스코드를 이해하기 위해서는 다음 프로그램을 설치하고 사용할 줄 알아야 합니다.<br>
소스코드의 수정을 위해서는 HTML5, CSS3, Javascript ES5에 대한 이해와 경험이 필요합니다.<br> 
#### Apache Cordova
https://cordova.apache.org/<br>
Apache 재단에서 관리하는 WepApp 개발도구로써, PhoneGap/Ionic의 기반 기술로 사용됩니다.<br>
gpsTracker 개발 시점의 버전은 9.0.0 입니다.<br>
#### jQuery Mobile
https://jquerymobile.com/<br>
HTML5 기반의 반응형 웹사이트와 앱의 UI 플랫폼으로서, 데스크탑컴퓨터/스마트폰/태플릿컴퓨터 등에 사용 가능합니다.<br>
gpsTracker 개발 시점의 버전은 jquery-1.11.1과 jquery.mobile-1.4.5 입니다.<br>
#### Node.js & npm (Node Package Manager)
Node.js(https://nodejs.org/ko/)와 npm(https://www.npmjs.com/)를 사용하여 개발 도구들을 설치하고 운영합니다.<br>
각각은 다음의 사이트를 통해서 설치할 수 있으며, gpsTracker 개발 시점의 버전은 각각 10.16.0, 6.10.1 입니다.<br>
#### Cordova Plugin : cordova-plugin-geolocation
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/<br>
사용자의 위치정보(GPS 등)을 확인할 수 있습니다.<br>
#### Cordova Plugin : katzer/cordova-plugin-background-mode
https://github.com/katzer/cordova-plugin-background-mode<br>
스마트폰은 응용 프로그램이 background 모드로 진입하는 경우, 배터리 절약을 위하여 일정 시간이 지나면 프로그램을 중지합니다.<br>
배터리 절약을 위해서는 좋지만, gpsTracker와 같이 지속적인 위치를 측정하거나 채팅 등을 하는 프로그램엔 문제가 발생합니다.<br>
이 plugin은 WebApp이 background 모드로 진입하더라도 동작이 가능하도록 지원합니다.<br>
https://github.com/mauron85/cordova-plugin-background-geolocation/가 유명하지만 상용화 이후 개선이 잘 안되는 점에서,<br>
본 plugin은 2019년 8월 기준 안정적인 background 모드에서의 위치 정보 수집 기능을 지원합니다.<br>
다음의 설치 명령으로 cordova에 추가할 수 있습니다.<br>
"cordova plugin add https://github.com/katzer/cordova-plugin-background-mode"<br>
