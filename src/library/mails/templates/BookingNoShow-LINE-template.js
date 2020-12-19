const enBody = `━━━━━━━━━━━━━━━━━━━━━━━
Mademoiselle Privé Tokyo
━━━━━━━━━━━━━━━━━━━━━━━
The auto reservation cancellation has been completed.

▼Cancellation
Name：{last_name} {first_name} 
Date & Time：{formattedEventDate} {formattedEventTime}

▼Workshop
{workshopDetails}

We look forward to seeing you again soon`;


const jpBody = `━━━━━━━━━━━━
マドモアゼル プリヴェ展
━━━━━━━━━━━━
ご来場の確認ができなかった為、以下のとおりキャンセルさせて頂きました。

▼キャンセル内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}

またのご予約を心よりお待ち申しあげております。`;

module.exports = {
  enBody,
  jpBody,
};
