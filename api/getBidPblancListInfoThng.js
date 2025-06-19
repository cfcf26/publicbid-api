const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Extract query parameters
    const {
      numOfRows = '10',
      pageNo = '1',
      inqryDiv = '1',
      inqryBgnDt,
      inqryEndDt,
      type = 'json',
      bidNtceNo,
      bidNtceNm,
      ntceInsttCd,
      ntceInsttNm,
      dminsttCd,
      dminsttNm,
      bidMetd,
      cntrctCnclsMtd,
      bidClseDt,
      opengDt,
      bidPrtcptLmtRgnNm,
      sucsfbidMtd,
      indstrytyLmtYn,
      bidNtceUrl,
      rgstDt,
      bfSpecRgstNo,
      infoBizYn,
      prtcptLmtRgnCd,
      rgnLmtBidLocplc,
      bidGrntymnyPaymntYn,
      bidNtceDtlUrl,
      dtilPrdctClsfcNo,
      dtilPrdctClsfcNoNm,
      asignBdgtAmt,
      presmptPrce,
      prdctClsfcNoNm,
      drwtNo,
      refNo,
      prcrmntReqNo,
      orderPlanUntyNo,
      rlDminsttNm,
      exctvNm,
      bidQlfctRgstDt,
      cmmnSpldmdMetd,
      chgNtceRsn,
      rbidOpengDt,
      rbidPermsnYn,
      chgDt,
      linkInsttNm,
      dminsttTelNo,
      dminsttFaxNo,
      rbidChrctrNtceNo
    } = req.query;

    // Service key from environment variable
    const serviceKey = process.env.SERVICE_KEY ? process.env.SERVICE_KEY.trim() : null;
    if (!serviceKey) {
      return res.status(500).json({
        error: 'Service key not configured'
      });
    }

    // Build query parameters
    const params = new URLSearchParams({
      serviceKey,
      numOfRows,
      pageNo,
      inqryDiv,
      type
    });

    // Add optional parameters if provided
    if (inqryBgnDt) params.append('inqryBgnDt', inqryBgnDt);
    if (inqryEndDt) params.append('inqryEndDt', inqryEndDt);
    if (bidNtceNo) params.append('bidNtceNo', bidNtceNo);
    if (bidNtceNm) params.append('bidNtceNm', bidNtceNm);
    if (ntceInsttCd) params.append('ntceInsttCd', ntceInsttCd);
    if (ntceInsttNm) params.append('ntceInsttNm', ntceInsttNm);
    if (dminsttCd) params.append('dminsttCd', dminsttCd);
    if (dminsttNm) params.append('dminsttNm', dminsttNm);
    if (bidMetd) params.append('bidMetd', bidMetd);
    if (cntrctCnclsMtd) params.append('cntrctCnclsMtd', cntrctCnclsMtd);
    if (bidClseDt) params.append('bidClseDt', bidClseDt);
    if (opengDt) params.append('opengDt', opengDt);
    if (bidPrtcptLmtRgnNm) params.append('bidPrtcptLmtRgnNm', bidPrtcptLmtRgnNm);
    if (sucsfbidMtd) params.append('sucsfbidMtd', sucsfbidMtd);
    if (indstrytyLmtYn) params.append('indstrytyLmtYn', indstrytyLmtYn);
    if (bidNtceUrl) params.append('bidNtceUrl', bidNtceUrl);
    if (rgstDt) params.append('rgstDt', rgstDt);
    if (bfSpecRgstNo) params.append('bfSpecRgstNo', bfSpecRgstNo);
    if (infoBizYn) params.append('infoBizYn', infoBizYn);
    if (prtcptLmtRgnCd) params.append('prtcptLmtRgnCd', prtcptLmtRgnCd);
    if (rgnLmtBidLocplc) params.append('rgnLmtBidLocplc', rgnLmtBidLocplc);
    if (bidGrntymnyPaymntYn) params.append('bidGrntymnyPaymntYn', bidGrntymnyPaymntYn);
    if (bidNtceDtlUrl) params.append('bidNtceDtlUrl', bidNtceDtlUrl);
    if (dtilPrdctClsfcNo) params.append('dtilPrdctClsfcNo', dtilPrdctClsfcNo);
    if (dtilPrdctClsfcNoNm) params.append('dtilPrdctClsfcNoNm', dtilPrdctClsfcNoNm);
    if (asignBdgtAmt) params.append('asignBdgtAmt', asignBdgtAmt);
    if (presmptPrce) params.append('presmptPrce', presmptPrce);
    if (prdctClsfcNoNm) params.append('prdctClsfcNoNm', prdctClsfcNoNm);
    if (drwtNo) params.append('drwtNo', drwtNo);
    if (refNo) params.append('refNo', refNo);
    if (prcrmntReqNo) params.append('prcrmntReqNo', prcrmntReqNo);
    if (orderPlanUntyNo) params.append('orderPlanUntyNo', orderPlanUntyNo);
    if (rlDminsttNm) params.append('rlDminsttNm', rlDminsttNm);
    if (exctvNm) params.append('exctvNm', exctvNm);
    if (bidQlfctRgstDt) params.append('bidQlfctRgstDt', bidQlfctRgstDt);
    if (cmmnSpldmdMetd) params.append('cmmnSpldmdMetd', cmmnSpldmdMetd);
    if (chgNtceRsn) params.append('chgNtceRsn', chgNtceRsn);
    if (rbidOpengDt) params.append('rbidOpengDt', rbidOpengDt);
    if (rbidPermsnYn) params.append('rbidPermsnYn', rbidPermsnYn);
    if (chgDt) params.append('chgDt', chgDt);
    if (linkInsttNm) params.append('linkInsttNm', linkInsttNm);
    if (dminsttTelNo) params.append('dminsttTelNo', dminsttTelNo);
    if (dminsttFaxNo) params.append('dminsttFaxNo', dminsttFaxNo);
    if (rbidChrctrNtceNo) params.append('rbidChrctrNtceNo', rbidChrctrNtceNo);

    // API URL - 물품 입찰공고목록
    const apiUrl = `${process.env.API_BASE_URL}/getBidPblancListInfoThng?${params.toString()}`;

    // Make API request
    const response = await axios.get(apiUrl, {
      timeout: 25000,
      headers: {
        'Accept': type === 'json' ? 'application/json' : 'application/xml'
      }
    });

    // Handle response based on type
    if (type === 'json') {
      res.status(200).json(response.data);
    } else {
      // For XML response
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(response.data);
    }

  } catch (error) {
    console.error('API Error:', error.message);
    
    // Handle specific error cases
    if (error.response) {
      res.status(error.response.status).json({
        error: 'API request failed',
        message: error.response.data || error.message,
        status: error.response.status
      });
    } else if (error.request) {
      res.status(503).json({
        error: 'Service unavailable',
        message: 'Unable to reach the API server'
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
};