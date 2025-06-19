const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // URL에서 엔드포인트 추출
    const endpoint = req.url.replace(/^\//, '').split('?')[0];
    
    if (!endpoint) {
      return res.status(404).json({
        error: 'Endpoint not specified',
        message: 'Please specify an endpoint in the URL'
      });
    }

    // Service key from environment variable
    const serviceKey = process.env.SERVICE_KEY ? process.env.SERVICE_KEY.trim() : null;
    if (!serviceKey) {
      return res.status(500).json({
        error: 'Service key not configured'
      });
    }

    // API base URL from environment variable
    const apiBaseUrl = process.env.API_BASE_URL ? process.env.API_BASE_URL.trim() : null;
    if (!apiBaseUrl) {
      return res.status(500).json({
        error: 'API base URL not configured'
      });
    }

    // 쿼리 파라미터 복사
    const params = { ...req.query };
    params.serviceKey = serviceKey;

    // API URL 구성
    const apiUrl = `${apiBaseUrl}/${endpoint}`;

    console.log(`Proxying request to: ${apiUrl}`);
    console.log('Parameters:', JSON.stringify(params, null, 2));

    // Make API request
    const response = await axios.get(apiUrl, {
      params,
      timeout: 25000,
      headers: {
        'Accept': params.type === 'json' ? 'application/json' : 'application/xml'
      }
    });

    // Handle response based on content type
    const contentType = response.headers['content-type'];
    
    if (contentType && contentType.includes('json')) {
      res.status(200).json(response.data);
    } else if (contentType && contentType.includes('xml')) {
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(response.data);
    } else {
      // Default to sending as-is
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
        status: error.response.status,
        endpoint: req.url
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