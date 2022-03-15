import url from '../../constants/url';
import request from '../../utils/request';

export const createUser = async (req) => {
  try {
    const userDoc = {
      _type: 'user',
      _id: req.body.userWalletAddress,
      name: req.body.name,
      walletAddress: req.body.userWalletAddress,
    };
    await request.post(`${url.CMS_LOCAL}/nodes`, {
      data: userDoc,
    });
    // res.status(200).send({ message: 'success' });
  } catch (error) {
    handleException(res, error);
  }
};
