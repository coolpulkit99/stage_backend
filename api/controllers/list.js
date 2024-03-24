const APIError = require('../utils/APIError');
const { fetchUserListContent, paginate } = require('../utils/helper');

const {
  User, Movie, TvShow, UserList,
} = global.sequelize;

exports.addToList = async (req, res, next) => {
  try {
    const { content_id: contentId, content_type: contentType } = req.body;
    const userId = req.user.id;

    const userlistItem = await fetchUserListContent(userId, contentId, contentType);

    if (userlistItem) {
      throw new APIError({ status: 400, message: 'Content already added to users list' });
    }
    let contentObject;
    switch (contentType) {
      case 'MOVIE':
        contentObject = { movie_id: contentId };
        break;
      case 'TV':
        contentObject = { tv_show_id: contentId };
        break;
      default:
        throw new APIError({ status: 404, message: 'Invalid content type' });
    }

    await UserList.create({ user_id: userId, ...contentObject, content_type: contentType });
    return res.json({
      status: 200,
      message: 'Content added to users list successfully',
    });
  } catch (error) {
    return next(error);
  }
};
