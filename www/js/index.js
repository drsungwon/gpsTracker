// Action: jshint 설치!! 

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

// Reference: https://cordova.apache.org/docs/ko/latest/cordova/storage/database/database.html
var db = window.openDatabase("Database", "1.0", "GPS Tracking", 2000000);
db.transaction(populateDB, errorCB, successCB);

// Populate the database
//
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS GPSTABLE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS GPSTABLE (id unique, LogTime, Latitude, Longitude, Altitude, Accuracy, AltitudeAccuracy, Heading, Speed, Timestamp)');
}

// Clear the database
//
function clearDB(tx) {
    tx.executeSql('DELETE FROM GPSTABLE');
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Log File Open Error: " + err);
}

// Transaction success callback
//
function successCB() {
//    alert("Success processing SQL!");
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        var buttonConfigure = document.getElementById('btn-configure');
        buttonConfigure.addEventListener('click', this.configureProgram.bind(this));

        var buttonReport = document.getElementById('btn-report');
        buttonReport.addEventListener('click', this.reportLogFile.bind(this));

        var buttonLoadLog = document.getElementById('btn-loadlog');
        buttonLoadLog.addEventListener('click', this.loadLogFile.bind(this));

        var buttonReset = document.getElementById('btn-reset');
        buttonReset.addEventListener('click', this.resetProgram.bind(this));
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    resetProgram: function() 
    {
        db.transaction(clearDB, errorCB, successCB);
    },

    configureProgram: function() 
    {
        var conf_operation_mode = document.getElementById('opmode');
        var conf_tracking_interval = document.getElementById('slider');
        var conf_report_email = document.getElementById('email');

        var report_email = document.getElementById('reportEmail');
        report_email.value = conf_report_email.value;
         
        var statusBar = document.getElementById('status-bar');
        var loggedTime = 0;
        var timerClock = 0;

        localStorage.setItem("conf_operation_mode", conf_operation_mode.value);
        localStorage.setItem("conf_tracking_interval", conf_tracking_interval.value);
        localStorage.setItem("conf_report_email", conf_report_email.value);

        function logTimerFunction() 
        {
            var statusBar = document.getElementById('status-bar');     

            var currentdate = new Date(); 
            var datetime =  currentdate.getFullYear() + "/" +
                            (currentdate.getMonth() + 1) + "/" +
                            currentdate.getDate() + " " +
                            currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
    
            // onSuccess Callback
            // This method accepts a Position object, which contains the
            // current GPS coordinates
            //
            var onGpsSuccess = function(position) {
                db.transaction(function (tx) {
                    var eId = String(loggedTime);
                    var eLogTime = String(datetime);
                    var eLatitude = String(position.coords.latitude);
                    var eLongitude = String(position.coords.longitude);
                    var eAltitude = String(position.coords.altitude);
                    var eAccuracy = String(position.coords.accuracy);
                    var eAltitudeAccuracy = String(position.coords.altitudeAccuracy);
                    var eHeading = String(position.coords.heading);
                    var eSpeed = String(position.coords.speed);
                    var eTimestamp = String(position.timestamp);

                    var eSqlMsg = 'INSERT INTO GPSTABLE (id, LogTime, Latitude, Longitude, Altitude, Accuracy, AltitudeAccuracy, Heading, Speed, Timestamp) VALUES (' +
                                    eId +
                                    ',\"' +
                                    eLogTime +
                                    '\",\"' +
                                    eLatitude +
                                    '\",\"' +
                                    eLongitude +
                                    '\",\"' +
                                    eAltitude +
                                    '\",\"' +
                                    eAccuracy +
                                    '\",\"' +
                                    eAltitudeAccuracy +
                                    '\",\"' +
                                    eHeading +
                                    '\",\"' +
                                    eSpeed +
                                    '\",\"' +
                                    eTimestamp +
                                    '\")';

                    tx.executeSql(eSqlMsg); 
                });
            };

            // onError Callback receives a PositionError object
            //
            function onGpsError(error) {
                alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }

            navigator.geolocation.getCurrentPosition(onGpsSuccess, onGpsError);
            
            var msg = 'Lastest Log: ' + datetime + ' (' + (loggedTime + 1) + ' times)' ;
    
            statusBar.textContent = msg;
            loggedTime += 1;
        }

        if(conf_operation_mode.value == "on")
        {
            statusBar.textContent = 'Logging started.';

            timerClock = setInterval(logTimerFunction, 1000 * 60 * conf_tracking_interval.value);
            localStorage.setItem("logTimer", timerClock);
        }
        else
        {
            statusBar.textContent = 'Logging stoped.';

            timerClock = localStorage.getItem("logTimer");
            clearInterval(timerClock);
        }
    },

    loadLogFile: function() 
    {
        var table = document.getElementById("logTable");
        var tableStatus = document.getElementById("logMessage");

        db.transaction(function(tx){
            tx.executeSql("select * from GPSTABLE",[],
            function(tx,result){
                table.innerHTML = "";

                if(result.rows.length > 0){
                    tableStatus.innerHTML = "";

                    var titleRow = table.insertRow(0);

                    var titleCell1 = titleRow.insertCell(0);
                    var titleCell2 = titleRow.insertCell(1); 
                    var titleCell3 = titleRow.insertCell(2);
                    var titleCell4 = titleRow.insertCell(3);   
            
                    titleCell1.innerHTML = 'No';
                    titleCell2.innerHTML = 'Time';
                    titleCell3.innerHTML = 'Latitude';
                    titleCell4.innerHTML = 'Longitude';   
                }
                else{
                    tableStatus.innerHTML = "No log.";
                }

                for(var i = 0; i < result.rows.length; i++){
                    var row = result.rows.item(i);
                    var tableRow = table.insertRow(i+1);

                    var cell1 = tableRow.insertCell(0);
                    var cell2 = tableRow.insertCell(1);
                    var cell3 = tableRow.insertCell(2);
                    var cell4 = tableRow.insertCell(3);

                    cell1.innerHTML = row.id;
                    cell2.innerHTML = row.LogTime;
                    cell3.innerHTML = row.Latitude;
                    cell4.innerHTML = row.Longitude;
                }            
            });
        });
    },

    reportLogFile: function() 
    {
        var report_email = document.getElementById('reportEmail');
        var sendMsg = "send email to " + report_email.value;
        alert(sendMsg);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        var ls_operation_mode_value = localStorage.getItem("conf_operation_mode");
        if(ls_operation_mode_value != null)
        {
            var conf_operation_mode = document.getElementById('opmode');
            conf_operation_mode.value = ls_operation_mode_value;
        }

        var ls_tracking_interval_value = localStorage.getItem("conf_tracking_interval");
        if(ls_tracking_interval_value != null)
        {
            var conf_tracking_interval = document.getElementById('slider');
            conf_tracking_interval.value = ls_tracking_interval_value;
        }

        var ls_report_email_value = localStorage.getItem("conf_report_email");
        if(ls_report_email_value != null)
        {
            var conf_report_email = document.getElementById('email');
            conf_report_email.value = ls_report_email_value;
        }
    }
};

app.initialize();