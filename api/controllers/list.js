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

exports.deleteFromList = async (req, res, next) => {
  try {
    const { content_id: contentId, content_type: contentType } = req.body;
    const userId = req.user.id;

    const userListItem = await fetchUserListContent(userId, contentId, contentType);
    if (!userListItem) {
      throw new APIError({
        status: 400,
        message: 'Content not present in users list',
      });
    }
    await userListItem.destroy();
    return res.json({
      status: 200,
      message: 'Content delete from list successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.fetchUserContentList = async (req, res, next) => {
  try {
    const { content_type: contentType, page, limit } = req.query;
    const userId = req.user.id;
    const user = await User.findOne({
      where: { id: userId },

    });

    if (!user) {
      throw new APIError({ status: 404, message: 'User not found' });
    }
    const pagination = paginate(page, limit);
    const userList = await UserList.findAndCountAll({
      where: {
        user_id: userId,
        ...(contentType ? { content_type: contentType } : {}),
      },
      distinct: true,
      include: [
        {
          model: Movie,
          raw: true,
        },
        {
          model: TvShow,
          raw: true,
        },
      ],
      ...pagination,
      order: [['id', 'ASC']],
    });
    if (!userList) {
      throw new APIError({
        status: 404,
        message: 'No content found in user list',
      });
    }

    return res.json({
      status: 200,
      message: 'Content list fetched successfully',
      data: {
        userList: userList.rows.map((item) => {
          if (item.content_type === 'MOVIE') {
            return { content_data: item.Movie, content_type: 'MOVIE' };
          }
          if (item.content_type === 'TV') {
            return { content_data: item.TvShow, content_type: 'TV' };
          }
          return null;
        }),
      },
    });
  } catch (error) {
    return next(error);
  }
};
