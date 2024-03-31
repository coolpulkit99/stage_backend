const APIError = require('../utils/APIError');
const { CONTENT_TYPES } = require('../utils/enums');

const { User, Movie, TvShow, UserList } = global.sequelize;

exports.fetchUserListContent = async (userId, contentId, contentType) => {
    const user = await User.findOne({ where: { id: userId } });
    let content;
    let userlistItem;
    switch (contentType) {
      case CONTENT_TYPES.MOVIE:
        content = await Movie.findOne({ where: { id: contentId } });
        userlistItem = await UserList.findOne({
          where: { user_id: userId, movie_id: contentId },
        });
        break;
      case CONTENT_TYPES.TV:
        content = await TvShow.findOne({ where: { id: contentId } });
        userlistItem = await UserList.findOne({
          where: { user_id: userId, tv_show_id: contentId },
        });
        break;
      default:
        throw new APIError({ status: 400, message: 'Invalid content type' });
    }
  
    if (!content) {
      throw new APIError({ status: 404, message: 'Not found' });
    }
    return userlistItem;
  };