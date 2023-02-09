let img_selector_1 = document.getElementById("img_1");
let img_selector_2 = document.getElementById("img_2");
let img_selector_3 = document.getElementById("img_3");
let img_selector_4 = document.getElementById("img_4");
let img_selector_5 = document.getElementById("img_5");
let img_selector_6 = document.getElementById("img_6");
let img_selector_7 = document.getElementById("img_7");
let img_selector_8 = document.getElementById("img_8");
let img_selector_9 = document.getElementById("img_9");
let img_selector_10 = document.getElementById("img_10");

let val = 1;

img_selector_2.setAttribute('style', 'display:none;');
img_selector_3.setAttribute('style', 'display:none;');
img_selector_4.setAttribute('style', 'display:none;');
img_selector_5.setAttribute('style', 'display:none;');
img_selector_6.setAttribute('style', 'display:none;');
img_selector_7.setAttribute('style', 'display:none;');
img_selector_8.setAttribute('style', 'display:none;');
img_selector_9.setAttribute('style', 'display:none;');
img_selector_10.setAttribute('style', 'display:none;');

setInterval(myTimer, 4000);

function myTimer() {

    switch (val) {
        case 1:
            img_selector_1.setAttribute('style', 'display:none;');
            break;
        case 2:
            img_selector_2.setAttribute('style', 'display:none;');
            break;
        case 3:
            img_selector_3.setAttribute('style', 'display:none;');
            break;
        case 4:
            img_selector_4.setAttribute('style', 'display:none;');
            break;
        case 5:
            img_selector_5.setAttribute('style', 'display:none;');
            break;
        case 6:
            img_selector_6.setAttribute('style', 'display:none;');
            break;
        case 7:
            img_selector_7.setAttribute('style', 'display:none;');
            break;
        case 8:
            img_selector_8.setAttribute('style', 'display:none;');
            break;
        case 9:
            img_selector_9.setAttribute('style', 'display:none;');
            break;
        case 10:
            img_selector_10.setAttribute('style', 'display:none;');
    }

    val++;

    if (val == 11) {
        val = 1;
    } 

    switch (val) {
        case 1:
            img_selector_1.setAttribute('style', 'display:block;');
            break;
        case 2:
            img_selector_2.setAttribute('style', 'display:block;');
            break;
        case 3:
            img_selector_3.setAttribute('style', 'display:block;');
            break;
        case 4:
            img_selector_4.setAttribute('style', 'display:block;');
            break;
        case 5:
            img_selector_5.setAttribute('style', 'display:block;');
            break;
        case 6:
            img_selector_6.setAttribute('style', 'display:block;');
            break;
        case 7:
            img_selector_7.setAttribute('style', 'display:block;');
            break;
        case 8:
            img_selector_8.setAttribute('style', 'display:block;');
            break;
        case 9:
            img_selector_9.setAttribute('style', 'display:block;');
            break;
        case 10:
            img_selector_10.setAttribute('style', 'display:block;');
    }


}