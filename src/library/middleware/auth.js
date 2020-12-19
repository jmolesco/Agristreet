const { combineResolvers } = require('graphql-resolvers');
const helpers = require('../helpers');
const repository = require('../repository');
const constants = require('../constants');
const { SessionError, ForbiddenError, InvalidAccess } = require('../extensions/ApiError');
const config = require('../config');

/**
 *
 * @param {Request} req Request info
 * @param {Response} res Response info
 * @param {Next} next Next request
 * @description Set request isAuth prop to true when contains a valid authorization header
 */
const setAuthFlag = (req, res, next) => {
  const lang = req.get('Accept-Language');
  if (lang) {
    switch (lang.toUpperCase()) {
      case 'JP': req.lang = constants.Languages.JP; break;
      case 'EN': req.lang = constants.Languages.EN; break;
      default: req.lang = constants.Languages.JP; break;
    }
  } else {
    // default language
    req.lang = constants.Languages.JP;
  }

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ');
  if (token.length !== 2 || !token[1] || token[1] === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = helpers.verifyToken(token[1]);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.id = decodedToken.id;

  return next();
};

/**
 *
 * @param {Request} req Request info
 * @param {Response} res Response info
 * @param {Next} next Next request
 * @description Set request isAuth prop to true when contains a valid authorization header
 */
const setAppKeyFlag = (req, res, next) => {
  const authHeader = req.get('X-Authorization');
  if (!authHeader) {
    req.isValidAppKey = false;
    return next();
  }

  const token = authHeader.split(' ');
  if (token.length !== 2 || !token[1] || token[1] === '') {
    req.isValidAppKey = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = helpers.verifyToken(token[1]);
  } catch (err) {
    req.isValidAppKey = false;
    return next();
  }
  if (!decodedToken) {
    req.isValidAppKey = false;
    return next();
  } if (decodedToken.appKey !== config.APP_KEY) {
    req.isValidAppKey = false;
    return next();
  }

  req.isValidAppKey = true;

  return next();
};


/**
 *
 * @param {Request} req Request info
 * @param {Response} res Response info
 * @param {Next} next Next request
 * @description Set request isAuth prop to true when contains a valid authorization header
 */
const setLINEFlag = (req, res, next) => {
  const authHeader = req.get('L-Authorization');
  if (!authHeader) {
    req.isViaLine = false;
    return next();
  }

  const token = authHeader.split(' ');
  if (token.length !== 2 || !token[1] || token[1] === '') {
    req.isViaLine = false;
    return next();
  }

  // eslint-disable-next-line prefer-destructuring

  let decodedToken;
  try {
    decodedToken = helpers.verifyToken(token[1]);
  } catch (err) {
    req.isViaLine = false;
    return next();
  }
  if (!decodedToken) {
    req.isViaLine = false;
    return next();
  }

  req.tonariwaId = decodedToken.tidv2;
  req.isViaLine = true;
  return next();
};

/**
 *
 * @param {Resolver} action  Graphql resolver
 * @description Anonymous access
 */
function AnonymousAccess(...action) {
  return combineResolvers(...action);
}

/**
 *
 * @param {Resolver} action  Graphql resolver
 * @description Anonymous access
 */
function LINEAccess(...action) {
  return combineResolvers(async (args, req) => {
    if (!req.isViaLine) {
      throw new InvalidAccess();
    }

    const result = await repository().TonariwaRepository
      .CheckTonirawaAccntExistStgy(req.tonariwaId);
    if (!result) {
      throw new ForbiddenError();
    }
    req.tonariwaAccount = result;
  },
    ...action);
}

/**
 *
 * @param {Resolver} action  Graphql resolver
 * @description Has valid X-Authorization access
 */
function WithAppKeyAccess(...action) {
  return combineResolvers(async (args, req) => {
    if (!req.isValidAppKey) {
      // TODO: enable on phase 2 for security of requests
      // throw new InvalidAccess();
    }
  },
    ...action);
}

/**
 *
 * @param {Resolver} action  Graphql resolver
 * @description Validate if request is authenticated
 */
function MemberAccess(...action) {
  return combineResolvers(
    AnonymousAccess(
      async (args, req) => {
        if (!req.isAuth) {
          throw new SessionError();
        }
        const member = await repository().UserRepository
          .FindUserByPublicLineId(req.lineId);
        if (!member) {
          throw new SessionError();
        }
        req.userId = member.id;
        req.member = member;

        // admin account is not allowed to login on member site
        /* const isAdminRole = await repository.IsAdminUserExistsById(req.userId);
        if (isAdminRole) {
          throw new SessionError();
        } */
      },
    ),
    ...action,
  );
}
/**
 *
 * @param {Resolver} action Graphql resolver
 * @description Validate if request has admin authorization
 */
function AdminAccess(...action) {
  return combineResolvers(
    async (args, req) => {
      if (!req.isAuth) {
        throw new SessionError();
      }
      const isAdminRole = await repository().AdminUserRepository.IsAdminUserExistsById(req.userId);
      if (!isAdminRole) {
        throw new ForbiddenError();
      }
    },
    ...action,
  );
}

function MemberImageAccess(...action) {
  return combineResolvers(
    async (req) => {
      if (req.isAuth && req.lineId) {
        const member = await repository().UserRepository
          .FindUserByPublicLineId(req.lineId);
        if (!member) {
          req.isAuth = false;
        } else {
          req.userId = member.id;
        }
      } else {
        req.isAuth = false;
      }
    },
    ...action,
  );
}

function AdminAssetAccess(...action) {
  return combineResolvers(
    async (req) => {
      if (req.isAuth && req.userId) {
        const adminExists = await repository().AdminUserRepository
          .IsAdminUserExistsById(req.userId);
        if (!adminExists) {
          req.isAuth = false;
        }
      } else {
        req.isAuth = false;
      }
    },
    ...action,
  );
}


module.exports = {
  setAuthFlag,
  setAppKeyFlag,
  setLINEFlag,
  AdminAccess,
  MemberAccess,
  AnonymousAccess,
  MemberImageAccess,
  WithAppKeyAccess,
  AdminAssetAccess,
  LINEAccess,
};
