# gpsTracker [뚜벅뚜벅]
GPS Tracking Application using Apache Cordova<br><br>
## 프로그램 소개
경희대학교 소프트웨어융합학과 및 산업경영공학과 학부생 수업에서,<br>
사용자의 위치를 분석하는 실습을 지원하기 위하여 만들어진 프로그램입니다.<br>
Apache Cordova를 기반으로 개발하여, HTML5/CSS3/Javascript를 개발도구로 사용합니다.<br>
Apache License 2.0 오픈소스 소프트웨어로 공개하니, 누구나 공부하고 확장할 수 있습니다.<br><br>
## 프로그램 사용 방법
소스코드를 다운받아 빌드하거나, 다음의 방법으로 이미 만들어진(build된) Android용 프로그램을 사용할 수 있습니다.<br><br>
### 프로그램 기능 설명
프로그램은 위치 정보 수집을 활성화/비활성화하고, 수집한 정보를 확인하는 것으로 단순화 되어 있습니다.<br>
메인 메뉴에서 선택을 하신후, 서브 메뉴에서 다시 메인 메뉴로 이동하실 때에는, 화면 위 왼쪽의 '홈' 버튼을 누르시면 됩니다.<br><br>
#### (1) 프로그램 설정
정보수집 활성화 기능을 활성화/비활성화 하는 버튼입니다.<br>
정보수집 주기설정 기능은 위치정보를 수집하는 주기를 분 단위로 설정하는 슬라이드 버튼입니다.<br>
위의 기능을 변경한 경우는 반드시 프로그램 설정확인 버튼을 클릭합니다.<br>
프로그램의 설정이 변경되면, 메뉴 선택의 하단부(프로그램 설명 메뉴 밑)에 프로그램의 동작 변화를 작은 글씨로 알려줍니다.<br><br>
#### (2) 이동정보 보기
수집한 정보를 보여주고, 사용자가 어떻게 수집한 정보를 다룰수 있는지 알려줍니다.<br>
수정정보 읽어오기 버튼을 누르면, 수집한 정보와 함께 어떻게 사용자가 활용할 수 있는지 알려줍니다.<br>
본 프로그램은 개인정보 보호에 대한 차원에서 스마트폰 밖으로 수집한 정보를 전송하지 않습니다.<br>
따라서 화면에 표시한 수집정보를 사용법에 맞춰서 copy & paste 후 활용하시면 됩니다.<br>
개인 정보를 별도의 서버나 이메일로 전송하지 않으니 안심하고 사용하시면 됩니다.<br>
프로그램에서 설명한 방법으로 csv 화일을 만들면, 엑셀 등의 스프레드 시트에서 컬럼이 쉼표(,)로 구분된 형태로 읽어들이면 됩니다.<br>
수정정보 삭제하기 버튼을 누르면, 수집한 정보를 프로그램에서 모두 지웁니다.<br><br>
#### (3) 프로그램 설명
프로그램에 대한 간단한 소개와 개발자 정보, 그리고 수집하는 위치정보가 어떤 것인지 설명합니다.<br>
그리고 활용한 오픈소스 소프트웨어들에 대한 정보 및 이에 대한 라이센스 공지를 확인할 수 있습니다.<br><br>
### 사용시 주의사항
본 프로그램은 프로그램이 활성화되지 않은 background 모드에서도 위치 정보를 수집합니다.<br>
Background 모드 동작은 직접 개발하지 않고, 오픈소스 플러그인을 사용합니다.<br>
스마트폰은 배터리 사용량을 최적화 하기 위하여, 화면을 사용하지 않는 프로그램(background process)의 동작을 제한합니다.<br>
이 프로그램의 경우도 화면이 꺼진 동안, 사용자의 위치를 확인하기에 많은 제약을 운영체제에게서 받습니다.<br>
운영체제가 제약을 하는 경우는, 화면이 꺼진 후, 일정 시간이 지나서 프로그램의 동작이 멈추게 합니다.<br>
따라서 본 프로그램은 시작하는 시점에 사용자의 위치 정보 획득에 대한 허가를 사용자에게 요청함과 동시에,<br>
Background 모드에서의 동작을 위해, 배터리 최적화 기능을 일부 멈추도록 하는 것에 대한 사용자의 동의를 구합니다.<br>
특히, 원활한 정보수집을 위해서, 본 프로그램을 사용하는 동안에는 스마트폰의 배터리 최적화를 잠시 꺼두시기를 권장합니다.<br>
이에 대한 자세한 정보는 아래 오픈소스 설명에 나타난 https://dontkillmyapp.com/를 참조하시기 바랍니다.<br>
삼성전자 갤럭시S 노트9을 예를 들면, "설정 - 디바이스 케어 - 배터리 - 설정"에서,<br>
"사용하지 않는 앱을 절전 상태로 전환"과 "미사용 앱 자동으로 사용해제"를 잠시 꺼두시기를 권장합니다.<br>
실험 결과 베터리 최적화를 제거한 화웨이 단말에서는 24시간 이상의 테스트에 전혀 문제가 없지만,<br>
삼성전자 갤럭시S 노트9에서는 주로 새벽에 프로그램이 멈추거나 지연하여 동작하는 증상이 나타나곤 합니다.<br>
이는 삼성전자 스마트폰에서 배터리 제어를 위한 노력을 더 하는 것으로 파악되기에 참조바랍니다.<br>
iOS의 경우는 특별한 이상 동작이 발생하지 않는 것으로 실험에서 나타났습니다.<br>
본 프로그램에서는 background mode는 아래 설명할 플러그인을 활용할 뿐,<br>
추가적인 작업은 더 하지 않기에, 이에 대한 일부 불만족은 감수하여 주시거나 관련 오픈소스를 직접 개량하면 좋겠습니다. ^^<br>
스마트폰에서 background mode에서 동작하는 기술은 별도 회사들이 있을 만큼 주요한 기술입니다.<br><br>
### Android 스마트폰에 설치하기
build 디렉토리안의 android 디렉토리에서 apk 확장자의 화일을 다운로드 합니다.<br>
다운로드한 프로그램이 있는 컴퓨터와 스마트폰을 usb 케이블로 연결하고, 스마트폰에서 화일전송 모드로 설정합니다.<br>
다운로드한 프로그램을 컴퓨터에서 스마트폰으로 전송합니다.<br>
처음 해보는 사람은 https://support.google.com/android/answer/9064445?hl=ko 사이트를 참조합니다.<br>
스마트폰에 저장된 화일을 검색할 수 있는 프로그램(삼성전자 갤럭시의 경우는 "내 파일" 프로그램)을 실행한 후,<br>
앞서 스마트폰으로 저장한 프로그램(프로그램 이름이 "뚜벅뚜벅"인 아이콘)을 찾습니다.<br>
스마트폰으로 이동한 프로그램을 클릭하여 실행합니다.<br>
프로그램이 설치되는 작업이 시작되면서, 사용자에게 설치를 할 것인지에 대한 의사 등을 확인할때 모두 동의하여 설치합니다.<br>
특히 앱스토어를 경유하지 않은 프로그램인데 설치를 권하지 않는 단추에서 "확인"을 누르시지말고, 설치에 동의해야 합니다.<br>
정상적으로 프로그램이 설치되면, 일반 앱스토어를 통해서 다운로드한 프로그램 처럼 실행합니다.<br>
절차 방법에 대한 상세한 설명은 다음의 사이트와 같이 인터넷 검색을 통해서 쉽게 찾아 볼수 있습니다.<br>
https://m.blog.naver.com/imagine0716/220921097859<br><br>
### IOS 스마트폰에 설치하기
현재 iPhone에서의 동작은 검증을 하였으나, 배포는 녹록하지 않습니다.<br>
iOS 프로그램을 개발자가 다른 사용자에 배포하려면, 애플에 개발자 등록을 하고(비용 필요 ^^) 애플을 통해서 배포해야 합니다.<br>
본 프로그램은 오픈소스 공개를 목표로 하기에, 이런 부분까지 진행하지는 않습니다.<br>
따라서, 소스코드를 가지고 직접 어플리케이션을 빌드하여, 본인의 iphone으로 설치하는 방법을 설명합니다.<br>
본인이 Mac 컴퓨터를 가지고 있으며, Xcode와 Cordova에 대한 이해가 있는 경우, 아래를 참조하여 설치 가능합니다.<br><br>
Mac 컴퓨터에서 Cordova 개발 환경을 설치하고, 실제 아이폰 단말에서 실행 & 디버그 하는 방법.<br>
https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html<br><br>
### 웹브라우저에서 실행하기
기본적으로 아래에서 설명할 background 모드 플러그인을 제외하고는 모든 기능을 웹브라우저에서도 실행할 수 있습니다.<br>
웹브라우저에서의 동작을 위해서는 소스코드의 다운로드 및 "cordova run browser"를 통한 실행이 필요합니다.<br><br>
## 소스코드 활용 방법
소스코드를 이해하기 위해서는 다음 프로그램을 설치하고 사용할 줄 알아야 합니다.<br>
소스코드의 수정을 위해서는 HTML5, CSS3, Javascript ES5에 대한 이해와 경험이 필요합니다.<br> 
www 디렉토리 안에 있는 화일들 중 jquery 화일을 제외한 화일들이 개발된 소스코드들 입니다.<br>
refernece 디렉토리는 개발중 참조 혹은 첨삭한 코드들로, background mode 동작을 위하여 사용한 플러그인 인 <br>
platanus/cordova-plugin-background-mode와 katzer의 소스코드,<br>
websocket 등 개발시 시도했던 코드들을 공부할 사람들을 위한 용도로 담고 있습니다.<br>
build 디렉토리 안에는 다운받아서 설치할 수 있는 Android용 실행 프로그램을 담고 있습니다.<br><br>
### Apache Cordova
https://cordova.apache.org/<br>
Apache 재단에서 관리하는 WepApp 개발도구로써, PhoneGap/Ionic의 기반 기술로 사용됩니다.<br>
gpsTracker 개발 시점의 버전은 9.0.0 입니다.<br><br>
### jQuery Mobile
https://jquerymobile.com/<br>
HTML5 기반의 반응형 웹사이트와 앱의 UI 플랫폼으로서, 데스크탑컴퓨터/스마트폰/태플릿컴퓨터 등에 사용 가능합니다.<br>
gpsTracker 개발 시점의 버전은 jquery-1.11.1과 jquery.mobile-1.4.5 입니다.<br><br>
### Node.js & npm (Node Package Manager)
Node.js(https://nodejs.org/ko/)와 npm(https://www.npmjs.com/)를 사용하여 개발 도구들을 설치하고 운영합니다.<br>
각각은 다음의 사이트를 통해서 설치할 수 있으며, gpsTracker 개발 시점의 버전은 각각 10.16.0, 6.10.1 입니다.<br><br>
### Cordova Plugin : cordova-plugin-geolocation
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/<br>
사용자의 위치정보(GPS 등)을 확인할 수 있습니다.<br><br>
### Cordova Plugin : platanus/cordova-plugin-background-mode
https://github.com/platanus/cordova-plugin-background-mode<br>
스마트폰은 응용 프로그램이 background 모드로 진입하는 경우, 배터리 절약을 위하여 일정 시간이 지나면 프로그램을 중지합니다.<br>
배터리 절약을 위해서는 좋지만, gpsTracker와 같이 지속적인 위치를 측정하거나 채팅 등을 하는 프로그램엔 문제가 발생합니다.<br>
이 프로그램의 월활한 수행을 위해서, 스마트폰 배터리 최적화 기능을 잠시 꺼두는 것이 좋습니다.<br>
https://dontkillmyapp.com/에서 더 많은 정보를 스마트폰 제조사 및 모델별로 확인 가능합니다.<br>
이 plugin은 WebApp이 background 모드로 진입하더라도 동작이 가능하도록 지원합니다.<br>
https://github.com/mauron85/cordova-plugin-background-geolocation/가 유명하지만 최근 개선이 잘 안됩니다.<br>
하지만 platanus plugin은 2019년 8월 기준 안정적인 background 모드에서의 위치 정보 수집 기능을 지원합니다.<br>
당초 katzer의 플러그인을 사용했지만 iOS 버전에서 일부 오류가 있어서 platanus로 변경했습니다.<br>
platanus plugin은 katzer plugin의 일부 수정 버전으로 공지되어 있습니다.<br>
다음의 설치 명령으로 cordova에 추가할 수 있습니다.<br>
"cordova plugin add https://github.com/platanus/cordova-plugin-background-mode.git"<br><br>
## QUICK SUMMARY
(1) Node.js 설치<br>
     https://nodejs.org/ko/<br>
(2) npm 설치<br>
     https://www.npmjs.com/<br>
(3) Cordova 설치<br>
     https://cordova.apache.org/<br>
(4) Cordova Android 개발 환경 설치<br>
     https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html<br>
(5) Cordova iOS 개발 환경 설치<br>
     https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html<br>
(6) Cordova Deafult 프로젝트 (Hello Cordova Proejct) 생성<br>
     https://cordova.apache.org/docs/en/latest/guide/cli/index.html<br>
(7) 본 오픈소스의 config.xml과 www 디렉토리 안의 화일로 Default 프로젝트 화일 대체 (jquery 디렉토리 화일 추가 포함)<br>
(8) Geolocation plugin 설치<br>
     https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html<br>
(9) platanus-background-mode plugin 설치<br>
     https://github.com/platanus/cordova-plugin-background-mode<br>
(10) Browser platform에서의 기본 기능 확인 (Background mode 동작 안함)<br>
     https://cordova.apache.org/<br>
(11) Android에서의 기능 확인 (apk 화일 생성후, USB로 스마트폰 이동 & 설치)<br>
     https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html<br>
(12) iOS에서의 기능 확인 (Xcode로 app 화일 생성후, USB로 스마트폰 이동 & 설치)<br>
     https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html<br>
(13) 스마트폰 절전 모드 조절 및 실제 위치 정보 측정 (스마트폰의 절전 기능 off, 알약 등 절전 소프트웨어의 절전 기능 off 권장)<br>
     https://dontkillmyapp.com/<br><br>
## 소프트웨어 개선 문의
수업에서 위치 정보를 분석해야 하는 용도를 위하여 만들어진 간단한 프로그램입니다.<br>
추가적인 복잡한 기능의 개발과 추가는 아직 계획이 없습니다.<br>
스마트폰 앱의 특성상 다양한 환경에서 다양한 이슈가 있을 것으로 생각되며, 겪은 문제를 Issue에 올려주시면 최대한 개선해 보겠습니다.<br> 
프로그램의 근본적인 부분에 대한 수정은 꾸준하게 진행할 예정이오니, Issue 기능을 활용하시면 지원하도록 하겠습니다.<br><br>
## 라이센스
APACHE LICENSE 2.0<br>
Copyright 2019, Dr.Sungwon @ KHU
