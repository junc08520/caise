// api/register.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullname, phone, address, school } = req.body || {};

    // 必填检查
    if (!fullname || !phone || !address || !school) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 防 TP.HCM （根据你要求）
    const forbidden = ['ho chi minh','hồ chí minh','tp.hcm','tp hcm','hcm','胡志明','胡志明市','sài gòn','sai gon'];
    const lower = (s) => (s || '').toString().toLowerCase();
    if (forbidden.some(k => lower(school).includes(k))) {
      return res.status(400).json({ error: 'Not eligible for HCM City' });
    }

    const time = new Date().toISOString();

    // 这里就是“接收到”的地方：打印日志
    console.log('STUDENT_GRANT_REGISTER', {
      time,
      fullname,
      phone,
      address,
      school
    });

    // 将来如果你要发 Telegram / 存数据库，就在这里加

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('REGISTER_ERROR', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
