const axios = require('axios');

async function testUpdatedAPI() {
  console.log('조달청 나라장터 입찰공고정보서비스 API 테스트\n');
  
  // 테스트할 엔드포인트들
  const endpoints = [
    { name: '물품 입찰공고', path: '/getBidPblancListInfoThng' },
    { name: '용역 입찰공고', path: '/getBidPblancListInfoServc' },
    { name: '공사 입찰공고', path: '/getBidPblancListInfoCnstwk' },
    { name: '외자 입찰공고', path: '/getBidPblancListInfoFrgn' }
  ];
  
  // 날짜 설정
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}0000`;
  };
  
  // 1. 로컬 테스트 (환경 변수 사용)
  console.log('=== 로컬 API 테스트 ===\n');
  
  const SERVICE_KEY = process.env.SERVICE_KEY || '6rmKDLnZFhjqF2yk98SaooY+9J2+iDNB2EDLu7vdl3TBH3WTq16Qb3UTMU8GFPWSl4VPZ2NppUNwqoPDv7nJ5w==';
  const API_BASE_URL = process.env.API_BASE_URL || 'http://apis.data.go.kr/1230000/BidPublicInfoService04';
  
  for (const endpoint of endpoints) {
    console.log(`\n테스트: ${endpoint.name} (${endpoint.path})`);
    
    const params = {
      serviceKey: SERVICE_KEY,
      numOfRows: 5,
      pageNo: 1,
      inqryDiv: 1,
      inqryBgnDt: formatDate(yesterday),
      inqryEndDt: formatDate(today),
      type: 'json'
    };
    
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint.path}`, { 
        params,
        timeout: 10000
      });
      
      console.log('✓ 성공!');
      
      if (response.data && response.data.response) {
        const res = response.data.response;
        if (res.header) {
          console.log(`  - 결과 코드: ${res.header.resultCode}`);
          console.log(`  - 결과 메시지: ${res.header.resultMsg}`);
        }
        if (res.body) {
          console.log(`  - 전체 건수: ${res.body.totalCount || 0}`);
          if (res.body.items && res.body.items.item) {
            const items = Array.isArray(res.body.items.item) ? res.body.items.item : [res.body.items.item];
            console.log(`  - 조회된 건수: ${items.length}`);
          }
        }
      }
      
    } catch (error) {
      console.log('✗ 실패');
      if (error.response) {
        console.log(`  - 상태 코드: ${error.response.status}`);
        if (error.response.data) {
          const dataStr = JSON.stringify(error.response.data);
          console.log(`  - 응답: ${dataStr.substring(0, 100)}...`);
        }
      } else {
        console.log(`  - 에러: ${error.message}`);
      }
    }
  }
  
  // 2. Vercel 프록시 테스트
  console.log('\n\n=== Vercel 프록시 API 테스트 ===\n');
  
  const PROXY_URL = 'https://publicbid-api.vercel.app';
  
  // API 문서 확인
  try {
    const docResponse = await axios.get(PROXY_URL);
    console.log('✓ API 문서 조회 성공');
    console.log(`  - 서비스: ${docResponse.data.service}`);
    console.log(`  - 엔드포인트 수: ${docResponse.data.endpoints.length}`);
  } catch (error) {
    console.log('✗ API 문서 조회 실패');
  }
  
  // 프록시 엔드포인트 테스트
  console.log('\n프록시 엔드포인트 테스트:');
  
  const proxyParams = {
    numOfRows: 5,
    pageNo: 1,
    inqryDiv: 1,
    inqryBgnDt: formatDate(yesterday),
    inqryEndDt: formatDate(today),
    type: 'json'
  };
  
  try {
    const response = await axios.get(`${PROXY_URL}/getBidPblancListInfoThng`, { 
      params: proxyParams,
      timeout: 15000
    });
    
    console.log('✓ 프록시 API 호출 성공!');
    
    if (response.data && response.data.response) {
      const res = response.data.response;
      if (res.header) {
        console.log(`  - 결과: ${res.header.resultCode} - ${res.header.resultMsg}`);
      }
    }
    
  } catch (error) {
    console.log('✗ 프록시 API 호출 실패');
    if (error.response) {
      console.log(`  - 상태: ${error.response.status}`);
      console.log(`  - 에러:`, error.response.data);
    }
  }
  
  console.log('\n\n=== 테스트 완료 ===');
  console.log('\n참고사항:');
  console.log('1. Vercel 환경 변수 설정 필요:');
  console.log('   - SERVICE_KEY: API 인증키');
  console.log('   - API_BASE_URL: http://apis.data.go.kr/1230000/BidPublicInfoService04');
  console.log('2. 설정 후 재배포 필요: vercel --prod');
  console.log('3. API 사용 가능 엔드포인트:');
  console.log('   - /getBidPblancListInfoThng (물품)');
  console.log('   - /getBidPblancListInfoServc (용역)');
  console.log('   - /getBidPblancListInfoCnstwk (공사)');
  console.log('   - /getBidPblancListInfoFrgn (외자)');
  console.log('   - /getBidPblancListInfoServcPPSSrch (통합검색)');
}

// 환경 변수 로드
require('dotenv').config();

testUpdatedAPI();