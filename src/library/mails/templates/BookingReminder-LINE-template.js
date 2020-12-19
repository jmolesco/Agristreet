const enBody = `━━━━━━━━━━━━━━
Mademoiselle Privé Tokyo
━━━━━━━━━━━━━━
Your visit to the Mademoiselle Privé exhibition in Tokyo is booked for tomorrow.

▼Details
Name：{last_name} {first_name} 
Date & Time：{formattedEventDate} {formattedEventTime}
{referralDetails}

▼Workshop
{workshopDetails}

▼QR Code Ticket
{ticketUrl}

▼Mademoiselle Privé app
In order to help us better enhance your experience, please prepare for your upcoming visit by downloading the Mademoiselle Privé app in advance.
{downloadUrl}

We are looking forward to seeing you at the exhibition!`;

const jpBody = `━━━━━━━━━━━━
マドモアゼル プリヴェ展
━━━━━━━━━━━━
明日のご来場を心よりお待ち申しあげております。

▼ご予約内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}
{referralDetails}

▼QRコードチケット
{ticketUrl}

▼アプリダウンロード
マドモアゼル プリヴェ展の会場専用アプリをあらかじめダウンロードの上、ご来場ください。
{downloadUrl}

ご来場を心よりお待ち申しあげております。
`;

module.exports = {
  enBody,
  jpBody,
};
