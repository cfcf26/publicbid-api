module.exports = (req, res) => {
  res.status(200).json({
    service: 'Public Procurement Service OpenAPI Proxy',
    version: '1.0.0',
    endpoints: [
      {
        path: '/getBidPblancListInfoServc',
        method: 'GET',
        description: '입찰공고목록 정보 조회',
        requiredParams: {
          numOfRows: '한 페이지 결과 수',
          pageNo: '페이지 번호',
          inqryDiv: '조회구분 (1: 등록일시, 2: 입찰공고번호)',
          type: '응답 데이터 형식 (json/xml)'
        },
        optionalParams: {
          inqryBgnDt: '조회시작일시 (조회구분 1일 경우 필수)',
          inqryEndDt: '조회종료일시 (조회구분 1일 경우 필수)',
          bidNtceNo: '입찰공고번호 (조회구분 2일 경우 필수)',
          bidNtceNm: '입찰공고명',
          ntceInsttCd: '공고기관코드',
          ntceInsttNm: '공고기관명',
          dminsttCd: '수요기관코드',
          dminsttNm: '수요기관명',
          bidMetd: '입찰방식',
          cntrctCnclsMtd: '계약체결방법',
          bidClseDt: '입찰마감일시',
          opengDt: '개찰일시',
          prtcptLmtRgnCd: '참가제한지역코드',
          prtcptLmtRgnNm: '참가제한지역명',
          indstrytyLmtYn: '업종제한여부',
          bidNtceDtlUrl: '입찰공고상세URL',
          bidNtceUrl: '입찰공고URL',
          srvceDivNm: '용역구분명',
          sucsfbidMtd: '낙찰자결정방법',
          rgstDt: '등록일시',
          bfSpecRgstNo: '사전규격등록번호',
          infoBizYn: '정보화사업여부',
          rsrvtnPrceRngRate: '예비가격범위율',
          rgnLmtBidLocplc: '지역제한입찰지역',
          rmrk: '비고',
          bidPrtcptFeePaymntYn: '입찰참가수수료납부여부',
          bidPrtcptFee: '입찰참가수수료',
          bidGrntymnyPaymntYn: '입찰보증금납부여부',
          crdtrNm: '채권자명',
          dtilPrdctClsfcNoNm: '세부품명번호',
          prdctSpecNm: '품명규격',
          prcrmntReqNo: '구매요청번호',
          asignBdgtAmt: '배정예산액',
          presmptPrce: '추정가격',
          opengPlce: '개찰장소',
          bidQlfctRgstDt: '입찰참가자격등록마감일시',
          cmmnSpldmdMetd: '공동수급방식',
          chgDt: '변경일시',
          ntceKindNm: '공고종류명',
          rbidPermsnYn: '재입찰허용여부'
        }
      },
      {
        path: '/getBidPblancListInfoServcPPSSrch',
        method: 'GET',
        description: '조달청 검색조건에 의한 입찰공고목록 정보 조회',
        requiredParams: {
          numOfRows: '한 페이지 결과 수',
          pageNo: '페이지 번호',
          inqryDiv: '조회구분 (1: 등록일시, 2: 입찰공고번호)',
          type: '응답 데이터 형식 (json/xml)'
        },
        optionalParams: {
          inqryBgnDt: '조회시작일시 (조회구분 1일 경우 필수)',
          inqryEndDt: '조회종료일시 (조회구분 1일 경우 필수)',
          bidNtceNo: '입찰공고번호 (조회구분 2일 경우 필수)',
          bidNtceNm: '입찰공고명',
          ntceInsttCd: '공고기관코드',
          ntceInsttNm: '공고기관명',
          dminsttCd: '수요기관코드',
          dminsttNm: '수요기관명',
          bidMetd: '입찰방식',
          cntrctCnclsMtd: '계약체결방법',
          bidClseDt: '입찰마감일시',
          ntceKindNm: '공고종류명',
          intrbidYn: '국제입찰여부',
          bidQlfctRgstDt: '입찰참가자격등록마감일시',
          sucsfbidMtd: '낙찰자결정방법',
          indstrytyLmtYn: '업종제한여부'
        }
      }
    ],
    notes: [
      'API Key는 서버 내부적으로 처리됩니다',
      '날짜 형식: YYYYMMDDHHMM (예: 202401010000)',
      'type 파라미터를 통해 JSON 또는 XML 응답 선택 가능',
      '모든 파라미터는 쿼리 스트링으로 전달'
    ]
  });
};