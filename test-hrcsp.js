const axios = require('axios');

// API Key
const SERVICE_KEY = '6rmKDLnZFhjqF2yk98SaooY+9J2+iDNB2EDLu7vdl3TBH3WTq16Qb3UTMU8GFPWSl4VPZ2NppUNwqoPDv7nJ5w==';

async function testHrcspAPI() {
  console.log('조달청 입찰공고 API 테스트 (나라장터 통합 검색)\n');
  
  // 테스트할 API들
  const apis = [
    {
      name: '나라장터 검색조건에 의한 입찰공고물품조회',
      url: 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getPublicPrcureThngInfoSerch'
    },
    {
      name: '입찰공고목록 정보에 대한 물품조회', 
      url: 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getPublicPrcureThngInfoThng'
    },
    {
      name: '나라장터 입찰공고정보 서비스',
      url: 'http://apis.data.go.kr/1230000/ScsbidInfoService/getBidPblancListInfoServc'
    }
  ];
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };
  
  for (const api of apis) {
    console.log(`\n테스트: ${api.name}`);
    console.log(`URL: ${api.url}`);
    
    const params = {
      serviceKey: SERVICE_KEY,
      numOfRows: 5,
      pageNo: 1,
      inqryDiv: '1',
      inqryBgnDt: formatDate(yesterday),
      inqryEndDt: formatDate(today),
      type: 'json'
    };
    
    console.log(`조회 기간: ${params.inqryBgnDt} ~ ${params.inqryEndDt}`);
    
    try {
      const response = await axios.get(api.url, { 
        params,
        timeout: 15000
      });
      
      console.log('✓ 성공!');
      
      // 응답 타입 확인
      const contentType = response.headers['content-type'];
      console.log('Content-Type:', contentType);
      
      if (typeof response.data === 'string') {
        console.log('응답 (문자열):', response.data.substring(0, 300) + '...');
      } else {
        console.log('응답 (JSON):', JSON.stringify(response.data, null, 2).substring(0, 500) + '...');
      }
      
    } catch (error) {
      console.log('✗ 실패');
      if (error.response) {
        console.log('상태 코드:', error.response.status);
        const data = error.response.data;
        if (typeof data === 'string' && data.length > 200) {
          console.log('응답:', data.substring(0, 200) + '...');
        } else {
          console.log('응답:', data);
        }
      } else {
        console.log('에러:', error.message);
      }
    }
  }
  
  console.log('\n\n참고: API key나 서비스 URL이 올바른지 확인이 필요합니다.');
  console.log('공공데이터포털에서 다음을 확인하세요:');
  console.log('1. API key가 활성화되어 있는지');
  console.log('2. 올바른 서비스를 신청했는지');
  console.log('3. 일일 호출 제한에 걸리지 않았는지');
}

testHrcspAPI();