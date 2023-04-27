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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

const baseSurviceUrl = "https://baas.kinvey.com/appdata/kid_SJkIP-gW2/FindMe";
const kinveyUsername = "kid_Syyu7e2M2";
const kinveyPassword = "db510a8a1a6349aab8f884e80b30aa25";
const base64Auth = btoa(kinveyUsername + ":" + kinveyPassword);

document.addEventListener('deviceready', onDeviceReady, false);



let findId;
let Fname = document.querySelector("#findName");
let phone = document.querySelector("#findNumber");
let story = document.querySelector("#findStory");
let findImg = document.querySelector("#myImage");
let AppImg;




document.querySelector("#find").onclick = function () {
    if (localStorage.getItem("userObj") === null) { 
        localStorage.userObj = JSON.stringify([]);  
    }
    let userObj = JSON.parse(localStorage.userObj); 
    console.log(userObj);
    findId = "";
    if (userObj.length == 0) {
        findId = 0;
    }
    else if (userObj.length > 0) {
        findId = parseInt(userObj[userObj.length - 1].Id) + 1;
    }

    let obj = { 
        "Id": findId,
        "Name": Fname.value,
        "Phone": phone.value,
        "Story": story.value,
        "Image": AppImg
    };
    console.log(obj.Image)
    userObj.push(obj);
    localStorage.userObj = JSON.stringify(userObj);
    console.log(JSON.parse(localStorage.userObj));



        $('#pages2').html(`
            <div class="wrap animate pop">
                <div class="overlay">
                    <div class="overlay-content animate slide-left delay-2">
                        <p class="animate slide-left pop delay-5" style="color: white; margin-bottom: 2.5rem;"></p>
                    </div>

                    <img src="${'data:image/jpeg;base64,' + obj.Image}" id="find-picture-view" class="animate slide delay-5" />
                    <div class="dots animate">
                    <div class="dot animate slide-up delay-6"></div>
                    <div class="dot animate slide-up delay-7"></div>
                    <div class="dot animate slide-up delay-8"></div>
                </div>
            </div>
            <div class="text">
                <p>
                    <b>Име:</b>
                    <i id="find-name">${obj.Name}</i>
                    <br>
                    <b>Тел. номер:</b>
                    <i id="find-number">${obj.Phone}</i>
                    <br>
                    <b>Описание:</b>
                    <i id="find-story">${obj.Story}</i>
                </p>
            </div>
    `);
};



let lostId;
let Lname = document.querySelector("#lostName");
let phone2 = document.querySelector("#lostNumber");
let story2 = document.querySelector("#lostStory");
let findImg2 = document.querySelector("#myImage2");
let AppImg2;


document.querySelector("#lost").onclick = function () {
    if (localStorage.getItem("userObj2") === null) { 
        localStorage.userObj2 = JSON.stringify([]);  
    }
    let userObj2 = JSON.parse(localStorage.userObj2); 
    console.log(userObj2);
    lostId = "";
    if (userObj2.length == 0) {
        lostId = 0;
    }
    else if (userObj2.length > 0) {
        lostId = parseInt(userObj2[userObj2.length - 1].Id) + 1;
    }

    let obj2 = { 
        "Id": lostId,
        "Name": Lname.value,
        "Phone": phone2.value,
        "Story": story2.value,
        "Image": AppImg2
    };
    console.log(obj2.Image)
    userObj2.push(obj2);
    localStorage.userObj2 = JSON.stringify(userObj2);
    console.log(JSON.parse(localStorage.userObj2));


   // for(obj; obj <= userObj2.length; obj++) {
        $('#pages3').html(`
        <div class="wrap animate pop">
            <div class="overlay">
                <div class="overlay-content animate slide-left delay-2">
                    <p class="animate slide-left pop delay-5" style="color: white; margin-bottom: 2.5rem;"></p>
                </div>

                <img src="${'data:image/jpeg;base64,' + obj2.Image}" id="find-picture-view" class="animate slide delay-5" />
                <div class="dots animate">
                <div class="dot animate slide-up delay-6"></div>
                <div class="dot animate slide-up delay-7"></div>
                <div class="dot animate slide-up delay-8"></div>
            </div>
        </div>
        <div class="text">
            <p>
                <b>Име:</b>
                <i id="find-name">${obj2.Name}</i>
                <br>
                <b>Тел. номер:</b>
                <i id="find-number">${obj2.Phone}</i>
                <br>
                <b>Описание:</b>
                <i id="find-story">${obj2.Story}</i>
            </p>
        </div>        
    `);
   // }
};





