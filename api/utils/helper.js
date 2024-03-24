const APIError = require('./APIError');

const { User, Movie, TvShow, UserList } = global.sequelize;

exports.fetchUserListContent = async (userId, contentId, contentType) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new APIError({ status: 404, message: 'User not found' });
  }
  let content;
  let userlistItem;
  switch (contentType) {
    case 'MOVIE':
      content = await Movie.findOne({ where: { id: contentId } });
      userlistItem = await UserList.findOne({
        where: { user_id: userId, movie_id: contentId },
      });
      break;
    case 'TV':
      content = await TvShow.findOne({ where: { id: contentId } });
      userlistItem = await UserList.findOne({
        where: { user_id: userId, tv_show_id: contentId },
      });
      break;
    default:
      throw new APIError({ status: 404, message: 'Invalid content type' });
  }

  if (!content) {
    throw new APIError({ status: 404, message: 'Content not found' });
  }
  return userlistItem;
};
