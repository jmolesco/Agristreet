const enSubject = 'Mademoiselle Privé Tokyo：Cancellation Completed (Auto)';
const enBody = `━━━━━━━━━━━━━━━━━━━━━━━
Mademoiselle Privé Tokyo
━━━━━━━━━━━━━━━━━━━━━━━

Mr./Ms. {first_name} {last_name}

The auto reservation cancellation has been completed.

▼Cancellation
Name：{last_name} {first_name} 
Date & Time：{formattedEventDate} {formattedEventTime}

▼Workshop
{workshopDetails}

We look forward to seeing you again soon.`;


const jpSubject = 'マドモアゼル プリヴェ展：ご予約自動キャンセル完了のご案内';
const jpBody = `{last_name} {first_name} 様

ご来場の確認ができなかった為、以下のとおりキャンセルさせて頂きました。

▼キャンセル内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}

またのご予約を心よりお待ち申しあげております。`;

module.exports = {
  enSubject,
  enBody,
  jpBody,
  jpSubject,
};
