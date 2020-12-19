const enBody = `━━━━━━━━━━━━━━
Mademoiselle Privé Tokyo
━━━━━━━━━━━━━━
Thank you for your reservation. We are pleased to confirm your reservation as follows.

▼Details
Name：{last_name} {first_name} 
Date & Time：{formattedEventDate} {formattedEventTime} 
{referralDetails}

▼Workshop
{workshopDetails}

▼QR Code Ticket
{ticketUrl}

▼Details on admission
{checkinUrl}

The Mademoiselle Privé exhibition is an invitation to explore the creative inspirations of CHANEL. 
From October 19th to December 1st
{venueDetails}
{map}

We look forward to your visit to Mademoiselle Privé Tokyo.`;


const jpBody = `━━━━━━━━━━━━
マドモアゼル プリヴェ展
━━━━━━━━━━━━
ご予約ありがとうございます。

▼ご予約内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}
{referralDetails}

▼QRコードチケット
{ticketUrl}

当日のご来場を心よりお待ち申しあげております。`;

module.exports = {
  enBody,
  jpBody,
};
