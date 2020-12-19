const mailer = require('@Library/poitoresendemail');
const template = require('@Library/mails/templates/PoitoreTemplate');
const { TaskDeclareStatus } = require('@Library/constants');
const helpers = require('@Library/helpers');

const sendEmail = async (data) => {
  const cMessages = {};
  if (data.task_declare_status === TaskDeclareStatus.Approved) {
    cMessages.cMessage1 = template.cMessage1.replace('{TaskName}', data.taskName).replace('{TaskDeclareDate}', helpers.formatDateToString(data.taskDeclareDate)).replace('{TaskDeclareTime}', data.taskDeclareTime);
    cMessages.cMessage2 = template.cMessage2.replace('{ClientEarnedPoints}', data.points).replace('{CurrPoints}', data.cPoints);
    cMessages.cMessage3 = template.cMessage3;
  } else {
    cMessages.cMessage1 = template.cRejectMessage1.replace('{TaskName}', data.taskName).replace('{TaskDeclareDate}', helpers.formatDateToString(data.taskDeclareDate)).replace('{TaskDeclareTime}', data.taskDeclareTime);
    cMessages.cMessage2 = template.cRejectMessage2.replace('{ClientEarnedPoints}', data.points).replace('{CurrPoints}', data.cPoints);
    cMessages.cMessage3 = template.cMessage3_1;
  }
  cMessages.cMessage4 = template.cMessage4.replace('{TaskDeclareId}', data.referenceId);
  const mapObj = {
    HeaderName: data.headerName,
    Name: data.name,
    ContentMessage1: cMessages.cMessage1,
    ContentMessage2: cMessages.cMessage2,
    ContentMessage3: cMessages.cMessage3,
    Notes: (data.task_declare_status === TaskDeclareStatus.Rejected) ? '' : data.notes,
    ContentMessage4: cMessages.cMessage4,
  };

  const emailTemplate = template.PoitoreHTMLTemplate.replace(/HeaderName|Name|ContentMessage1|ContentMessage2|ContentMessage3|Notes|ContentMessage4/gi, matched => mapObj[matched]);
  await mailer.sendEmail(data.cEmail, data.headerName, emailTemplate);
};

module.exports = {
  sendEmail,
};
