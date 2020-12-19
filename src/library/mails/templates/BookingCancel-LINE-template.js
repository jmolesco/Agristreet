const enBody = `━━━━━━━━━━━━━━
Mademoiselle Privé Tokyo
━━━━━━━━━━━━━━
Your reservation for Mademoiselle Privé Tokyo has been cancelled.

▼Cancellation
Name：{last_name} {first_name}
Date & Time：{formattedEventDate} {formattedEventTime}

▼Workshop
{workshopDetails}

※Please be reminded to ask your guests to confirm or cancel their booking by accessing the official CHANEL account on LINE.`;


const jpBody = `━━━━━━━━━━━━
マドモアゼル プリヴェ展
━━━━━━━━━━━━
以下のとおりキャンセルを承りました。

▼キャンセル内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}

※ご同伴者様の予約に関して※
ご同伴者様の予約はキャンセルされません。ご同伴者様のキャンセルは、ご自身でお手続きいただきますようお願いいたします。

またのご予約を心よりお待ち申しあげております。`;


module.exports = {
  enBody,
  jpBody,
};
