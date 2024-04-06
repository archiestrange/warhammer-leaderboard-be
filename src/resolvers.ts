import { acceptFriendRequest } from './mutation/accept-friend-request';
import { blockUser } from './mutation/block-user';
import { createGame } from './mutation/create-game';
import { createLeague } from './mutation/create-league';
import { createUser } from './mutation/create-user';
import { declineFriendRequest } from './mutation/decline-friend-request';
import { deleteLeague } from './mutation/delete-league';
import { joinLeague } from './mutation/join-league';
import { removeFriend } from './mutation/remove-friend';
import { resetPassword } from './mutation/resetPassword';
import { sendFriendRequest } from './mutation/send-friend-request';
import { signIn } from './mutation/sign-in';
import { getFriendList } from './query/get-friend-list';
import { getFriendRequestList } from './query/get-friend-request-list';
import { getGame } from './query/get-game';
import { getGamesByLeagueList } from './query/get-games-by-league-list';
import { getGamesList } from './query/get-games-list';
import { getLeague } from './query/get-league';
import { getLeagueList } from './query/get-league-list';
import { getLeagueMembers } from './query/get-league-members';
import { getProfile } from './query/get-profile';
import { getSuggestedFriends } from './query/get-suggested-friends';
import { getUser } from './query/get-user';
import { searchLeagues } from './query/search-leagues';
import { searchUsers } from './query/search-users';

export const resolvers = {
  Query: {
    getFriendList: (_, args) => getFriendList(args),
    getSuggestedFriends: (_, args) => getSuggestedFriends(args),
    getFriendRequestList: (_, args) => getFriendRequestList(args),
    getUser: (_, args) => getUser(args),
    searchUsers: (_, args) => searchUsers(args),
    searchLeagues: (_, args) => searchLeagues(args),
    getLeagueList: (_, args) => getLeagueList(args),
    getLeague: (_, args) => getLeague(args),
    getLeagueMembers: (_, args) => getLeagueMembers(args),
    getGamesList: (_, args) => getGamesList(args),
    getGamesByLeagueList: (_, args) => getGamesByLeagueList(args),
    getGame: (_, args) => getGame(args),
    getProfile: (_, args) => getProfile(args),
  },
  Mutation: {
    createUser: (_, args) => createUser(args),
    signIn: (_, args) => signIn(args),
    sendFriendRequest: async (_, args) => sendFriendRequest(args),
    acceptFriendRequest: async (_, args) => acceptFriendRequest(args),
    declineFriendRequest: async (_, args) => declineFriendRequest(args),
    removeFriend: async (_, args) => removeFriend(args),
    blockUser: async (_, args) => blockUser(args),
    createLeague: async (_, args) => createLeague(args),
    deleteLeague: async (_, args) => deleteLeague(args),
    joinLeague: async (_, args) => joinLeague(args),
    createGame: async (_, args) => createGame(args),
    resetPassword: async (_, args) => resetPassword(args),
  },
};
