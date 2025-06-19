const axios = require('axios');
require('dotenv').config();

async function testFinalAPI() {
  console.log('조달청 나라장터 입찰공고정보서비스 최종 테스트\n');
  
  // 환경 변수
  const SERVICE_KEY = process.env.SERVICE_KEY;
  const API_BASE_URL = process.env.API_BASE_URL;
  
  console.log('환경 변수 확인:');
  console.log('- API_BASE_URL:', API_BASE_URL);
  console.log('- SERVICE_KEY:', SERVICE_KEY ? '설정됨 (인코딩된 키)' : '미설정');
  console.log('');
  
  // 날짜 설정
  const today = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}0000`; // YYYYMMDDHHMM 형식
  };
  
  const endDate = formatDate(today);
  const startDate = formatDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000));
  
  console.log(`조회 기간: ${startDate} ~ ${endDate}\n`);
  
  // 테스트할 엔드포인트
  const endpoints = [
    { name: '물품 입찰공고', path: '/getBidPblancListInfoThng' },
    { name: '용역 입찰공고', path: '/getBidPblancListInfoServc' },
    { name: '공사 입찰공고', path: '/getBidPblancListInfoCnstwk' }
  ];
  
  for (const endpoint of endpoints) {
    console.log(`\n=== ${endpoint.name} 테스트 (${endpoint.path}) ===`);
    
    // URL 구성 - serviceKey는 이미 인코딩되어 있으므로 그대로 사용
    const params = new URLSearchParams({
      numOfRows: '5',
      pageNo: '1',
      inqryDiv: '1',
      inqryBgnDt: startDate,
      inqryEndDt: endDate,
      type: 'json'
    });
    
    const url = `${API_BASE_URL}${endpoint.path}?serviceKey=${SERVICE_KEY}&${params.toString()}`;
    console.log('요청 URL:', url.substring(0, 100) + '...');
    
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('✓ API 호출 성공!');
      
      if (response.data) {
        if (response.data.response) {
          const res = response.data.response;
          if (res.header) {
            console.log(`  - 결과 코드: ${res.header.resultCode}`);
            console.log(`  - 결과 메시지: ${res.header.resultMsg}`);
          }
          if (res.body) {
            console.log(`  - 전체 건수: ${res.body.totalCount || 0}`);
            console.log(`  - 페이지 번호: ${res.body.pageNo}`);
            console.log(`  - 페이지당 건수: ${res.body.numOfRows}`);
            
            if (res.body.items && res.body.items.item) {
              const items = Array.isArray(res.body.items.item) ? res.body.items.item : [res.body.items.item];
              console.log(`  - 조회된 건수: ${items.length}`);
              
              if (items.length > 0 && items[0]) {
                console.log('\n  첫 번째 입찰공고:');
                const item = items[0];
                console.log(`    - 공고번호: ${item.bidNtceNo || 'N/A'}`);
                console.log(`    - 공고명: ${item.bidNtceNm || 'N/A'}`);
                console.log(`    - 공고기관: ${item.ntceInsttNm || 'N/A'}`);
                console.log(`    - 입찰마감: ${item.bidClseDt || 'N/A'}`);
              }
            } else {
              console.log('  - 조회된 데이터 없음');
            }
          }
        } else {
          console.log('응답 형식이 예상과 다름:', JSON.stringify(response.data).substring(0, 200));
        }
      }
      
    } catch (error) {
      console.log('✗ API 호출 실패');
      if (error.response) {
        console.log(`  - 상태 코드: ${error.response.status}`);
        if (error.response.data) {
          const dataStr = typeof error.response.data === 'string' 
            ? error.response.data 
            : JSON.stringify(error.response.data);
          console.log(`  - 응답: ${dataStr.substring(0, 200)}...`);
        }
      } else {
        console.log(`  - 에러: ${error.message}`);
      }
    }
  }
  
  console.log('\n\n=== 테스트 완료 ===');
  console.log('\nVercel 배포 후 확인사항:');
  console.log('1. 환경 변수 업데이트:');
  console.log('   - SERVICE_KEY: 인코딩된 키 사용');
  console.log('   - API_BASE_URL: https://apis.data.go.kr/1230000/ad/BidPublicInfoService');
  console.log('2. 재배포: vercel --prod');
  console.log('3. 프록시 URL: https://publicbid-api.vercel.app');
}

testFinalAPI();