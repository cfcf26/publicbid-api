module.exports = (req, res) => {
  res.status(200).json({
    service: '조달청 나라장터 입찰공고정보서비스 Proxy',
    version: '1.0.0',
    baseUrl: 'https://publicbid-api.vercel.app',
    originalApi: 'http://apis.data.go.kr/1230000/BidPublicInfoService04',
    endpoints: [
      {
        path: '/getBidPblancListInfoThng',
        method: 'GET',
        description: '물품 입찰공고목록 정보 조회',
        category: '물품',
        requiredParams: {
          numOfRows: '한 페이지 결과 수',
          pageNo: '페이지 번호',
          inqryDiv: '조회구분 (1: 등록일시, 2: 입찰공고번호)',
          type: '응답 데이터 형식 (json/xml)'
        },
        conditionalRequiredParams: {
          'inqryDiv=1': {
            inqryBgnDt: '조회시작일시 (YYYYMMDDHHMM)',
            inqryEndDt: '조회종료일시 (YYYYMMDDHHMM)'
          },
          'inqryDiv=2': {
            bidNtceNo: '입찰공고번호'
          }
        }
      },
      {
        path: '/getBidPblancListInfoServc',
        method: 'GET',
        description: '용역 입찰공고목록 정보 조회',
        category: '용역',
        requiredParams: {
          numOfRows: '한 페이지 결과 수',
          pageNo: '페이지 번호',
          inqryDiv: '조회구분 (1: 등록일시, 2: 입찰공고번호)',
          type: '응답 데이터 형식 (json/xml)'
        },
        conditionalRequiredParams: {
          'inqryDiv=1': {
            inqryBgnDt: '조회시작일시 (YYYYMMDDHHMM)',
            inqryEndDt: '조회종료일시 (YYYYMMDDHHMM)'
          },
          'inqryDiv=2': {
            bidNtceNo: '입찰공고번호'
          }
        }
      },
      {
        path: '/getBidPblancListInfoCnstwk',
        method: 'GET',
        description: '공사 입찰공고목록 정보 조회',
        category: '공사',
        requiredParams: {
          numOfRows: '한 페이지 결과 수',
          pageNo: '페이지 번호',
          inqryDiv: '조회구분 (1: 등록일시, 2: 입찰공고번호)',
          type: '응답 데이터 형식 (json/xml)'
        },
        conditionalRequiredParams: {
          'inqryDiv=1': {
            inqryBgnDt: '조회시작일시 (YYYYMMDDHHMM)',
            inqryEndDt: '조회종료일시 (YYYYMMDDHHMM)'
          },
          'inqryDiv=2': {
            bidNtceNo: '입찰공고번호'
          }
        }
      },
      {
        path: '/getBidPblancListInfoFrgn',
        method: 'GET',
        description: '외자 입찰공고목록 정보 조회',
        category: '외자',
        requiredParams: {
          numOfRows: '한 페이지 결과 수',
          pageNo: '페이지 번호',
          inqryDiv: '조회구분 (1: 등록일시, 2: 입찰공고번호)',
          type: '응답 데이터 형식 (json/xml)'
        },
        conditionalRequiredParams: {
          'inqryDiv=1': {
            inqryBgnDt: '조회시작일시 (YYYYMMDDHHMM)',
            inqryEndDt: '조회종료일시 (YYYYMMDDHHMM)'
          },
          'inqryDiv=2': {
            bidNtceNo: '입찰공고번호'
          }
        }
      },
      {
        path: '/getBidPblancListInfoServcPPSSrch',
        method: 'GET',
        description: '조달청 검색조건에 의한 입찰공고목록 정보 조회',
        category: '통합검색',
        requiredParams: {
          numOfRows: '한 페이지 결과 수',
          pageNo: '페이지 번호',
          inqryDiv: '조회구분 (1: 등록일시, 2: 입찰공고번호)',
          type: '응답 데이터 형식 (json/xml)'
        },
        conditionalRequiredParams: {
          'inqryDiv=1': {
            inqryBgnDt: '조회시작일시 (YYYYMMDDHHMM)',
            inqryEndDt: '조회종료일시 (YYYYMMDDHHMM)'
          },
          'inqryDiv=2': {
            bidNtceNo: '입찰공고번호'
          }
        }
      }
    ],
    commonOptionalParams: {
      bidNtceNm: '입찰공고명',
      ntceInsttCd: '공고기관코드',
      ntceInsttNm: '공고기관명',
      dminsttCd: '수요기관코드',
      dminsttNm: '수요기관명',
      bidMetd: '입찰방식',
      cntrctCnclsMtd: '계약체결방법',
      bidClseDt: '입찰마감일시',
      opengDt: '개찰일시',
      sucsfbidMtd: '낙찰자결정방법',
      indstrytyLmtYn: '업종제한여부',
      bidQlfctRgstDt: '입찰참가자격등록마감일시',
      cmmnSpldmdMetd: '공동수급방식',
      '...': '각 엔드포인트별 추가 파라미터는 API 문서 참조'
    },
    examples: [
      {
        description: '최근 7일간 물품 입찰공고 조회',
        request: 'GET /getBidPblancListInfoThng?numOfRows=10&pageNo=1&inqryDiv=1&inqryBgnDt=202506130000&inqryEndDt=202506200000&type=json'
      },
      {
        description: '특정 입찰공고번호로 조회',
        request: 'GET /getBidPblancListInfoServc?numOfRows=1&pageNo=1&inqryDiv=2&bidNtceNo=20210123456&type=json'
      }
    ],
    notes: [
      'API Key는 서버 내부적으로 처리되므로 클라이언트에서 전달할 필요 없음',
      '날짜 형식: YYYYMMDDHHMM (예: 202401010000)',
      'type 파라미터를 통해 JSON 또는 XML 응답 선택 가능',
      '모든 파라미터는 쿼리 스트링으로 전달',
      '조회구분(inqryDiv)에 따라 필수 파라미터가 달라짐'
    ]
  });
};