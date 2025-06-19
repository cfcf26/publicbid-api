const axios = require('axios');
require('dotenv').config();

async function testCurrentDate() {
  console.log('조달청 나라장터 입찰공고정보서비스 - 실제 데이터 테스트\n');
  
  const SERVICE_KEY = process.env.SERVICE_KEY;
  const API_BASE_URL = process.env.API_BASE_URL;
  
  // 2024년 12월 날짜로 테스트
  const startDate = '202412010000';
  const endDate = '202412310000';
  
  console.log(`조회 기간: ${startDate} ~ ${endDate}\n`);
  
  const params = new URLSearchParams({
    numOfRows: '10',
    pageNo: '1',
    inqryDiv: '1',
    inqryBgnDt: startDate,
    inqryEndDt: endDate,
    type: 'json'
  });
  
  const url = `${API_BASE_URL}/getBidPblancListInfoThng?serviceKey=${SERVICE_KEY}&${params.toString()}`;
  
  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('✓ API 호출 성공!\n');
    
    if (response.data && response.data.response) {
      const res = response.data.response;
      if (res.header) {
        console.log(`결과 코드: ${res.header.resultCode}`);
        console.log(`결과 메시지: ${res.header.resultMsg}`);
      }
      if (res.body) {
        console.log(`\n전체 건수: ${res.body.totalCount || 0}`);
        console.log(`페이지 번호: ${res.body.pageNo}`);
        console.log(`페이지당 건수: ${res.body.numOfRows}`);
        
        if (res.body.items && res.body.items.item) {
          const items = Array.isArray(res.body.items.item) ? res.body.items.item : [res.body.items.item];
          console.log(`조회된 건수: ${items.length}\n`);
          
          // 처음 3개 입찰공고 표시
          console.log('=== 입찰공고 목록 ===');
          items.slice(0, 3).forEach((item, index) => {
            console.log(`\n[${index + 1}] ${item.bidNtceNm}`);
            console.log(`  - 공고번호: ${item.bidNtceNo}`);
            console.log(`  - 공고기관: ${item.ntceInsttNm}`);
            console.log(`  - 수요기관: ${item.dminsttNm || 'N/A'}`);
            console.log(`  - 입찰마감: ${item.bidClseDt}`);
            console.log(`  - 입찰방식: ${item.bidMetd || 'N/A'}`);
            console.log(`  - 추정가격: ${item.presmptPrce ? Number(item.presmptPrce).toLocaleString() + '원' : 'N/A'}`);
          });
        }
      }
    }
    
  } catch (error) {
    console.log('✗ API 호출 실패');
    console.log(error.message);
  }
}

testCurrentDate();