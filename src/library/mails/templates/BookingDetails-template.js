const enSubject = 'Mademoiselle Privé Tokyo: Confirmation of Reservation';
const enBody = `Mr./Ms. {first_name} {last_name}

Thank you for your reservation. We are pleased to confirm your reservation as follows.

▼Details
Name：{last_name} {first_name} 
Date & Time：{formattedEventDate} {formattedEventTime} 
{referralDetails}

▼Workshop
{workshopDetails}

▼QR Code Ticket
<a href={ticketUrl}>Click here</a>

▼Details on admission
{checkinUrl}

The Mademoiselle Privé exhibition is an invitation to explore the creative inspirations of CHANEL. 
From October 19th to December 1st
{venueDetails}
{map}

We look forward to your visit to Mademoiselle Privé Tokyo.`;

const jpSubject = 'マドモアゼル プリヴェ展：ご予約完了のご案内';
const jpBody = `{last_name} {first_name} 様

この度はマドモアゼルプリヴェ展にご予約いただき、誠にありがとうございます。

▼ご予約内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}
{referralDetails}

▼QRコードチケット
{ticketUrl}

ご来場を心よりお待ち申しあげております。`;

module.exports = {
  enSubject,
  enBody,
  jpBody,
  jpSubject,
};
