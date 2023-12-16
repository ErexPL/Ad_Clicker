const desktop = document.getElementById("desktop");
const currencyDisplay = document.getElementById("currencyDisplay");
const upgrades = document.querySelectorAll("#upgrades > div");
let currency = 0;
let spawnAdCooldown = 5000;
let adCloserCooldown = 50000;
let closeButtonLVL = "closeButton1";

function spawnAd() {
    let ad = document.createElement("div");
    ad.className = "ad";
    ad.style.top = Math.floor(Math.random() * 451) + "px";
    ad.style.left = Math.floor(Math.random() * 601) + "px";
    ad.style.backgroundImage = "url(https://picsum.photos/250/188?random=" + Math.floor(Math.random() * 1000000) + ")";
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
        case "weakFirewall":
            document.getElementById("weakerFirewall").className = "";
            spawnAdCooldown = 4000;
            break;
        case "bigXs":
            document.getElementById("biggerXs").className = "";
            closeButtons = document.querySelectorAll("." + closeButtonLVL);
            closeButtonLVL = "closeButton2";
            closeButtons.forEach(closeButton => {
                closeButton.className = closeButtonLVL;
            });
            break;
        case "adCloser_1.0":
            adCloser();
            document.getElementById("adCloser_2.0").className = "";
            break;
        case "weakerFirewall":
            spawnAdCooldown = 3000;
            break;
        case "biggerXs":
            closeButtons = document.querySelectorAll("." + closeButtonLVL);
            closeButtonLVL = "closeButton3";
            closeButtons.forEach(closeButton => {
                closeButton.className = closeButtonLVL;
            });
            break;
        case "adCloser_2.0":
            adCloserCooldown = 25000;
            break;
    };

};

spawnAd();
