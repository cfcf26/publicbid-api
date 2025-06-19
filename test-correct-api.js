const axios = require('axios');

// API Key
const SERVICE_KEY = '6rmKDLnZFhjqF2yk98SaooY+9J2+iDNB2EDLu7vdl3TBH3WTq16Qb3UTMU8GFPWSl4VPZ2NppUNwqoPDv7nJ5w==';

async function testCorrectAPI() {
  console.log('조달청 나라장터 API 테스트\n');
  
  // 오늘 날짜
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  // 입찰공고목록 정보에 관한 조회 (물품)
  const apiUrl = 'http://apis.data.go.kr/1230000/BidPublicInfoService04/getBidPblancListInfoThng';
  
  const params = {
    serviceKey: SERVICE_KEY,
    numOfRows: 10,
    pageNo: 1,
    inqryDiv: 1,
    inqryBgnDt: `${year}${month}01`, // 이번 달 1일부터
    inqryEndDt: `${year}${month}${day}`, // 오늘까지
    type: 'json'
  };
  
  console.log('API URL:', apiUrl);
  console.log('조회 기간:', params.inqryBgnDt, '~', params.inqryEndDt);
  console.log('');
  
  try {
    const response = await axios.get(apiUrl, { 
      params,
      timeout: 15000,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('✓ API 호출 성공!');
    
    if (response.data) {
      console.log('\n응답 데이터:');
      console.log(JSON.stringify(response.data, null, 2));
      
      if (response.data.response) {
        const res = response.data.response;
        if (res.header) {
          console.log('\n헤더 정보:');
          console.log('- 결과 코드:', res.header.resultCode);
          console.log('- 결과 메시지:', res.header.resultMsg);
        }
        
        if (res.body) {
          console.log('\n바디 정보:');
          console.log('- 전체 건수:', res.body.totalCount);
          console.log('- 페이지 번호:', res.body.pageNo);
          console.log('- 페이지당 건수:', res.body.numOfRows);
          
          if (res.body.items && res.body.items.item) {
            const items = Array.isArray(res.body.items.item) ? res.body.items.item : [res.body.items.item];
            console.log('- 조회된 건수:', items.length);
            
            if (items.length > 0) {
              console.log('\n첫 번째 입찰공고:');
              const item = items[0];
              console.log('- 공고번호:', item.bidNtceNo);
              console.log('- 공고명:', item.bidNtceNm);
              console.log('- 공고기관:', item.ntceInsttNm);
              console.log('- 입찰마감일시:', item.bidClseDt);
            }
          }
        }
      }
    }
    
  } catch (error) {
    console.log('✗ API 호출 실패');
    if (error.response) {
      console.log('상태 코드:', error.response.status);
      console.log('응답:', error.response.data);
    } else {
      console.log('에러:', error.message);
    }
  }
  
  // 서비스 목록
  console.log('\n\n사용 가능한 엔드포인트:');
  console.log('1. /getBidPblancListInfoThng - 물품 입찰공고목록');
  console.log('2. /getBidPblancListInfoServc - 용역 입찰공고목록');
  console.log('3. /getBidPblancListInfoCnstwk - 공사 입찰공고목록');
  console.log('4. /getBidPblancListInfoFrgn - 외자 입찰공고목록');
  console.log('5. /getBidPblancListInfoServcPPSSrch - 조달청 검색조건에 의한 입찰공고목록');
}

testCorrectAPI();