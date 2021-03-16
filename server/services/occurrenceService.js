const occurrenceModel = require('../model/occurrenceModel');
const userModel = require('../model/userModel');

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
    occurrence.visibility = occurrence.visibility % 1;
    await occurrenceModel.updateOccurrence(occurrence);
}

exports.deleteOccurrence = async (occurrenceId) => {
    await occurrenceModel.deleteOccurrence(occurrenceId);
}

exports.addOccurrence = async (occurrence, userId) => {
    occurrence.userId = userId;
    occurrence.visibility = 0;
    occurrence.creationDate = Date.now();
    await occurrenceModel.addOccurrence(occurrence);
}

exports.getOccurrencesForReview = async () => {
    users = await userModel.queryUsers();
    occurrences = await occurrenceModel.getOccurrences({$query: {}, $orderBy: {visibility: 1}});
    occurrencesForReview = [];
    for (i = 0; i < occurrences.length; ++i)
    {
        occurrence = occurrences[i];
        occurrencesForReview.push({
            _id: occurrence._id,
            title: occurrence.title,
            userName: users.find((v, i) => v._id == occurrence.userId).nusuario,
            visibility: occurrence.visibility == 1 ? 'Visivel' : 'Não visível'
        });
    }
    return occurrencesForReview;
}

exports.getOccurrenceById = async (occurrenceId) => {
    return  (await occurrenceModel.getOccurrences({_id: occurrenceId}))[0];
}