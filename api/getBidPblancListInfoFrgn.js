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
      sucsfbidMtd,
      bidNtceUrl,
      rgstDt,
      asignBdgtAmt,
      bidQlfctRgstDt,
      cmmnSpldmdMetd,
      bidNtceDtlUrl,
      rbidPermsnYn,
      chgDt,
      linkInsttNm,
      dminsttTelNo,
      dminsttFaxNo
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
    if (sucsfbidMtd) params.append('sucsfbidMtd', sucsfbidMtd);
    if (bidNtceUrl) params.append('bidNtceUrl', bidNtceUrl);
    if (rgstDt) params.append('rgstDt', rgstDt);
    if (asignBdgtAmt) params.append('asignBdgtAmt', asignBdgtAmt);
    if (bidQlfctRgstDt) params.append('bidQlfctRgstDt', bidQlfctRgstDt);
    if (cmmnSpldmdMetd) params.append('cmmnSpldmdMetd', cmmnSpldmdMetd);
    if (bidNtceDtlUrl) params.append('bidNtceDtlUrl', bidNtceDtlUrl);
    if (rbidPermsnYn) params.append('rbidPermsnYn', rbidPermsnYn);
    if (chgDt) params.append('chgDt', chgDt);
    if (linkInsttNm) params.append('linkInsttNm', linkInsttNm);
    if (dminsttTelNo) params.append('dminsttTelNo', dminsttTelNo);
    if (dminsttFaxNo) params.append('dminsttFaxNo', dminsttFaxNo);

    // API URL - 외자 입찰공고목록
    const apiUrl = `${process.env.API_BASE_URL}/getBidPblancListInfoFrgn?${params.toString()}`;

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