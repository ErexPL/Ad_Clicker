const desktop = document.getElementById("desktop");
const currencyDisplay = document.getElementById("currencyDisplay");
const adExeUI = document.getElementById("adExeUI");
const chargeMeter = document.getElementById("chargeMeter");
const upgrades = document.querySelectorAll("#upgrades > div");
let currency = 0;
let spawnAdCooldown = 5000;
let adCloserCooldown = 50000;
let closeButtonLVL = "closeButton1";
let chargeMeterRequired = 10;
let chargeMeterCounter = 0;

function spawnAd() {
    let ad = document.createElement("div");
    ad.className = "ad";
    ad.style.left = Math.floor(Math.random() * 74 + 1) + "%";
    ad.style.top = Math.floor(Math.random() * 74 + 1) + "%";
    ad.style.backgroundImage = "url(https://picsum.photos/384/216?random=" + Math.floor(Math.random() * 1000000) + ")";
    desktop.appendChild(ad);
    let closeButton = document.createElement("div");
    closeButton.className = closeButtonLVL;
    closeButton.addEventListener('click', function(node) {
        let parent = node.currentTarget.parentNode;
        parent.className += " closeAd";
        currency++;
        currencyDisplay.innerHTML = "Closed Ads: " + currency;
        setTimeout(() => {
            parent.remove();
        }, 100);
    }, false);
    ad.appendChild(closeButton);
    setTimeout(() => {
        spawnAd();
    }, spawnAdCooldown);
};

function spawnAdOnce() {
    let ad = document.createElement("div");
    ad.className = "ad";
    ad.style.left = Math.floor(Math.random() * 74 + 1) + "%";
    ad.style.top = Math.floor(Math.random() * 74 + 1) + "%";
    ad.style.backgroundImage = "url(https://picsum.photos/384/216?random=" + Math.floor(Math.random() * 1000000) + ")";
    desktop.appendChild(ad);
    let closeButton = document.createElement("div");
    closeButton.className = closeButtonLVL;
    closeButton.addEventListener('click', function(node) {
        let parent = node.currentTarget.parentNode;
        parent.className += " closeAd";
        currency++;
        currencyDisplay.innerHTML = "Closed Ads: " + currency;
        setTimeout(() => {
            parent.remove();
        }, 100);
    }, false);
    ad.appendChild(closeButton);
};

function adCloser() {
    let closeButtons = document.querySelectorAll("." + closeButtonLVL);
    if (closeButtons.length != 0) {
        let node = closeButtons[Math.floor(Math.random() * closeButtons.length)];
        let parent = node.parentNode;
        parent.className += " closeAd";
        currency++;
        currencyDisplay.innerHTML = "Closed Ads: " + currency;
        setTimeout(() => {
            parent.remove();
        }, 100);
    };
    setTimeout(() => {
        adCloser();
    }, adCloserCooldown);
};

upgrades.forEach(upgrade => {
    upgrade.addEventListener('click', function() {
        if (currency >= upgrade.getAttribute("price")) {
            currency -= upgrade.getAttribute("price");
            currencyDisplay.innerHTML = "Closed Ads: " + currency;
            upgrade.className = "bought";
            applyUpgrade(upgrade.id);
            setTimeout(() => {
                upgrade.className = "";
            }, 200);
            setTimeout(() => {
                upgrade.remove();
            }, 400);
        } else {
            upgrade.className = "notBought";
            setTimeout(() => {
                upgrade.className = "";
            }, 200);
        }
    }, false);
});

function applyUpgrade(upgradeId) {
    let closeButtons = document.querySelectorAll("." + closeButtonLVL);

    switch (upgradeId) {
        case "adExe":
            document.getElementById("priorityExecutable").className = "";
            adExeUI.style.display = "flex";
            setTimeout(() => {
                adExeUI.style.scale = "1.1";
            }, 100);
            setTimeout(() => {
                adExeUI.style.scale = "1";
            }, 600);
            break;
        case "priorityExecutable":
            document.getElementById("highPriorityExecutable").className = "";
            chargeMeterRequired = 9;
            chargeMeterCounter = 0;
            chargeMeter.style.height = "0%";
            break;
        case "highPriorityExecutable":
            document.getElementById("higherPriorityExecutable").className = "";
            chargeMeterRequired = 8;
            chargeMeterCounter = 0;
            chargeMeter.style.height = "0%";
            break;
        case "higherPriorityExecutable":
            chargeMeterRequired = 7;
            chargeMeterCounter = 0;
            chargeMeter.style.height = "0%";
            break;

        case "weakFirewall":
            document.getElementById("weakerFirewall").className = "";
            spawnAdCooldown = 4000;
            break;
        case "weakerFirewall":
            document.getElementById("weakestFirewall").className = "";
            spawnAdCooldown = 3000;
            break;
        case "weakestFirewall":
            document.getElementById("brokenFirewall").className = "";
            spawnAdCooldown = 2500;
            break;
        case "brokenFirewall":
            spawnAdCooldown = 2000;
            break;
            
        case "bigXs":
            document.getElementById("biggerXs").className = "";
            closeButtons = document.querySelectorAll("." + closeButtonLVL);
            closeButtonLVL = "closeButton2";
            closeButtons.forEach(closeButton => {
                closeButton.className = closeButtonLVL;
            });
            break;
        case "biggerXs":
            document.getElementById("biggestXs").className = "";
            closeButtons = document.querySelectorAll("." + closeButtonLVL);
            closeButtonLVL = "closeButton3";
            closeButtons.forEach(closeButton => {
                closeButton.className = closeButtonLVL;
            });
            break;
        case "biggestXs":
            document.getElementById("hugeXs").className = "";
            closeButtons = document.querySelectorAll("." + closeButtonLVL);
            closeButtonLVL = "closeButton4";
            closeButtons.forEach(closeButton => {
                closeButton.className = closeButtonLVL;
            });
            break;
        case "hugeXs":
            closeButtons = document.querySelectorAll("." + closeButtonLVL);
            closeButtonLVL = "closeButton5";
            closeButtons.forEach(closeButton => {
                closeButton.className = closeButtonLVL;
            });
            break;

        case "adCloser_1.0":
            adCloser();
            document.getElementById("adCloser_2.0").className = "";
            break;
        case "adCloser_2.0":
            document.getElementById("adCloser_3.0").className = "";
            adCloserCooldown = 25000;
            break;
        case "adCloser_3.0":
            document.getElementById("adCloser_4.0").className = "";
            adCloserCooldown = 15000;
            break;
        case "adCloser_4.0":
            adCloserCooldown = 10000;
            break;
    };

};

function increaseMeter() {
    chargeMeterCounter++;
    chargeMeter.style.height = (100 / chargeMeterRequired) * chargeMeterCounter + "%";
    if (chargeMeterCounter == chargeMeterRequired) {
        setTimeout(() => {
            chargeMeterCounter = 0;
            chargeMeter.style.height = "0%";
            spawnAdOnce();
        }, 100);
    };
};

spawnAd();
