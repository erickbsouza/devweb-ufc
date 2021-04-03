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
    occurrence.visibility = occurrence.visibility == 1 ? 0 : 1;
    await occurrenceModel.updateOccurrence(occurrence);
}

exports.deleteOccurrence = async (occurrenceId) => {
    await occurrenceModel.deleteOccurrence(occurrenceId);
}