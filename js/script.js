var siteNameInput = document.getElementById('bookmarkName');
var siteURLInput = document.getElementById('bookmarkURL');
var submitBtn = document.getElementById('submitBtn');
var tableContent = document.getElementById('tableContent');
var closeBtn = document.getElementById('closeBtn');
var alertBox = document.getElementById('alertBox');

// Load saved sites from localStorage
var sites = localStorage.getItem('sites') ? JSON.parse(localStorage.getItem('sites')) : [];
displaySites();

submitBtn.addEventListener('click', function () {
    if (validateSiteName() && validateSiteURL()) {
        var site = {
            name: siteNameInput.value.trim(),
            url: siteURLInput.value.trim()
        };
        sites.push(site);
        localStorage.setItem('sites', JSON.stringify(sites)); // Save to localStorage
        displaySites();
        clearForm();
    } else {
        alertBox.classList.remove('d-none');
    }
});

closeBtn.addEventListener('click', function () {
    alertBox.classList.add('d-none');
});

function displaySites() {
    var rows = '';
    for (var i = 0; i < sites.length; i++) {
        rows += `
            <tr>
                <td>${i + 1}</td>
                <td>${sites[i].name}</td>
                <td><a href="${sites[i].url}" target="_blank" class="btn btn-visit">Visit</a></td>
                <td><button class="btn btn-delete" onclick="deleteSite(${i})">Delete</button></td>
            </tr>
        `;
    }
    tableContent.innerHTML = rows;
}

function deleteSite(index) {
    sites.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(sites)); // Update localStorage
    displaySites();
}

function clearForm() {
    siteNameInput.value = '';
    siteURLInput.value = '';
    siteNameInput.classList.remove('is-valid');
    siteURLInput.classList.remove('is-valid');
}

function validateSiteName() {
    if (siteNameInput.value.trim().length >= 3) {
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        return true;
    } else {
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        return false;
    }
}

function validateSiteURL() {
    var urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (urlPattern.test(siteURLInput.value.trim())) {
        siteURLInput.classList.add('is-valid');
        siteURLInput.classList.remove('is-invalid');
        return true;
    } else {
        siteURLInput.classList.add('is-invalid');
        siteURLInput.classList.remove('is-valid');
        return false;
    }
}
