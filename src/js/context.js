//#region import

import * as data from "./data.js";

//#endregion import
//#region context menu

function createMenu(){
    let contexts = [ "editable" ];
    //level 0
    chrome.contextMenus.create({
        "title": "Вставить данные ",
        "contexts": contexts,
        "id": "main"
    });
    
    //level 1
    chrome.contextMenus.create({
        "title": "Клиент ",
        "contexts": contexts,
        "id": "client",
        "parentId":"main"
    });
    
    chrome.contextMenus.create({
        "title": "Паспорт ",
        "contexts": contexts,
        "id": "passport",
        "parentId":"main",
        "onclick": getPassport
    });
    
    chrome.contextMenus.create({
        "title": "Телефон ",
        "contexts": contexts,
        "id": "phone",
        "parentId":"main",
        "onclick": getPhoneNumber
    });

    //level 2
    chrome.contextMenus.create({
        "title": "Мужчина ",
        "contexts": contexts,
        "id": "maleClient",
        "parentId":"client"
    });
    chrome.contextMenus.create({
        "title": "Женщина ",
        "contexts": contexts,
        "id": "femaleClient",
        "parentId":"client"
    });

    //level 3
    data.fatherNames.forEach(element => {

        chrome.contextMenus.create({
            "title": element,
            "contexts": contexts,
            "id": "getFIO.male." + element,
            "parentId": "maleClient",
            "onclick": getMaleFIO
        });
        
        chrome.contextMenus.create({
            "title": element,
            "contexts": contexts,
            "id": "getFIO.female." + element,
            "parentId": "femaleClient",
            "onclick": getFemaleFIO
        });
    });
}
createMenu();

//#endregion context menu
//#region methods

function getRandomWord(items){
    return items[Math.floor(Math.random() * items.length)];
}

function sendText(info, tab, text){
    if (info.editable){
        chrome.tabs.sendMessage(tab.id, {
            "text": text
        });
    }
}

function getMaleFIO(info, tab) {
    let firstName = getRandomWord(data.maleFirstNames);
    let lastName = getRandomWord(data.maleLastNames);
    let fatherName = info.menuItemId.replace("getFIO.male.", "");
    sendText(info, tab, firstName + ' ' + lastName + ' ' + fatherName);
}

function getFemaleFIO(info, tab) {
    let firstName = getRandomWord(data.femaleFirstNames);
    let lastName = getRandomWord(data.femaleLastNames);
    let fatherName = info.menuItemId.replace("getFIO.female.", "");
    sendText(info, tab, firstName + ' ' + lastName + ' ' + fatherName);
}

function getPassport(info, tab) {
    var chars = "0123456789";
    var length = 10;
    var passport = "";
    for (var i = 0; i < length; i ++){
        var random_num = Math.floor(Math.random() * chars.length);
        passport += chars.substring(random_num, random_num + 1);
    }
    sendText(info, tab, passport);
}

function getPhoneNumber(info, tab) {
    var chars = "0123456789";
    var length = 9;
    var phone = "9";
    for (var i = 0; i < length; i ++){
        var random_num = Math.floor(Math.random() * chars.length);
        phone += chars.substring(random_num, random_num + 1);
    }
    sendText(info, tab, phone);
}

//#endregion methods