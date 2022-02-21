//#region import

import * as data from "./data.js";

//#endregion import
//#region context menu

function createMenu(){
    chrome.contextMenus.create({
        "title": "Вставить данные",
        "contexts": ["all"],
        "id": "main"
    });
    chrome.contextMenus.create({
        "title": "Клиент",
        "contexts": ["all"],
        "id": "client",
        "parentId":"main"
    });
    data.fatherNames.forEach(element => {
        chrome.contextMenus.create({
            "title": element,
            "contexts": ["all"],
            "id": "getFIO_" + element,
            "parentId": "client",
            "onclick": getFIO
        });
    });
}
createMenu();

//#endregion context menu
//#region methods

function getRandomWord(items){
    return items[Math.floor(Math.random()*items.length)];
}

function sendText(info, tab, text){
    if (info.editable){
        chrome.tabs.sendMessage(tab.id, {
            "text": text
        });
    }
}

function getFIO(info, tab) {
    let firstName = getRandomWord(data.firstNames);
    let lastName = getRandomWord(data.lastNames);
    let fatherName = info.menuItemId.replace('getFIO_', '');
    sendText(info, tab, firstName + ' ' + lastName + ' ' + fatherName);
}

//#endregion methods