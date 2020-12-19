const enSubject = 'Mademoiselle Privé Tokyo: Cancellation Completed';
const enBody = `Mr./Ms. {first_name} {last_name}

Your reservation for Mademoiselle Privé Tokyo has been cancelled.

▼Cancellation
Name：{last_name} {first_name} 
Date & Time：{formattedEventDate} {formattedEventTime}

▼Workshop
{workshopDetails}

※Please be reminded that your guests reservation cancellation should be done by him/herself.`;


const jpSubject = 'マドモアゼル プリヴェ展：ご予約キャンセル完了のご案内';
const jpBody = `{last_name} {first_name} 様

以下のとおりキャンセルを承りました。

▼キャンセル内容
お名前：{last_name} {first_name} 様
日時：{formattedEventDate} {formattedEventTime}
{workshopDetails}

※ご同伴者様の予約に関して※
ご同伴者様の予約はキャンセルされません。ご同伴者様のキャンセルは、ご自身でお手続きいただきますようお願いいたします。

またのご予約を心よりお待ち申しあげております。`;


module.exports = {
  enSubject,
  enBody,
  jpBody,
  jpSubject,
};
