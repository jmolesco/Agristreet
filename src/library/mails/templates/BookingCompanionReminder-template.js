const enSubject = 'Mademoiselle Privé Tokyo: Reservation status of your accompanying guest(s).';
const enBody = `Mr./Ms. {first_name} {last_name}

Reservation registration has not been completed for your guest(s).
Your accompanying guest(s) must complete their registration by accessing the reservation URL within the valid date.

▼Details
Name：{last_name} {first_name}
Date & Time：{formattedEventDate} {formattedEventTime}
{workshopDetails}
{companionDetails}

▼URL for accompanying guests
{referralDetails}

We are looking forward to seeing you at the exhibition!
`;

const jpSubject = 'マドモアゼル プリヴェ展：ご同伴者様ご予約状況のご案内';
const jpBody = `{last_name} {first_name} 様

マドモアゼルプリヴェ展に同伴者チケットをお申し込みいただいたお客様にご連絡しております。

ご同伴者様の以下のご予約が確定しておりません。
チケット発行期限までに予約手続きを完了いただきますよう、ご同伴者様へご連絡くださいませ。

▼ご入場予約内容
お名前：{last_name} {first_name}様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}
{companionDetails}

▼ご同伴者様用URL
{referralDetails}
チケット発行期限：{expirationDate}

※ご同伴者様の予約に関して※
ご同伴者様がご予約を完了されていない場合、同伴入場は確約いたしかねますので予めご了承ください。

ご来場を心よりお待ち申しあげております。`;

module.exports = {
  enSubject,
  enBody,
  jpBody,
  jpSubject,
};
