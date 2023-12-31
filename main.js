const desktop = document.getElementById("desktop");
const currencyNumber = document.getElementById("currencyNumber");
const adExeUI = document.getElementById("adExeUI");
const chargeMeter = document.getElementById("chargeMeter");
const upgrades = document.querySelectorAll("#upgrades > div");
let currency = 0;
let adRevenue = 1;
let spawnAdCooldown = 5000;
let adCloserCooldown = 50000;
let closeButtonLVL = "closeButton1";
let chargeMeterRequired = 10;
let chargeMeterCounter = 0;
let goldenAdChance = 0;

function spawnAd() {
    let ad = document.createElement("div");
    let closeButton = document.createElement("div");
    ad.className = "ad";
    ad.style.left = Math.floor(Math.random() * 74 + 1) + "%";
    ad.style.top = Math.floor(Math.random() * 74 + 1) + "%";
    if (Math.floor(Math.random() * 100 + 1) <= goldenAdChance) {
        ad.style.backgroundImage = "url(imgs/golden_ad.png)";
        ad.style.boxShadow = "0vmin 0vmin 2.4vmin 0vmin gold";
        ad.style.borderColor = "gold";
        closeButton.style.borderColor = "gold";
        ad.addEventListener('click', function(node) {
            ad.className += " closeAd";
            currency += 10;
            currencyNumber.innerHTML = currency;
            setTimeout(() => {
                ad.remove();
            }, 100);
        }, false);
    } else {
        ad.style.backgroundImage = "url(https://picsum.photos/384/216?random=" + Math.floor(Math.random() * 1000000) + ")";
    };
    desktop.appendChild(ad);
    closeButton.className = closeButtonLVL;
    closeButton.addEventListener('click', function(node) {
        let parent = node.currentTarget.parentNode;
        parent.className += " closeAd";
        currency += adRevenue;
        currencyNumber.innerHTML = currency;
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
        currencyNumber.innerHTML = currency;
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
        currencyNumber.innerHTML = currency;
        setTimeout(() => {
            parent.remove();
        }, 100);
    };
    setTimeout(() => {
        adCloser();
    }, adCloserCooldown);
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

upgrades.forEach(upgrade => {
    upgrade.addEventListener('click', function() {
        if (currency >= upgrade.getAttribute("price")) {
            currency -= upgrade.getAttribute("price");
            currencyNumber.innerHTML = currency;
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

        case "adCloser":
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

        case "goldenAd":
            document.getElementById("goldenScanner").className = "";
            goldenAdChance = 1;
            break;
        case "goldenScanner":
            document.getElementById("goldenScanner_2.0").className = "";
            goldenAdChance = 2;
            break;
        case "goldenScanner_2.0":
            document.getElementById("goldenScanner_3.0").className = "";
            goldenAdChance = 3;
            break;
        case "goldenScanner_3.0":
            goldenAdChance = 5;
            break;

        case "marketing":
            adRevenue = 2;
            break;
    };
};

currencyNumber.innerHTML = currency;
spawnAd();
