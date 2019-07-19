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

// Start of DB Code
//
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

//
// End of DB Code

// Start of File Code
//

var fsMsg = "";

function fsErrorHandler(e) {
    var msg = '';
  
    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
      case FileError.ABORT_ERR:
            msg = 'ABORT_ERR';
            break;     
      case FileError.NOT_READABLE_ERR:
            msg = 'NOT_READABLE_ERR';
            break;     
      case FileError.ENCODING_ERR:
            msg = 'ENCODING_ERR';
            break;     
      case FileError.NO_MODIFICATION_ALLOWED_ERR:
            msg = 'NO_MODIFICATION_ALLOWED_ERR';
            break;     
      case FileError.SYNTAX_ERR:
            msg = 'SYNTAX_ERR';
            break;     
      case FileError.TYPE_MISMATCH_ERR:
            msg = 'TYPE_MISMATCH_ERR';
            break;   
      case FileError.PATH_EXISTS_ERR:
            msg = 'PATH_EXISTS_ERR';
            break;   
      default:
        msg = 'Unknown Error';
        break;
    };
  
    console.log('fsErrorHandler: ' + msg);
  }

// window.requestFileSystem(window.TEMPORARY, 1024*1024, fsWrite, fsErrorHandler);

function fsWrite(fs) {
    console.log("fsWrite: enter")

    fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
        console.log("fsWrite-getFile: enter")
  
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function(fileWriter) {
        console.log("fsWrite-getFile-createWriter: enter")
  
        fileWriter.seek(fileWriter.length); // Start write position at EOF.
  
        // Create a new Blob and write it to log.txt.
        var blob = new Blob([fsMsg], {type: 'text/plain'});
        console.log("fsWrite: ", fsMsg);
  
        fileWriter.write(blob);
  
      }, fsErrorHandler);
  
    }, fsErrorHandler);
  
}

// window.requestFileSystem(window.TEMPORARY, 1024*1024, fsRead, fsErrorHandler);

function fsRead(fs) {
    console.log("fsRead: enter")

    fs.root.getFile('log.txt', {}, function(fileEntry) {
        console.log("fsRead-getFile: enter")
  
      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function(file) {
        console.log("fsRead-getFile-file: enter")

         var reader = new FileReader();
  
         reader.onloadend = function(e) {
           console.log(this.result);
         };
  
         reader.readAsText(file);
      }, fsErrorHandler);
  
    }, fsErrorHandler);
  
}

// window.requestFileSystem(window.TEMPORARY, 1024*1024, fsRemove, fsErrorHandler);

function fsRemove(fs) 
{
    fs.root.getFile('log.txt', {create: false}, function(fileEntry) 
    {
  
      fileEntry.remove(function() 
      {
        console.log('File removed.');
      }, fsErrorHandler);
  
    }, fsErrorHandler);

}


//
// End of File Code

var app = { 
    activationFlag: false,

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
        window.requestFileSystem(window.TEMPORARY, 1024*1024, fsRemove, fsErrorHandler);
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

        localStorage.setItem("conf_operation_mode", conf_operation_mode.value);
        localStorage.setItem("conf_tracking_interval", conf_tracking_interval.value);
        localStorage.setItem("conf_report_email", conf_report_email.value);

        function logTimerFunction() // start of logTimerFunction()
        {
            var statusBar = document.getElementById('status-bar');     

            var currentdate = new Date(); 
            var datetime =  currentdate.getFullYear() + "/" 
                            + (currentdate.getMonth()+1) + "/" 
                            + currentdate.getDate() + " "
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds();
    
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

                    var eSqlMsg = 'INSERT INTO GPSTABLE (id, LogTime, Latitude, Longitude, Altitude, Accuracy, AltitudeAccuracy, Heading, Speed, Timestamp) VALUES ('
                                    + eId 
                                    + '\",\"' 
                                    + eLogTime 
                                    + '\",\"' 
                                    + eLatitude 
                                    + '\",\"' 
                                    + eLongitude 
                                    + '\",\"' 
                                    + eAltitude 
                                    + '\",\"' 
                                    + eAccuracy 
                                    + '\",\"' 
                                    + eAltitudeAccuracy 
                                    + '\",\"' 
                                    + eHeading 
                                    + '\",\"' 
                                    + eSpeed 
                                    + '\",\"' 
                                    + eTimestamp 
                                    + '\")';

                    tx.executeSql(eSqlMsg); 
                    console.log("DB Write:", eSqlMsg)

                    fsMsg = eId 
                            + ',' 
                            + eLogTime 
                            + ',' 
                            + eLatitude 
                            + ',' 
                            + eLongitude 
                            + ',' 
                            + eAltitude 
                            + ',' 
                            + eAccuracy 
                            + ',' 
                            + eAltitudeAccuracy 
                            + ',' 
                            + eHeading 
                            + ',' 
                            + eSpeed 
                            + ',' 
                            + eTimestamp
                            + '\n';
                    
                    window.requestFileSystem(window.TEMPORARY, 1024*1024, fsWrite, fsErrorHandler);
//                    console.log("FS Write:", fsMsg)
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

        } // end of logTimerFunction()


        if(conf_operation_mode.value == "on")
        {
            if(this.activationFlag == false)
            {
                statusBar.textContent = 'Logging started.';

                const timerClock = setInterval(logTimerFunction, 1000 * 60 * conf_tracking_interval.value);
                localStorage.setItem("logTimer", timerClock);

                this.activationFlag = true;
            }
            else
            {
                statusBar.textContent = 'Logging re-started.';

                const timerClockOld = localStorage.getItem("logTimer");
                clearInterval(timerClockOld);

                const timerClockNew = setInterval(logTimerFunction, 1000 * 60 * conf_tracking_interval.value);
                localStorage.setItem("logTimer", timerClockNew);

                this.activationFlag = true;               
            }
        }
        else
        {
            statusBar.textContent = 'Logging stoped.';

            const timerClock = localStorage.getItem("logTimer");
            clearInterval(timerClock);

            this.activationFlag = false;
        };
    },

    loadLogFile: function() 
    {
        var table = document.getElementById("logTable");
        var tableStatus = document.getElementById("logMessage");

        db.transaction(function(tx)
        {
            tx.executeSql("select * from GPSTABLE",[],
            function(tx,result)
            {
                table.innerHTML = "";

                if(result.rows.length > 0)
                {
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
                else
                {
                    tableStatus.innerHTML = "No log."
                }

                for(var i = 0; i < result.rows.length; i++)
                {
                    var row = result.rows.item(i);
                    var tableRow = table.insertRow(i+1);

                    var cell1 = tableRow.insertCell(0);
                    var cell2 = tableRow.insertCell(1);
                    var cell3 = tableRow.insertCell(2);
                    var cell4 = tableRow.insertCell(3);

                    cell1.innerHTML = row['id'];
                    cell2.innerHTML = row['LogTime'];
                    cell3.innerHTML = row['Latitude'];
                    cell4.innerHTML = row['Longitude'];
                }     
            });
        });

        window.requestFileSystem(window.TEMPORARY, 1024*1024, fsRead, fsErrorHandler);
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