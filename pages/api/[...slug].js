import querystring from 'querystring';
import request from '../../utils/request';
import url from '../../constants/url';
import { handleException } from '../../utils/http';

const token = process.env.NEXT_PUBLIC_STRAPI_ACCESS_TOKEN;

const handler = async (req, res) => {
  try {
    const { method: methodParam, query, body: data, headers } = req;
    const { slug, ...other } = query;

    // Add token to API Route for protecting token
    const headersNew = { ...headers, Authorization: `Bearer ${token}` };
    delete headersNew.host;
    delete headersNew.referer;

    const method = methodParam;
    const queryParams = querystring.stringify(other);
    // Request url /api/a/b... => {slug : [a,b,...]}
    const path = [...slug].join('/');
    const requestConfig = {
      url: `${url.BASE_URL}/api/${path}?${queryParams}`,
      method,
      data,
      headers: headersNew,
    };
    const response = await request(requestConfig);
    res.status(200).send({ message: 'success', data: response?.data?.data });
  } catch (error) {
    handleException(res, error);
  }
};

export default handler;
