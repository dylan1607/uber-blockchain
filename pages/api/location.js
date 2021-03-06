import url from '../../constants/url';
import { handleException } from '../../utils/http';
import request from '../../utils/request';

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const handler = async (req, res) => {
  try {
    const { body } = req;
    const response = await request.get(
      `${url.MAPBOX_PLACES_API_URL}/${body.location}.json`,
      {
        params: {
          access_token: token,
          // Limit results with specific country
          country: 'VN',
        },
      }
    );
    // console.log(response.data.features[0].center);
    res.status(200).send({ message: 'success', data: response.data });
  } catch (error) {
    handleException(res, { ...error, message: 'Cannot get location' });
  }
};

export default handler;
