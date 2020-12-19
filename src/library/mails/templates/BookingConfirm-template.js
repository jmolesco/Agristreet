const enSubject = 'Mademoiselle Privé Tokyo: Please give us your feedback';
const enBody = `Mr./Ms. {first_name} {last_name}

Thank you for your visit to the Mademoiselle Privé exhibition in Tokyo today.

Please give us your feedback here: {questionUrl}`;

const jpSubject = 'マドモアゼル プリヴェ展：アンケートご協力のお願い';
const jpBody = `{last_name} {first_name} 様

本日はマドモアゼル プリヴェ展にご来場いただき誠にありがとうございます。

本エキシビションに関するアンケートのご協力をお願いいたします。
下記のURLよりご意見またはご感想をお聞かせください。

▼アンケートはこちら
{questionUrl}`;

module.exports = {
  enSubject,
  enBody,
  jpBody,
  jpSubject,
};
