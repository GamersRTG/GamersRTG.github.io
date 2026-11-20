// Handles payload tab loading, rendering, and dispatching.
// payloads tabs
function loadLastTab() {
    // Homebrew shortcuts are displayed on the first screen; no payload tabs remain.
    user.lastTab = 'homebrew';
    storage.set('lastTab', 'homebrew');
}

function saveLastTab(tab) {
    // Update state
    user.lastTab = tab;
    storage.set('lastTab', tab);

    // The Homebrew shortcuts live in the first-screen footer.
    var footer = document.getElementById('homebrew-footer');
    if (footer && tab !== 'homebrew') footer.innerHTML = '';
}

function Loadpayloads(payload) {
    if (!isPS4Console()) {
        var inputIp = ui.ps4IpInput ? ui.ps4IpInput.value.trim() : "";
        if (!inputIp || /\s/.test(inputIp)) {
            alert(window.lang.ps4IpInvalid);
            return;
        }

        if (user.ps4Fw == null || user.ps4Fw == 'undefined') {
            if (ui.ps4FwSelect) ui.ps4FwSelect.style.border = "2px solid red";
            return;
        }
        user.ip = inputIp;
    }
    try {
        storage.session.remove('binloader');
        
        if (payload.id == undefined) {
            var payloadFile = ui.customPayloadInput ? ui.customPayloadInput.files[0] : null;
            if (!payloadFile) return;
            customPayload(payloadFile);
        } else {
            payloadRouter(payload);
        }

    } catch (e) {
        alert('Failed to load payload: ' + payload.name + ' | Error: ' + e);
    }
}


function renderPayloads(payloads) {
    if (!payloads || !payloads.length) return;

    var footer = document.getElementById('homebrew-footer');
    var hasHomebrew = false;
    for (var i = 0; i < payloads.length; i++) {
        if (payloads[i].category === 'homebrew') hasHomebrew = true;
    }
    if (footer && hasHomebrew) {
        footer.innerHTML = '';
        var heading = document.createElement('div');
        heading.className = 'homebrew-footer-heading';
        heading.textContent = 'Homebrew'; // Intentionally never translated.
        footer.appendChild(heading);
    }

    for (var j = 0; j < payloads.length; j++) {
        (function (payload) {
            if (payload.category !== 'homebrew') return;
            if (hideUnsupportedPayloads && user.ps4Fw && !isPayloadSupported(payload)) return;

            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'homebrew-footer-btn';
            button.textContent = payload.name;
            button.title = payload.description ? payload.description.replace(/<[^>]*>/g, ' ') : payload.name;
            button.dataset.payloadId = payload.id;
            button.addEventListener('click', function () { Loadpayloads(payload); });
            if (footer) footer.appendChild(button);
        })(payloads[j]);
    }
}

function loadAdvancedPayloads() {
    // Advanced payload panel is not part of this Homebrew-only interface.
    return;
}


// Verifica se o firmware atual é compatível com o payload.
function isPayloadSupported(payload) {
    var userFW = parseFloat(getPs4FwVersion() || user.ps4Fw);
    if (!userFW) return false;

    var firmwareRule = payload && payload.specificFW ? payload.specificFW.trim() : "";
    if (firmwareRule === "") return true;

    var rawStr = firmwareRule.replace(/latest/gi, commonMax);
    var rules = rawStr.split(',');

    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i].trim();
        if (rule.indexOf('-') !== -1) {
            var parts = rule.split('-');
            var minVal = parseFloat(parts[0]);
            var maxVal = parseFloat(parts[1]);
            if (userFW >= minVal && userFW <= maxVal) return true;
        } else if (userFW == parseFloat(rule)) {
            return true;
        }
    }
    return false;
}
