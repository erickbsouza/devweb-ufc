//Código executado quando a página é recarregada.
window.onload = function () {
    updateChangeThemeButton();
    updateFontCss();
}

function onChangeThemeClicked(theme) {
    changeThemeCss(theme);
    var button = document.getElementById('change-theme-button');
    button.onclick = function () {
        onChangeThemeClicked(theme == 0 ? 1 : 0);
    }
    button.textContent = theme == 1 ? 'Modo Claro' : 'Modo Escuro';
}

function updateChangeThemeButton() {
    currentTheme = localStorage.getItem('theme');
    changeTheme = 0;
    buttonText = '';
    if (currentTheme == null || currentTheme == 0) {
        changeTheme = 1;
        buttonText = 'Modo Escuro';
    } else {
        changeTheme = 0;
        buttonText = 'Modo Claro';
    }
    changeThemeCss(currentTheme);
    var button = document.getElementById('change-theme-button');
    button.onclick = function () {
        onChangeThemeClicked(changeTheme);
    }
    button.textContent = buttonText;
}

function updateFontCss() {
    fontSize = localStorage.getItem('font-size');
    if (fontSize != null) {
        changeFontCss(fontSize);
    }
}

//Código executado quando o usuário clica para mudar a fonte.
function onChangeFontClicked(fontSize) {
    localStorage.setItem('font-size', fontSize);
    changeFontCss(fontSize);
}

function changeThemeCss(theme) {
    localStorage.setItem('theme', theme);
    var themeCssFileSuffix = theme == 1 ? '-contrast.css' : '.css';
    var themeDependentCss = document.getElementsByClassName('theme-dependent');
    for (i = 0; i < themeDependentCss.length; ++i) {
        var cssObj = themeDependentCss[i];
        var cssPath = cssObj.getAttribute('href');
        if (themeCssFileSuffix == '-contrast.css') {
            cssPath = cssPath.replace('.css', themeCssFileSuffix);
        }
        else {
            cssPath = cssPath.replace('-contrast.css', '.css');
        }
        changeCSSByObj(cssPath, cssObj);
    }
}

function changeFontCss(fontSize) {
    var cssFile = '';
    if (fontSize == 0) {
        cssFile = '/css/font/font-small.css';
    }
    else if (fontSize == 1) {
        cssFile = '/css/font/font-medium.css';
    }
    else {
        cssFile = '/css/font/font-large.css';
    }
    changeCSSById(cssFile, 'font-css');
}


function changeCSSById(cssFile, cssLinkId) {
    var link = document.getElementById(cssLinkId);
    changeCSSByObj(cssFile, link);
}

function changeCSSByObj(cssFile, cssLinkObj) {
    cssLinkObj.setAttribute('href', cssFile);
}