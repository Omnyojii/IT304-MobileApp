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

function onDeviceReady() {
    console.log('deviceready');
}


// -------------------------------------------------- RSS FETCH ---------------------------------------------//

// var rssUrl = "http://rss.cnn.com/rss/edition_world.rss";
// var rssUrl = "https://internetprotocol.co/rss";
// var rssUrl = "https://www.theguardian.com/world/rss";
// var rssUrl = "https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml";
// alert(encodeURIComponent(rssUrl));

function parseRSS(url, callback) {
    $.ajax({
        url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url) + '&api_key=f3ytfo3o1wjq7qefpvtdbaigoix78e75q9bdjubx',
        dataType: 'json',
        success: function(data) {
            callback(data);
        }
    });
}

var html = "";

parseRSS(rssUrl, function(rss) {
    var items = rss.items;
    console.log(items.length - 1);
    console.log(items.length - 1);
    for (i = items.length - 1; i >= 0; i--) {
        // html += "<div class='card mb-3'><img class='card-img-top img-responsive' src='" + items[i].enclosure['link'] + " width='500' height='600'><div class='card-block'><h4 class='card-title'><a href='" + items[i].link + "'>" + items[i].title + "</a></h4><p class='card-text'>'" + items[i].description + "'</p><p class='card-text'><small class='text-muted>Last updated 3 mins ago</small></p></div>";
        html += "<div class='card mb-3'><img class='card-img-top img-responsive' src=" + items[i].enclosure['link'] + " width='500' height='600'><div class='card-body'><h4 class='card-title'><a href=" + items[i].link + ">" + items[i].title + "</a></h4><p class='card-text'>" + items[i].description + "</p><p class='card-text'><small class='text-muted'><h5 class='card-text'>Posted: " + items[i].pubDate + " GMT</h5></small></p></div></div>";
        // html += "<div class=card mb-3><img class=card-img-top img-responsive src=" + items[i].enclosure['link'] + " width=500 height=600><div class=card-block><h4 class=card-title><a href=" + items[i].link + ">" + items[i].title + "</a></h4><p class=card-text>" + items[i].description + "</p><p class=card-text><small class=text-muted>Last updated 3 mins ago</small></p></div></div>';" //no qoutes on attributes
    }
    $("#feeds").html(html);
});



//------------------------------------------------ InAppBrowser-----------------------------------------------//

addEventListener('click', function(event) {
    // event.preventDefault(); // Don't navigate!
    const anchor = event.target.closest("a"); // Find closest Anchor (or self)
    if (!anchor) return; //
    console.log(anchor.getAttribute('href'));
    const clink = anchor.getAttribute('href');
    openBrowser(clink);
});

function openBrowser(url) {
    console.log(url);
    var target = '_self';
    var options = "location = yes, hideurlbar = yes";
    var ref = cordova.InAppBrowser.open(url, target, options);
}