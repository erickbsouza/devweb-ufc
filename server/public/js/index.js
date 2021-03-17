window.onload = function () {
    updateChangeThemeButton();
    updateFontCss();
    loadOccurrences();
}

function loadOccurrences()
{
    fetch("/occurrence")
      .then(response => {
        response.json().then( (data) => {
            document.getElementById("loading-occurrence-message").remove();
            mountOccurrenceHtml(data);
            });
      }).catch(err => {
        console.error('Erro ao obter ocorrências', err);
        });
}