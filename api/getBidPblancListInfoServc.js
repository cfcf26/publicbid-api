const axios = require('axios');
const xml2js = require('xml2js');

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
      prtcptLmtRgnCd,
      prtcptLmtRgnNm,
      indstrytyLmtYn,
      bidNtceDtlUrl,
      bidNtceUrl,
      srvceDivNm,
      sucsfbidMtd,
      rgstDt,
      bfSpecRgstNo,
      infoBizYn,
      rsrvtnPrceRngRate,
      rgnLmtBidLocplc,
      rmrk,
      bidPrtcptFeePaymntYn,
      bidPrtcptFee,
      bidGrntymnyPaymntYn,
      crdtrNm,
      dtilPrdctClsfcNoNm,
      prdctSpecNm,
      prcrmntReqNo,
      asignBdgtAmt,
      presmptPrce,
      opengPlce,
      bidQlfctRgstDt,
      cmmnSpldmdMetd,
      chgDt,
      ntceKindNm,
      ntceKindNm1,
      ntceKindNm2,
      rbidPermsnYn,
      BidPblancListInfoCnstwkBidPblancListInfoCnstwk,
      BidPblancListInfoThngBidPblancListInfoThng,
      BidPblancListInfoSrvcBidPblancListInfoSrvc,
      BidPblancListInfoFrgnBidPblancListInfoFrgn
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
    if (prtcptLmtRgnCd) params.append('prtcptLmtRgnCd', prtcptLmtRgnCd);
    if (prtcptLmtRgnNm) params.append('prtcptLmtRgnNm', prtcptLmtRgnNm);
    if (indstrytyLmtYn) params.append('indstrytyLmtYn', indstrytyLmtYn);
    if (bidNtceDtlUrl) params.append('bidNtceDtlUrl', bidNtceDtlUrl);
    if (bidNtceUrl) params.append('bidNtceUrl', bidNtceUrl);
    if (srvceDivNm) params.append('srvceDivNm', srvceDivNm);
    if (sucsfbidMtd) params.append('sucsfbidMtd', sucsfbidMtd);
    if (rgstDt) params.append('rgstDt', rgstDt);
    if (bfSpecRgstNo) params.append('bfSpecRgstNo', bfSpecRgstNo);
    if (infoBizYn) params.append('infoBizYn', infoBizYn);
    if (rsrvtnPrceRngRate) params.append('rsrvtnPrceRngRate', rsrvtnPrceRngRate);
    if (rgnLmtBidLocplc) params.append('rgnLmtBidLocplc', rgnLmtBidLocplc);
    if (rmrk) params.append('rmrk', rmrk);
    if (bidPrtcptFeePaymntYn) params.append('bidPrtcptFeePaymntYn', bidPrtcptFeePaymntYn);
    if (bidPrtcptFee) params.append('bidPrtcptFee', bidPrtcptFee);
    if (bidGrntymnyPaymntYn) params.append('bidGrntymnyPaymntYn', bidGrntymnyPaymntYn);
    if (crdtrNm) params.append('crdtrNm', crdtrNm);
    if (dtilPrdctClsfcNoNm) params.append('dtilPrdctClsfcNoNm', dtilPrdctClsfcNoNm);
    if (prdctSpecNm) params.append('prdctSpecNm', prdctSpecNm);
    if (prcrmntReqNo) params.append('prcrmntReqNo', prcrmntReqNo);
    if (asignBdgtAmt) params.append('asignBdgtAmt', asignBdgtAmt);
    if (presmptPrce) params.append('presmptPrce', presmptPrce);
    if (opengPlce) params.append('opengPlce', opengPlce);
    if (bidQlfctRgstDt) params.append('bidQlfctRgstDt', bidQlfctRgstDt);
    if (cmmnSpldmdMetd) params.append('cmmnSpldmdMetd', cmmnSpldmdMetd);
    if (chgDt) params.append('chgDt', chgDt);
    if (ntceKindNm) params.append('ntceKindNm', ntceKindNm);
    if (ntceKindNm1) params.append('ntceKindNm1', ntceKindNm1);
    if (ntceKindNm2) params.append('ntceKindNm2', ntceKindNm2);
    if (rbidPermsnYn) params.append('rbidPermsnYn', rbidPermsnYn);
    if (BidPblancListInfoCnstwkBidPblancListInfoCnstwk) params.append('BidPblancListInfoCnstwkBidPblancListInfoCnstwk', BidPblancListInfoCnstwkBidPblancListInfoCnstwk);
    if (BidPblancListInfoThngBidPblancListInfoThng) params.append('BidPblancListInfoThngBidPblancListInfoThng', BidPblancListInfoThngBidPblancListInfoThng);
    if (BidPblancListInfoSrvcBidPblancListInfoSrvc) params.append('BidPblancListInfoSrvcBidPblancListInfoSrvc', BidPblancListInfoSrvcBidPblancListInfoSrvc);
    if (BidPblancListInfoFrgnBidPblancListInfoFrgn) params.append('BidPblancListInfoFrgnBidPblancListInfoFrgn', BidPblancListInfoFrgnBidPblancListInfoFrgn);

    // API URL
    const apiUrl = `${process.env.API_BASE_URL}/getBidPblancListInfoServc?${params.toString()}`;

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
      // The request was made and the server responded with a status code
      res.status(error.response.status).json({
        error: 'API request failed',
        message: error.response.data || error.message,
        status: error.response.status
      });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(503).json({
        error: 'Service unavailable',
        message: 'Unable to reach the API server'
      });
    } else {
      // Something happened in setting up the request
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
};