/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { ButtonDescriptor } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor";
import { Popup } from "@workadventure/iframe-api-typings/Api/iframe/Ui/Popup";
import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let cloclPopup: any = undefined;

WA.room.onEnterLayer('clockZone').subscribe(() => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    cloclPopup = WA.ui.openPopup("clockPopup","현재 시각은 " + time+"입니다.",[]);
})

WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

function closePopUp(){
    if (cloclPopup !== undefined) {
        cloclPopup.close();
        cloclPopup = undefined;
    }
}

function makePopup(layer: string, area: string, message: string, button: ButtonDescriptor[]){
    let popup:Popup;
    WA.room.onEnterLayer(layer).subscribe(()=>{
        popup = WA.ui.openPopup(area, message, button);
    });
    WA.room.onLeaveLayer(layer).subscribe(()=>{
        popup.close();
    });
}

function makeTimeoutPopup(layer: string, area: string, message: string, timeout: number) {
    let popup: Popup;
    WA.room.onEnterLayer(layer).subscribe(()=>{
        popup = WA.ui.openPopup(area, message, []);
        setTimeout(()=>popup.close(), timeout);
    });
}

makePopup('drawerZone', 'drawerPopup', "서랍장이다. 안에 무엇이 있을까?", [
    {
        label: "열기",
        callback: (popup)=>{
            popup.close();
            popup = WA.ui.openPopup("drawerPopup", "과자 부스러기가 있다.", []);
            setTimeout(()=>popup.close(), 1500);
        }
    }
]);
makePopup('windowZone', 'windowPopup', '창밖은 평화롭다.', []);
makePopup('fireZone', 'firePopup', '불이 나면 사용할 수 있도록 위치를 기억해두자.', []);
makeTimeoutPopup('room1Zone', 'room1Popup', '강당 1', 1500);
makeTimeoutPopup('room2Zone', 'room2Popup', '강당 2', 1500);