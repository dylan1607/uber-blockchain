import url from '../../constants/url';
import axios from 'axios';
import { handleException } from '../../utils/http';

const handler = async (req, res) => {
  try {
    const { body } = req;
    const response = await axios(
      `${url.MAPBOX_PLACES_API_URL}/${body.location}.json`,
      {
        params: {
          access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
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