function sendPictureRequest() {
    $.mobile.loading("show");

    let base64Img = $('#myImage').attr('src');

    let requestData = {
        Picture: base64Img
    };
    console.log(requestData);

    $.ajax({
        type: "PUT",
        url: baseSurviceUrl + "picture",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(requestData),
        success: function (imageUri) {
            if(imageUri != null) {
                AppImg = imageUri.toString();
            }
            $.mobile.loading("hide");
            alert("Successfully added!");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.mobile.loading("hide");
        }
    });
}



function sendPictureRequest2() {
    $.mobile.loading("show");

    let base64Img = $('#myImage2').attr('src');

    let requestData = {
        Picture: base64Img
    };
    console.log(requestData);

    $.ajax({
        type: "PUT",
        url: baseSurviceUrl + "picture",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(requestData),
        success: function (imageUri) {
            if(imageUri != null) {
                AppImg2 = imageUri.toString();
            }
            $.mobile.loading("hide");
            alert("Successfully added!");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.mobile.loading("hide");
        }
    });
}








function onBatteryLow(status) {

}

function onBatteryStatus(status) {
    if (status.level <= 10) {
        alert("Battery Level Low " + status.level + "%");
        $('#find').prop('disabled', true);
        $('#lost').prop('disabled', true);
        if (status.isPlugged) {
            $('#find').prop('disabled', false);
            $('#lost').prop('disabled', false);
        }
    } else {
        $('#find').prop('disabled', false);
        $('#lost').prop('disabled', false);
    }
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    window.addEventListener('batterystatus', onBatteryStatus, false);
    window.addEventListener('batterylow', onBatteryLow, false);

    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);


    $('#camera-btn').click(
        function (e) {
            e.preventDefault();
            getPicture();
        }
    );

    $('#camera-btn2').click(
        function (e) {
            e.preventDefault();
            getPicture2();
        }
    );


    window.addEventListener("orientationchange", function () {
        console.log(screen.orientation);
    });
}





function getPicture() {
    navigator.camera.getPicture(
        cameraSuccess,
        cameraError,
        {
            quality: 25,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG
        }
    );
}

function getPicture2() {
    navigator.camera.getPicture(
        cameraSuccess2,
        cameraError2,
        {
            quality: 25,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG
        }
    );
}

function cameraSuccess2(imageData) {
    AppImg2 = imageData;
    console.log(imageData);
    $('#myImage2').attr('src', 'data:image/jpeg;base64,' + imageData);
    $('#myImage2').show();
    $('#myImage2').css('display', 'block');
}

function cameraSuccess(imageData) {
    AppImg = imageData;
    console.log(imageData);
    $('#myImage').attr('src', 'data:image/jpeg;base64,' + imageData);
    $('#myImage').show();
    $('#myImage').css('display', 'block');
}

function cameraError(message) {
    alert(message);
}

function cameraError2(message) {
    alert(message);
}




function checkConnection() {
    var networkState = navigator.connection.type;
    console.log(navigator.connection);

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    alert('Вид на връзката: ' + states[networkState]);
}

function onOffline() {
    alert('Няма връзка!');
    $('#find').prop('disabled', true);
    $('#lost').prop('disabled', true);
}

function onOnline() {
    alert('Има връзка!');
    $('#find').prop('disabled', false);
    $('#lost').prop('disabled', false);
}



const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
    item.addEventListener('click', function () {
        switchers.forEach(item => item.parentElement.classList.remove('is-active'))
        this.parentElement.classList.add('is-active')
    })
})