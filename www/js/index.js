/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var debugLogging = function (message) {
    var tableStatusBody = document.getElementById("logMessageBody");
    tableStatusBody.innerHTML += message;
    tableStatusBody.innerHTML += "<br>";
};

// Background module handlwer
var backgroundModuleHandler = 0;

/* part3_for_websocket */

// Web SQL based database for geolocation writing
var dbManager = {
    initialize: function () {
        this.db = window.openDatabase("Database", "1.0", "GPS Tracking", 2000000);
        this.db.transaction(this.populateDB, this.errorCB, this.successCB);
        console.log('dbManager.initialize()');
    },

    // Populate the database
    populateDB: function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS GPSTABLE (LogTime unique, Latitude, Longitude, Altitude, Accuracy, AltitudeAccuracy, Heading, Speed, Timestamp)');
        console.log('CREATE TABLE IF NOT EXISTS GPSTABLE (LogTime unique, Latitude, Longitude, Altitude, Accuracy, AltitudeAccuracy, Heading, Speed, Timestamp)');
    },

    // Clear the database
    clearDB: function () {
        this.db.transaction(function (tx) {
            tx.executeSql('DELETE FROM GPSTABLE');
            console.log('DELETE FROM GPSTABLE');
        });
    },

    // Write the database
    writeDB: function (sqlRequest) {
        this.db.transaction(function(tx){
            tx.executeSql(sqlRequest);
            console.log(sqlRequest);
        });
    },

    // Transaction error callback
    errorCB: function (tx, err) {
        console.log("Log SQL File Open Error: " + err);
    },

    // Transaction success callback
    successCB: function () {
        console.log("Success processing SQL!");
    }
};

var pad = function (n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

// main application
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        // Button event handler binding : Program configuration
        btnProgramConfiguration = document.getElementById('buttonProgramConfiguation');
        btnProgramConfiguration.addEventListener('click', this.doProgramConfiguration.bind(this));

        // Button event handler binding : Log removal
        btnLogRemoval = document.getElementById('buttonLogRemoval');
        btnLogRemoval.addEventListener('click', this.doLogRemoval.bind(this));

        // Button event handler binding : Log loading
        btnLogLoading = document.getElementById('buttonLogLoading');
        btnLogLoading.addEventListener('click', this.doLogLoading.bind(this));

        // Clear background process as Idle
        localStorage.setItem("LOG_TIMER", -1);

        // Create and initialize database
        dbManager.initialize();
    },

    // Deviceready Event Handler : Bind any cordova events here. Common events are - 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        /* part1_for_backgound */

//
// New Background Mode Operation : start 
//
// ref: https://github.com/katzer/cordova-plugin-background-mode
//
        var trackingHandler = function () {
            if(backgroundModuleHandler == 0) {        
                backgroundModuleHandler = setInterval(function () {

                    app.backgroundTrackingHandler();

                }, 20000);
            }
        };

        var trackingHandlerReset = function () {
            trackingHandler = 0;
        };

        cordova.plugins.backgroundMode.on('enable', function(){
            console.log("cordova.plugins.backgroundMode.enable");  
            trackingHandlerReset();
            trackingHandler();
        });

        cordova.plugins.backgroundMode.on('disable', function(){
            console.log("cordova.plugins.backgroundMode.disable");
            clearInterval(backgroundModuleHandler);
        });

        cordova.plugins.backgroundMode.on('activate', function() {
            cordova.plugins.backgroundMode.disableWebViewOptimizations();
            cordova.plugins.backgroundMode.disableBatteryOptimizations();     

            console.log("cordova.plugins.backgroundMode.onactivate()");     
            trackingHandler();
        });

        cordova.plugins.backgroundMode.on('deactivate', function() {
            console.log("cordova.plugins.backgroundMode.ondeactivate()");
            trackingHandler();
        });

        cordova.plugins.backgroundMode.on('failure', function(errorCode) {
            console.log("cordova.plugins.backgroundMode.onfailure()");
        });         
        
        // cordova.plugins.backgroundMode.enable();
