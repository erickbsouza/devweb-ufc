function loadOccurrences(filter)
{
    fetch("/occurrence")
      .then(response => {
        response.json().then( (data) => {
            mountOccurrenceHtml(data);
            });
      }).catch(err => {
        console.error('Erro ao obter ocorrências', err);
        });
}

function mountOccurrenceHtml(data)
{
    var cardContainer = document.getElementById("card-container");
    for (i = 0; i < data.length; ++i)
    {
        cardContainer.appendChild(createOccurrenceNode(data[i]));
    }
}

function createOccurrenceNode(occurrence)
{
    var cardDiv = document.createElement("div");
    cardDiv.className = "card column-4";

    var cardHeaderDiv = document.createElement("div");
    cardHeaderDiv.className = "card-header flex-between";

    var cardTitleP = document.createElement("p");
    cardTitleP.className = "card-title";
    cardTitleP.textContent = occurrence.title;

    var flexDiv = document.createElement("div");
    flexDiv.className = "flex-between";
    
    var dateTimeP = document.createElement("p");
    dateTimeP.className = "mr-10";
    dateTimeP.textContent = dateTimeFormat(occurrence.dateTime);
    
    var typeStatusI = document.createElement("i");
    typeStatusI.className = `material-icons occurrence-situation-${occurrence.status}`;
    typeStatusI.textContent = occurrence.type;

    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body flex-between";
    
    var detailsDiv = document.createElement("div");
    detailsDiv.className = "occurrence-details flex-column-space-between";

    var blankDiv = document.createElement("div");
    
    var descriptionP = document.createElement("p");
    descriptionP.className = "card-item-text-topic";
    descriptionP.textContent = "Descrição: ";

    var descriptionContentP = document.createElement("p");
    descriptionContentP.className = "card-item-text-content";
    descriptionContentP.textContent = occurrence.description;

    var severityDiv = document.createElement("div");
    severityDiv.className = "flex mt-10";

    var severityTopicP = document.createElement("p");
    severityTopicP.className = "card-item-text-topic mr-10";
    severityTopicP.textContent = "Gravidade: ";

    var severityBarContainerDiv = document.createElement("div");
    severityBarContainerDiv.className = "severity-progressbar-container";

    var severityBarContentDiv = document.createElement("div");
    severityBarContainerDiv.className = `severity-progressbar-content-${occurrence.severity}`;

    var blankDiv2 = document.createElement("div");
    var mapDiv = document.createElement("div");
    mapDiv.className = "map";
    var mapImg = document.createElement("img");
    mapImg.className = "m-image";
    //TODO remove hard code
    mapImg.src = "/images/map-1.PNG";
    mapImg.alt = "Map 1";
    mapDiv.appendChild(mapImg);
    var mapDescriptionP = document.createElement("p");
    mapDescriptionP.className = "map-description";
    mapDescriptionP.textContent = occurrence.location.description;


    cardDiv.appendChild(cardHeaderDiv);
    cardHeaderDiv.appendChild(cardTitleP);
    cardHeaderDiv.appendChild(flexDiv);
    flexDiv.appendChild(dateTimeP);
    flexDiv.appendChild(typeStatusI);
    cardDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(blankDiv);
    blankDiv.appendChild(descriptionP);
    blankDiv.appendChild(descriptionContentP);
    detailsDiv.appendChild(severityDiv);
    severityDiv.appendChild(severityTopicP);
    severityDiv.appendChild(severityBarContainerDiv);
    severityBarContainerDiv.appendChild(severityBarContentDiv);
    cardBodyDiv.appendChild(blankDiv2);
    blankDiv2.appendChild(mapDiv);
    blankDiv2.appendChild(mapDescriptionP);

    return cardDiv;
}

window.onload = function () {
    updateChangeThemeButton();
    updateFontCss();
    loadOccurrences();
}