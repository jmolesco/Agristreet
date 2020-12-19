const enBody = `━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mademoiselle Privé Tokyo
Reservation for your guest/s has been confirmed
━━━━━━━━━━━━━━━━━━━━━━━━━━━

▼Details of your reservation
Date & Time：{formattedEventDate} {formattedEventTime}

▼Workshop
{workshopDetails}

▼Guest/s reservation details
{companionDetails}

▼Valid date for guest/s reservation
Date & Time：

We are looking forward to see you on the exhibition!`;


const jpBody = `
━━━━━━━━━━━━━━━━━━━
マドモアゼル プリヴェ展
━━━━━━━━━━━━━━━━━━━
ご同伴者のご予約の承認がありました。

▼ご入場予約内容
日時：{formattedEventDate} {formattedEventTime}

▼ワークショップ
{workshopDetails}

▼ご予約・残数
{companionDetails}

▼ご予約承認の期限
日時：

当日のご来場を心よりお待ち申しあげております。`;

module.exports = {
  enBody,
  jpBody,
};
