import url from '../../constants/url';
import { handleException } from '../../utils/http';
import request from '../../utils/request';

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const handler = async (req, res) => {
  try {
    const {
      body: { pickupCordinates, dropoffCordinates },
    } = req;
    const response = await request.get(
      `${url.MAPBOX_DIRECTIONS_API_URL}/${pickupCordinates};${dropoffCordinates}`,
      {
        params: {
          access_token: token,
        },
      }
    );
    // console.log(response.data);
    res.status(200).send({ message: 'success', data: response.data });
  } catch (error) {
    handleException(res, { ...error, message: 'Cannot get Duration' });
  }
};

export default handler;
