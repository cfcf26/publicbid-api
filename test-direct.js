const axios = require('axios');

// API Key와 Base URL
const SERVICE_KEY = '6rmKDLnZFhjqF2yk98SaooY+9J2+iDNB2EDLu7vdl3TBH3WTq16Qb3UTMU8GFPWSl4VPZ2NppUNwqoPDv7nJ5w==';

// 여러 가능한 API URL 테스트
const API_URLS = [
  'https://apis.data.go.kr/1230000/BidPublicInfoService04/getBidPblancListInfoServc',
  'https://apis.data.go.kr/1230000/BidPublicInfoService03/getBidPblancListInfoServc',
  'https://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServc',
  'https://apis.data.go.kr/1230000/BidPublicInfoService01/getBidPblancListInfoServc',
  'https://apis.data.go.kr/1230000/BidPublicInfoService/getBidPblancListInfoServc',
  'https://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getBidPblancListInfoServc'
];

async function testDirectAPI() {
  console.log('조달청 OpenAPI 직접 테스트\n');
  
  // 날짜 계산
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}0000`;
  };
  
  const params = {
    serviceKey: SERVICE_KEY,
    numOfRows: 5,
    pageNo: 1,
    inqryDiv: 1,
    inqryBgnDt: formatDate(startDate),
    inqryEndDt: formatDate(endDate),
    type: 'json'
  };
  
  console.log(`조회 기간: ${formatDate(startDate)} ~ ${formatDate(endDate)}\n`);
  
  for (const url of API_URLS) {
    console.log(`테스트: ${url}`);
    try {
      const response = await axios.get(url, { 
        params,
        timeout: 10000
      });
      
      console.log('✓ 성공!');
      console.log('응답 데이터:', JSON.stringify(response.data, null, 2).substring(0, 500) + '...\n');
      
      // 성공한 URL을 환경 변수로 저장
      console.log('\n성공한 API URL:');
      console.log(`API_BASE_URL=${url.replace('/getBidPblancListInfoServc', '')}`);
      break;
      
    } catch (error) {
      console.log('✗ 실패');
      if (error.response) {
        console.log(`  상태 코드: ${error.response.status}`);
        if (error.response.data) {
          const dataStr = JSON.stringify(error.response.data);
          if (dataStr.length > 200) {
            console.log(`  응답: ${dataStr.substring(0, 200)}...`);
          } else {
            console.log(`  응답: ${dataStr}`);
          }
        }
      } else {
        console.log(`  에러: ${error.message}`);
      }
      console.log('');
    }
  }
}

testDirectAPI();