//
// New Background Mode Operation : end
//
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    backgroundTrackingHandler: function () {    
        var timeOld = localStorage.getItem("OLD_SLOT");
        var timeNow = Date.now();
        var timeInterval = localStorage.getItem("TIME_INTERVAL");

        var statusBar = document.getElementById('status-bar');

        if((timeNow - timeOld) >=  timeInterval) {
            localStorage.setItem("OLD_SLOT", Date.now());
        
            // Retrive current date and construct format like: OOOO/OO/OO-OO:OO:OO
            var currentDate = new Date();
            var loggingDate = currentDate.getFullYear() + "." +
                pad((currentDate.getMonth() + 1),2) + "." +
                pad(currentDate.getDate(),2) + "." +
                pad(currentDate.getHours(),2) + "." +
                pad(currentDate.getMinutes(),2) + "." +
                pad(currentDate.getSeconds(),2);    

            // onSuccess Callback for current GPS coordinates
            var onGpsSuccess = function (position) {
                var eSqlMsg = 'INSERT INTO GPSTABLE (LogTime, Latitude, Longitude, Altitude, Accuracy, AltitudeAccuracy, Heading, Speed, Timestamp) VALUES (' +
                    '\"' + 
                    String(loggingDate) + '\",\"' +
                    String(position.coords.latitude) + '\",\"' +
                    String(position.coords.longitude) + '\",\"' +
                    String(position.coords.altitude) + '\",\"' +
                    String(position.coords.accuracy) + '\",\"' +
                    String(position.coords.altitudeAccuracy) + '\",\"' +
                    String(position.coords.heading) + '\",\"' +
                    String(position.coords.speed) + '\",\"' +
                    String(position.timestamp) + '\")';

                // Write log into database
                dbManager.writeDB(eSqlMsg);

                statusBar.textContent = loggingDate + "에 정보를 수집하였습니다";
            };
    
            // onError Callback receives a PositionError object
            var onGpsError = function (error) {
                // Debug purpose
                console.log("onGpsError(): " + '{code:' + error.code + '}, {message:' + error.message + '}');
            };

            // GPS location retrieval
            navigator.geolocation.getCurrentPosition(onGpsSuccess, onGpsError);

            /* part4.1_for_websocket */
        }
    },

    // Button event handler : tracking mode and interval setup 
    doProgramConfiguration: function() {
        // Program configuration value retrieval
        var cnfMode = document.getElementById('configurationMode');
        var cnfInterval = document.getElementById('configurationInterval');

        // Program statur bar retrieval
        var statusBar = document.getElementById('status-bar');

        // Background tracking handler
        var handlerBackgroundTracking = 0;
        var handlerBackgroundTrackingNew = 0;

        var unitTime = 1000 * 60; // default : 1000 * 60 means 1 minute
        var loggingInterval = unitTime * cnfInterval.value;

/*
 * Foreground geolocation tracking : start
 */
        // if background process is activated, then deactivate current background process
//        handlerBackgroundTracking = localStorage.getItem("LOG_TIMER");
//        if (handlerBackgroundTracking != -1) {
//            clearInterval(handlerBackgroundTracking);
//        }
       
        /* part4.2_for_websocket */

        // Activate tracking operation as a background process 
        if (cnfMode.value == "ON") {
            // initial call to acquire user permission for location access
            navigator.geolocation.getCurrentPosition(function(){},function(){});

//          handlerBackgroundTracking = setInterval(this.backgroundTrackingHandler, loggingInterval);
//          handlerBackgroundTracking = setInterval(this.backgroundTrackingHandler, 20000);
            localStorage.setItem("OLD_SLOT", Date.now());
            localStorage.setItem("TIME_INTERVAL", loggingInterval);

            localStorage.setItem("LOG_TIMER", handlerBackgroundTracking);
            statusBar.textContent = '정보수집을 시작합니다.';

            /* part4.3_for_websocket */

            cordova.plugins.backgroundMode.enable();
        }
        // Deactivate tracking operation
        else {
            localStorage.setItem("LOG_TIMER", -1);
            statusBar.textContent = '정보수집을 중단합니다.';

            cordova.plugins.backgroundMode.disable();
        }
/* 
 * Foreground geolocation tracking : end
 */
        /* part2_for_background */       
    },

    // Button event handler : traking log inntialization
    doLogRemoval: function () {  
        // HTML 엘리먼트를 초기화 합니다
        var logManual = document.getElementById("logManual");
        logManual.innerHTML = "수집정보 읽어오기를 실행하세요";
        var tableStatusHead = document.getElementById("logMessageHead");
        tableStatusHead.innerHTML = "";
        var tableStatusStart = document.getElementById("logMessageStart");
        tableStatusStart.innerHTML = "";
        var tableStatusBody = document.getElementById("logMessageBody");
        tableStatusBody.innerHTML = "";
        var tableStatusEnd = document.getElementById("logMessageEnd");
        tableStatusEnd.innerHTML = "";

        // Clear log database
        dbManager.clearDB();
    },

    // Button event handler : traking log load and view 
    doLogLoading: function () {
        // HTML 엘리먼트를 획득하여, 수집정보를 HTML 형태로 보여줍니다
        var logManual = document.getElementById("logManual");
        var tableStatusHead = document.getElementById("logMessageHead");
        var tableStatusStart = document.getElementById("logMessageStart");
        var tableStatusBody = document.getElementById("logMessageBody");
        var tableStatusEnd = document.getElementById("logMessageEnd");

        // Database의 정보를 읽어서, 동적으로 HTML로 변환합니다
        dbManager.db.transaction(function (tx) {
            tx.executeSql("select * from GPSTABLE order by LogTime", [],
                function (tx, result) {
                    // Database가 비어 있지 않는 경우, HTML을 수집정보로 채웁니다
                    if (result.rows.length > 0) {
                        logManual.innerHTML = "수집정보 활용방법을 소개합니다";
                        tableStatusHead.innerHTML = "개인 정보 보호를 위하여, 다음과 같은 방법으로, 수집한 정보를 활용 하도록 합니다.";
                        tableStatusHead.innerHTML += " 쉬운 이해를 위하여, 수집한 정보를 스마트폰에서 이메일로 전송한 후, 컴퓨터에서 스프레드시트(예: Excel 등) 프로그램으로 확인하는 기준으로 설명합니다.<br>";
                        tableStatusHead.innerHTML += "<br>[단계1] 아래에서 [start]와 [end]사이의 내용을 클릭하여 선택 후, 복사(copy)합니다.<br>";
                        tableStatusHead.innerHTML += "<br>[단계2] 스마트폰에서 새로운 이메일 메시지를 생성합니다.<br>";
                        tableStatusHead.innerHTML += "<br>[단계3] 이메일 본문에 단계1의 정보를 붙여넣기(paste) 합니다.<br>";
                        tableStatusHead.innerHTML += "<br>[단계4] 이메일을 전송합니다.<br>";
                        tableStatusHead.innerHTML += "<br>[단계5] 컴퓨터에서 단계3의 이메일 메시지의 내용만으로 만들어진 화일을 저장하며, 확장자를 csv로 합니다.<br>";
                        tableStatusHead.innerHTML += "<br>[단계6] 단계5의 csv 화일을 스프레드시트 프로그램에서 읽어 들이면, 테이블 형태로 수집한 정보를 확인할 수 있습니다.<br>";
                        tableStatusHead.innerHTML += "<br><참조> 아래 위치정보 중 null로 표기된 정보는 사용자의 스마트폰에서 제공하지 않는 정보입니다.<br>";

                        tableStatusStart.innerHTML = "<br>[start]<br>";
//                      tableStatusBody.innerHTML += "LogTime,Latitude,Longitude,Altitude,Accuracy,AltitudeAccuracy,Heading,Speed,Timestamp<br>";
                        tableStatusBody.innerHTML = "LogTime,Latitude,Longitude,Altitude,Accuracy,AltitudeAccuracy,Heading,Speed<br>";
                        
                        // Create and show database in table format
                        for (var i = 0, row = 0; i < result.rows.length; i++) {
                            row = result.rows.item(i);
                            tableStatusBody.innerHTML += row.LogTime;
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.Latitude;
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.Longitude;
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.Altitude;
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.Accuracy;
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.AltitudeAccuracy;
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.Heading;
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.Speed;
                            /*
                            tableStatusBody.innerHTML += ",";
                            tableStatusBody.innerHTML += row.Timestamp;
                            */
                            tableStatusBody.innerHTML += "<br>";
                        }
                        tableStatusEnd.innerHTML = "[end]<br>";   
                    }
                    // Show message when database is blank
                    else {
                        logManual.innerHTML = "수집정보가 없습니다";
                        tableStatusHead.innerHTML = "";
                        tableStatusStart.innerHTML = "";
                        tableStatusBody.innerHTML = "";
                        tableStatusEnd.innerHTML = "";
                    }
                }
            );
        });
    }
};

app.initialize();
