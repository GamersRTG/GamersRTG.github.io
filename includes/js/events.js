// DOM event listeners and popup toggle functions.

// Scroll snap (PS4 only)
ui.mainContainer.addEventListener('scroll', function () {
    if (!isPS4Console() || !ui.initialScreen) return;

    if (ui.mainContainer.scrollTop > lastScrollY) {
        if (lastSection !== 'exploit') {
            document.getElementById('exploitContainer').scrollIntoView({ block: 'end' });
            lastSection = 'exploit';
        }
    } else if (ui.mainContainer.scrollTop < lastScrollY) {
        if (lastSection !== 'initial') {
            ui.initialScreen.scrollIntoView({ block: 'end' });
            lastSection = 'initial';
        }
    }
    lastScrollY = ui.mainContainer.scrollTop;
});

// Jailbreak launch
ui.exploitRunBtn.addEventListener('click', function () {
    if (user.blockJailbreak) return;
    user.blockJailbreak = true;
    chooseHEN();
    jailbreak();
});

ui.psLogoContainer.addEventListener('click', function () {
    if (user.blockJailbreak) return;
    user.blockJailbreak = true;
    chooseHEN();
    jailbreak();
});

// PS4 firmware manual selector (local-server / phone mode)
// This selector is not present in the customized first-screen interface.
if (ui.ps4FwSelect) {
    ui.ps4FwSelect.addEventListener('change', function () {
        user.ps4Fw = ui.ps4FwSelect.value;
        storage.set('ps4Fw', ui.ps4FwSelect.value);
        ui.ps4FwSelect.style.border = '1px solid white';
        if (typeof CheckFW === 'function') CheckFW();
    });
}

// Auto-jailbreak/Auto-jailbreak retry stop button
ui.stopAutoJbBtn.addEventListener('click', function () {
    clearInterval(autoJbInterval);

    storage.session.set('autoJbRetry', false);
    storage.session.set('autoJb', false);

    toggleVisibility(ui.stopAutoJbBtn.id);
    var currentTheme = storage.getString('theme', 'index');
    if (currentTheme === 'compact') {
        ui.clickToStartText.textContent = projectName;
    } else {
        ui.clickToStartText.textContent = (window.lang && window.lang.clickToStart) || 'Click to Start';
    }
});

if (ui.debugConsoleElement && ui.consoleElement) {
    ui.debugConsoleElement.addEventListener('click', function () {
        var waitingText = (window.lang && window.lang.waitingUserInput) || 'Waiting for user action...';
        ui.consoleElement.innerHTML = '<center>' + waitingText + '</center>';
    });
}

// Update-cache button
ui.updateCacheBtn.addEventListener('click', function () {
    window.location.href = testModeUrl('./cache.html');
});

// Popup toggles
function aboutPopup() {
    toggleVisibility(ui.aboutPopupOverlay.id);
}

function settingsPopup() {
    toggleVisibility(ui.settingsPopupOverlay.id);
}

function themePopup() {
    toggleVisibility(ui.themePopupOverlay.id);
}

// Settings handlers
function setAdvancedPayloads(inputState) {
    user.advancedPayloads = false;
    storage.set('advancedPayloads', false);
    if (ui.advancedPayloadsInput) ui.advancedPayloadsInput.checked = false;
}

// select exploit option when loading the page
function loadExploitChain() {
    var radioElement = document.querySelector('input[name="exploitChain"][value="' + user.exploitChain + '"]');
    if (radioElement) {
        radioElement.checked = true;
    }
}

// Saves exploit chain choice to storage and updates user state
function exploitChain(value) {
    storage.set('exploitChain', value);
    user.exploitChain = parseFloat(value);
    if (ui.exploitChainLabel){
        if (storage.getString('theme') == 'compact'){
            ui.clickToStartText.textContent = getChainLabel(user.exploitChain);
        } else ui.exploitChainLabel.textContent = getChainLabel(value);
    }
}

function updateBareboneJB() {
    if (ui.bareboneJBInput) {
        ui.bareboneJBInput.checked = user.bareboneJB;
    }
}

function setBareboneJB(checked) {
    storage.set('bareboneJB', checked);
    user.bareboneJB = checked;
}

function clearStats() {
    if (!confirm(window.lang.clearStatsConfirm)) return;
    storage.remove('jbTotal');
    storage.remove('jbSuccess');
    updateJbStats(0, 0)
}

// To be only used when this project is served on a PS4-Websrv payload on a PS4.
// Send shutdown request to the server
function shutdownServer() {
    if (!confirm(window.lang.shutdownServerConfirm)) return;

    fetch('/shutdown')
        .then(function () {
            alert('Server is shutting down. The page will now reload.');
            window.location.reload();
        })
        .catch(function () {
            alert('Server stopped? (connection lost).');
            window.location.reload();
        });
}