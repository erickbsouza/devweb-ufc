const occurrenceModel = require('../model/occurrenceModel');

exports.editOccurrence = async (occurrenceEditJson) => {
    var occurrence = await occurrenceModel.getOccurrences({_id: occurrenceEditJson._id})[0];
    occurrence.title = occurrenceEditJson.title;
    occurrence.description = occurrenceEditJson.description;
    occurrence.type = occurrenceEditJson.type;
    occurrence.severity = occurrenceEditJson.severity;
    occurrence.status = occurrenceEditJson.status;
    await occurrenceModel.updateOccurrence(occurrence);
}

exports.setOccurrenceAsVisible = async (occurrenceId) => {
    var occurrence = await occurrenceModel.getOccurrences({_id: occurrenceId})[0];
    occurrence.visibility = 1;
}

exports.deleteOccurrence = async (occurrenceId) => {
    await occurrenceModel.deleteOccurrence(occurrenceId);
}