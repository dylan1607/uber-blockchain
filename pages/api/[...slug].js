import request from '../../utils/request';
import url from '../../constants/url';
import { handleException } from '../../utils/http';

const handler = async (req, res) => {
  try {
    // Request url /api/a/b... => {slug : [a,b,...]}
    const { slug } = req.query;
    const { body } = req;
    const response = await request(`${url.CMS_LOCAL}/${slug.join('/')}`, {
      params: { populate: '*' },
      body: { ...body },
    });
    res.status(200).send({ message: 'success', data: response.data.data });
  } catch (error) {
    handleException(res, error);
  }
};

export default handler;
