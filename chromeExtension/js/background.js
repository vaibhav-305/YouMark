chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    console.log('This is it');
    //console.log(details)
    chrome.tabs.query({ }, function () {
        chrome.tabs.sendMessage(details.tabId, { "action": 'changed' });
    });
}
);

//extension clickable only when matches 
chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'youtube' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'www.youtube.com/watch' },
                    })
                ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

//send message to content when extension icon clicked 
chrome.pageAction.onClicked.addListener(function (tab) {
    //message passing to content script
    console.log('Icon clicked');
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "action": 'clicked' });
    });
});

const proxy="https://youmark-backend.herokuapp.com"

//recieving message from content
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //console.log(message);

    if (message.action === 'verify') {
        chrome.storage.local.get(['YouNoteAuthToken'], function (result) {
            //x2wqconsole.log('Value currently is ' + result.YouNoteAuthToken);
            let token = result.YouNoteAuthToken;
            fetch(proxy+"/verify", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            }).then(response => response.json())
                .then(data => {
                    //console.log("verify: ", data);
                    if (data === true)
                        sendResponse({ verdict: true });
                    else {
                        chrome.storage.local.remove('YouNoteAuthToken')
                        sendResponse({ verdict: false });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    sendResponse({ verdict: false });
                });
        });
        /*setTimeout(function () {
            sendResponse({ verdict: true });
        }, 5000);*/
    }
    else if (message.action === 'login') {
        fetch(proxy+"/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: message.data
        }).then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data.status === 200) {
                    chrome.storage.local.set({ YouNoteAuthToken: data.token }, function () {
                        //console.log('Value is set to ' + data.token);
                    });
                    sendResponse({ verdict: true });
                }
                else {
                    //console.log("Sugoi");
                    sendResponse({ verdict: false, msg: data.msg });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                sendResponse({ verdict: false, msg: error });
            });
        /*http://localhost:5000*/
    }
    else if (message.action === 'register') {
        fetch(proxy+"/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: message.data
        }).then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data.status === 200)
                    sendResponse({ verdict: true });
                else
                    sendResponse({ verdict: false, msg: data.msg });
            })
            .catch((error) => {
                console.error('Error:', error);
                sendResponse({ verdict: false, msg: error });
            });
    }
    else if (message.action === 'logout') {
        chrome.storage.local.remove('YouNoteAuthToken', function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
                sendResponse({ verdict: false, msg: "error while logging out" });
            }
            else
                sendResponse({ verdict: true, msg: "successfully logged out" });
        })
    }
    else if (message.action === 'add') {
        chrome.storage.local.get(['YouNoteAuthToken'], function (result) {
            //console.log('Value currently is ' + result.YouNoteAuthToken);
            let token = result.YouNoteAuthToken;
            fetch(proxy+"/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token, vidID: message.vidID, timestamp: message.timestamp, noteContent: message.noteContent })
            }).then(response => response.json())
                .then(data => {
                    //console.log(":>:")
                    //console.log(data);
                    if (data.status === 200)
                        sendResponse({ verdict: true });
                    else
                        sendResponse({ verdict: false });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    sendResponse({ verdict: false });
                });
        });
        //sendResponse({verdict: true});
    }
    else if (message.action === 'get') {
        chrome.storage.local.get(['YouNoteAuthToken'], function (result) {
            //console.log('Value currently is ' + result.YouNoteAuthToken);
            let token = result.YouNoteAuthToken;
            fetch(proxy+"/getData", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token, vidID: message.vidID })
            }).then(response => response.json())
                .then(res => {
                    //console.log(res);
                    if (res.status === 200)
                        sendResponse({ verdict: true, msg: res.data })
                    else
                        sendResponse({ verdict: false });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    sendResponse({ verdict: false });
                });
        });
        //sendResponse({ verdict: false });
    }
    else if (message.action === 'delete') {
        chrome.storage.local.get(['YouNoteAuthToken'], function (result) {
            //console.log('Value currently is ' + result.YouNoteAuthToken);
            let token = result.YouNoteAuthToken;
            fetch(proxy+"/deleteData", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token, vidID: message.vidID, timestamp: message.timestamp })
            }).then((res) => {
                if (res.ok)
                    sendResponse({ verdict: true });
                else
                    sendResponse({ verdict: false });
            }).catch(err => {
                console.error(err)
                sendResponse({ verdict: false });
            });
        })
    }
    return true;
})