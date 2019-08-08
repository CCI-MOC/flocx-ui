const axios = require('axios');

class Keystone {
  constructor(authToken) {
    this.keystoneAPI = axios.create({
      // eslint-disable-next-line no-process-env
      baseURL: process.env.KEYSTONE_BASE_URL || 'http://localhost:5000',
      headers: {
        'X-Auth-Token': authToken
      }
    });
  }

  getTokenInformation (subjectToken) {
    return this.keystoneAPI.get('/v3/auth/tokens', {
      headers: {
        'X-Subject-Token': subjectToken
      }
    }).then((response) => response.data);
  }
}

module.exports = Keystone;
