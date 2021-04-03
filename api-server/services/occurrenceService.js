const occurrenceModel = require('../model/occurrenceModel');
const userModel = require('../model/userModel');

//----------------------------Andrea-----------------------------

exports.editOccurrence = async (occurrenceEditJson) => {
    var occurrence = (await occurrenceModel.getOccurrences({_id: occurrenceEditJson._id}))[0];
    occurrence.description = occurrenceEditJson.description;
    occurrence.type = occurrenceEditJson.type;
    occurrence.severity = occurrenceEditJson.severity;
    occurrence.status = occurrenceEditJson.status;
    occurrence.dateTime = occurrenceEditJson.dateTime;
    await occurrenceModel.updateOccurrence(occurrence);
}

exports.toggleOccurrenceVisibility = async (occurrenceId) => {
    var occurrence = (await occurrenceModel.getOccurrences({_id: occurrenceId}))[0];
    occurrence.visibility = occurrence.visibility == 1 ? 0 : 1;
    await occurrenceModel.updateOccurrence(occurrence);
}

exports.deleteOccurrence = async (occurrenceId) => {
    await occurrenceModel.deleteOccurrence(occurrenceId);
}

//----------------------------Alan-----------------------------

exports.addOccurrence = async (occurrence, userId) => {
    occurrence.userId = userId;
    occurrence.visibility = 0;
    occurrence.creationDate = Date.now();
    return await occurrenceModel.addOccurrence(occurrence);
}

exports.getOccurrencesForReview = async () => {
    users = await userModel.queryUsers();
    occurrences = await occurrenceModel.getOccurrences({$query: {}, $orderBy: {visibility: 1}});
    occurrencesForReview = [];
    for (i = 0; i < occurrences.length; ++i)
    {
        occurrence = occurrences[i];
        usuario = users.find((v, i) => v._id == occurrence.userId);
        if (usuario == undefined)
            usuario = {nusuario: 'desconhecido'};
        occurrencesForReview.push({
            _id: occurrence._id,
            title: occurrence.title,
            userName: usuario.nusuario,
            visibility: occurrence.visibility == 1 ? 'Visivel' : 'Não visível'
        });
    }
    return occurrencesForReview;
}

exports.getOccurrenceById = async (occurrenceId) => {
    return  (await occurrenceModel.getOccurrences({_id: parseInt(occurrenceId)}))[0];
}

exports.getOccurrencesMain = async () => {
    occurrence = await occurrenceModel.getOccurrences();
    occurrence = occurrence.filter((v) => v.visibility == 1);
    return occurrence;
}

exports.searchOccurrences = async (searchJson) => {
    typeQuery = getTypeQuery(searchJson);
    statusQuery = getStatusQuery(searchJson);
    severityQuery = getSeverityQuery(searchJson);
    if (typeQuery.length == 0 || statusQuery == 0 || severityQuery == 0)
        return [];
    basicQuery = {
        title: {$regex: `.*${searchJson.title}.*`},
        "location.descricao": {$regex: `.*${searchJson.location}.*`},
        visibility: 1
    };
    dateTimeS = new Date(searchJson.dateTimeStart).getTime();
    if (!isNaN(dateTimeS))
    {
        if (basicQuery.dateTime == undefined)
            basicQuery.dateTime = {};
        basicQuery.dateTime.$gte = dateTimeS;
    }
    dateTimeE = new Date(searchJson.dateTimeEnd).getTime();
    if (!isNaN(dateTimeE))
    {
        if (basicQuery.dateTime == undefined)
            basicQuery.dateTime = {};
        basicQuery.dateTime.$lte = dateTimeE;
    }
    query = {
        $and: [
            basicQuery,
            {
                $or: typeQuery
            },
            {
                $or: statusQuery
            },
            {
                $or: severityQuery
            }
        ]
    };

    return await occurrenceModel.getOccurrences(query);
}

getTypeQuery = (searchJson) => {
    typeQuery = []
    if (searchJson.police === 'on')
    {
        typeQuery.push({type: 'local_police'});
    }
    if (searchJson.fireDepartament === 'on') 
    {
        typeQuery.push({type: 'local_fire_department'});
    }
    if (searchJson.hospital === 'on')
    {
        typeQuery.push({type: 'local_hospital'});
    }
    return typeQuery;
}

getStatusQuery = (searchJson) => {
    statusQuery = []
    if (searchJson.resolved === 'on')
    {
        statusQuery.push({status: 'resolved'});
    }
    if (searchJson.pending === 'on') 
    {
        statusQuery.push({status: 'hapenning'});
    }
    if (searchJson.finished === 'on')
    {
        statusQuery.push({status: 'finished'});
    }
    return statusQuery;
}

getSeverityQuery = (searchJson) => {
    severityQuery = []
    if (searchJson.low === 'on')
    {
        severityQuery.push({severity: 'low'});
    }
    if (searchJson.medium === 'on') 
    {
        severityQuery.push({severity: 'medium'});
    }
    if (searchJson.high === 'on')
    {
        severityQuery.push({severity: 'high'});
    }
    return severityQuery;
}