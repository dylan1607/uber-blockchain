import url from '../constants/url';

export const HTTP_STATUS = { OK: 200, INTERNAL_ERROR: 500 };

export const handleException = (res, err) => {
  if (err.response) {
    return res
      .status(err.response.status)
      .send(err?.message, err?.response?.data);
  }
  return res.status(500).send(err.status, err.message);
};

// Middleware handle every request
export const withMiddleware = (handler) => (req, res) => {
  req = () => {
    const { method: methodParam, query, body: data, headers } = req;
    const { slug, ...other } = query;
    const headersNew = { ...headers };
    delete headersNew.host;

    const method = methodParam;

    // Request url /api/a/b... => {slug : [a,b,...]}
    const path = [...slug].join('/');
    const queryParams = JSON.stringify(other);
    return {
      url: `${url.BASE_URL}/api/${path}?${queryParams}`,
      method,
      query,
      data,
      headers: headersNew,
    };
  };
  return handler(req, res);
};
