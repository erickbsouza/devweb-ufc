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
    severityBarContentDiv.className = `severity-progressbar-content-${occurrence.severity}`;

    var blankDiv2 = document.createElement("div");
    var mapDiv = document.createElement("div");
    mapDiv.className = "map";
    var mapImg = document.createElement("img");
    mapImg.className = "m-image";
    var x = lon2tile(occurrence.location.longitude, 16);
    var y = lat2tile(occurrence.location.latitude, 16);
    mapImg.src = `https://a.tile.openstreetmap.org/16/${x}/${y}.png`;
    mapImg.alt = "Map-Tile";
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


//Reproject the coordinates to the Mercator projection (from EPSG:4326 to EPSG:3857):
// x = lon
// y = arsinh(tan(lat)) = log[tan(lat) + sec(lat)]
// (lat and lon are in radians)
// Transform range of x and y to 0 – 1 and shift origin to top left corner:
// x = [1 + (x / π)] / 2
// y = [1 − (y / π)] / 2
// Calculate the number of tiles across the map, n, using 2zoom
// Multiply x and y by n. Round results down to give tilex and tiley.
function lon2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }

function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }