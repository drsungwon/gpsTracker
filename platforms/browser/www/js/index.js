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
var app = {

    // Application Constructor
    initialize: function() 
    {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        var buttonOperationMode = document.getElementById('btn-operation-mode');
        var buttonConfigure = document.getElementById('btn-configure');
        var buttonReport = document.getElementById('btn-report');

        buttonOperationMode.addEventListener('click', this.updateOperationMode.bind(this));
        buttonConfigure.addEventListener('click', this.configureProgram.bind(this));
        buttonReport.addEventListener('click', this.reportLogFile.bind(this));
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() 
    {
        this.receivedEvent('deviceready');
    },

    updateOperationMode: function() 
    {
        var buttonOperationMode = document.getElementById('btn-operation-mode');
        var statusBar = document.getElementById('status-bar');
        var loggedTime = 1;

        console.log(buttonOperationMode.innerText);

        function logTimerFunction() 
        {
            var statusBar = document.getElementById('status-bar');     
            statusBar.textContent = loggedTime;
            loggedTime += 1;
        }

        var logOb = false;

        function writeLog(str) {
            if(!logOb) return;
            var log = str + " [" + (new Date()) + "]\n";
            console.log("going to log "+log);
            logOb.createWriter(function(fileWriter) {
                
                fileWriter.seek(fileWriter.length);
                
                var blob = new Blob([log], {type:'text/plain'});
                fileWriter.write(blob);
                console.log("ok, in theory i worked");
            }, fail);
        }

        if(buttonOperationMode.innerText == "START") 
        {
            buttonOperationMode.innerText = "STOP";
            statusBar.textContent = 'Logging started.';

            const timerClock = setInterval(logTimerFunction, 1000);
            localStorage.setItem("logTimer", timerClock);

            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
                alert("got main dir" + dir);
                dir.getFile("log.txt", {create:true, exclusive:false}, function(file) {
                    console.log("got the file", file);
                    logOb = file;
                    writeLog("App started");			
                });
            });
        }         
        else 
        {
            buttonOperationMode.innerText = "START";
            statusBar.textContent = 'Logging stoped.';

            timerClock = localStorage.getItem("logTimer");
            clearInterval(timerClock);
        };
    },

    configureProgram: function() 
    {
        alert("configureProgram()");
    },

    reportLogFile: function() 
    {
        var emailAddress = prompt("Email to send:");
        var response = confirm("Send log file to " + emailAddress);

        logBody = "Send log file to " + emailAddress;
        
        if(response == true)
        {
            window.open('mailto:' + emailAddress + '?subject=Log file from GPS Tracker&body=' + logBody);
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) 
    {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();