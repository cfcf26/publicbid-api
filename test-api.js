const axios = require('axios');

async function testAPI() {
  console.log('조달청 OpenAPI 프록시 서버 테스트\n');
  
  // 1. 루트 엔드포인트 테스트
  console.log('1. API 문서 조회:');
  try {
    const rootResponse = await axios.get('https://publicbid-api.vercel.app/');
    console.log('✓ API 문서 조회 성공');
    console.log(`  - 서비스: ${rootResponse.data.service}`);
    console.log(`  - 버전: ${rootResponse.data.version}`);
    console.log(`  - 엔드포인트 수: ${rootResponse.data.endpoints.length}`);
  } catch (error) {
    console.error('✗ API 문서 조회 실패:', error.message);
  }
  
  console.log('\n2. 입찰공고 목록 조회 (최근 7일):');
  
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
    numOfRows: 5,
    pageNo: 1,
    inqryDiv: 1,
    inqryBgnDt: formatDate(startDate),
    inqryEndDt: formatDate(endDate),
    type: 'json'
  };
  
  console.log(`  - 조회 기간: ${formatDate(startDate)} ~ ${formatDate(endDate)}`);
  
  try {
    const response = await axios.get('https://publicbid-api.vercel.app/getBidPblancListInfoServc', { params });
    console.log('✓ 입찰공고 목록 조회 성공');
    
    if (response.data.response && response.data.response.body) {
      const body = response.data.response.body;
      console.log(`  - 전체 건수: ${body.totalCount}`);
      console.log(`  - 현재 페이지: ${body.pageNo}`);
      console.log(`  - 페이지당 건수: ${body.numOfRows}`);
      
      if (body.items && body.items.item && body.items.item.length > 0) {
        console.log(`  - 조회된 공고 수: ${body.items.item.length}건`);
        console.log('\n  최근 공고 예시:');
        const firstItem = body.items.item[0];
        console.log(`    - 공고번호: ${firstItem.bidNtceNo || 'N/A'}`);
        console.log(`    - 공고명: ${firstItem.bidNtceNm || 'N/A'}`);
        console.log(`    - 공고기관: ${firstItem.ntceInsttNm || 'N/A'}`);
        console.log(`    - 입찰마감일시: ${firstItem.bidClseDt || 'N/A'}`);
      }
    }
  } catch (error) {
    console.error('✗ 입찰공고 목록 조회 실패');
    if (error.response) {
      console.error(`  - 상태 코드: ${error.response.status}`);
      console.error(`  - 에러 메시지:`, error.response.data);
    } else {
      console.error(`  - 에러:`, error.message);
    }
  }
  
  console.log('\n3. 특정 입찰공고 조회 테스트:');
  try {
    const specificParams = {
      numOfRows: 1,
      pageNo: 1,
      inqryDiv: 2,
      bidNtceNo: '20210123456', // 예시 공고번호
      type: 'json'
    };
    
    const response = await axios.get('https://publicbid-api.vercel.app/getBidPblancListInfoServc', { params: specificParams });
    console.log('✓ 특정 입찰공고 조회 완료');
    
    if (response.data.response && response.data.response.header) {
      const resultCode = response.data.response.header.resultCode;
      const resultMsg = response.data.response.header.resultMsg;
      console.log(`  - 결과 코드: ${resultCode}`);
      console.log(`  - 결과 메시지: ${resultMsg}`);
    }
  } catch (error) {
    console.error('✗ 특정 입찰공고 조회 실패');
    if (error.response && error.response.data) {
      console.error(`  - 에러:`, error.response.data.error || error.response.data);
    }
  }
  
  console.log('\n테스트 완료!');
  console.log('\n주의사항:');
  console.log('- Vercel 대시보드에서 환경 변수를 설정해야 합니다:');
  console.log('  1. https://vercel.com/euncheal-kwaks-projects/publicbid-api/settings/environment-variables');
  console.log('  2. SERVICE_KEY와 API_BASE_URL을 설정하세요');
  console.log('  3. 설정 후 재배포가 필요할 수 있습니다');
}

testAPI();