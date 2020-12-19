const enBody = `━━━━━━━━━━━━
Mademoiselle Privé Tokyo
━━━━━━━━━━━━
Reservation registration has not been completed for your guest(s).
Your accompanying guest(s) must receive a QR code ticket by accessing the URL page on LINE.

▼Details
Name：{last_name} {first_name}
Date & Time：{formattedEventDate} {formattedEventTime}
{workshopDetails}
{companionDetails}

▼LINE URL for accompanying guests
{referralDetails}

We are looking forward to seeing you at the exhibition!
`;


const jpBody = `━━━━━━━━━━━━
マドモアゼル プリヴェ展
━━━━━━━━━━━━
ご同伴者様の以下のご予約が確定しておりません。
チケット発行期限までに予約手続きを完了いただきますよう、ご同伴者様へご連絡くださいませ。

▼ご入場予約内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}
{companionDetails}

▼ご同伴者様用LINE URL
{referralDetails}
チケット発行期限：{expirationDate}

※ご同伴者様の予約に関して※
ご同伴者様がご予約を完了されていない場合、同伴入場は確約いたしかねますので予めご了承ください。

ご来場を心よりお待ち申しあげております。`;

module.exports = {
  enBody,
  jpBody,
};
