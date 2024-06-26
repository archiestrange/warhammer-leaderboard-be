import { acceptFriendRequest } from './mutation/accept-friend-request';
import { blockUser } from './mutation/block-user';
import { confirmGame } from './mutation/confirm-game';
import { createCommunity } from './mutation/create-community';
import { createGame } from './mutation/create-game';
import { createLeague } from './mutation/create-league';
import { createUser } from './mutation/create-user';
import { declineFriendRequest } from './mutation/decline-friend-request';
import { deleteCommunity } from './mutation/delete-community';
import { deleteLeague } from './mutation/delete-league';
import { joinCommunity } from './mutation/join-community';
import { joinLeague } from './mutation/join-league';
import { removeFriend } from './mutation/remove-friend';
import { resetPassword } from './mutation/resetPassword';
import { sendFriendRequest } from './mutation/send-friend-request';
import { signIn } from './mutation/sign-in';
import { updateUser } from './mutation/update-user';
import { getCommunity } from './query/get-community';
import { getCommunityList } from './query/get-community-list';
import { getCommunityMembers } from './query/get-community-members';
import { getComparison } from './query/get-comparison';
import { getFriendList } from './query/get-friend-list';
import { getFriendRequestList } from './query/get-friend-request-list';
import { getFriendsGamesList } from './query/get-friends-games-list';
import { getGame } from './query/get-game';
import { getGamesByCommunityList } from './query/get-games-by-community-list';
import { getGamesByLeagueList } from './query/get-games-by-league-list';
import { getGamesList } from './query/get-games-list';
import { getLeague } from './query/get-league';
import { getLeagueList } from './query/get-league-list';
import { getLeagueMembers } from './query/get-league-members';
import { getProfile } from './query/get-profile';
import { getSuggestedFriends } from './query/get-suggested-friends';
import { getUser } from './query/get-user';
import { getUserRankings } from './query/get-user-rankings';
import { searchCommunities } from './query/search-community';
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
    searchCommunities: (_, args) => searchCommunities(args),
    getLeagueList: (_, args) => getLeagueList(args),
    getCommunityList: (_, args) => getCommunityList(args),
    getLeague: (_, args) => getLeague(args),
    getCommunity: (_, args) => getCommunity(args),
    getLeagueMembers: (_, args) => getLeagueMembers(args),
    getCommunityMembers: (_, args) => getCommunityMembers(args),
    getGamesList: (_, args) => getGamesList(args),
    getFriendsGamesList: (_, args) => getFriendsGamesList(args),
    getGamesByLeagueList: (_, args) => getGamesByLeagueList(args),
    getGamesByCommunityList: (_, args) => getGamesByCommunityList(args),
    getGame: (_, args) => getGame(args),
    getProfile: (_, args) => getProfile(args),
    getComparison: (_, args) => getComparison(args),
    getUserRankings: (_, args) => getUserRankings(args),
  },
  Mutation: {
    createUser: (_, args) => createUser(args),
    updateUser: (_, args) => updateUser(args),
    signIn: (_, args) => signIn(args),
    sendFriendRequest: async (_, args) => sendFriendRequest(args),
    acceptFriendRequest: async (_, args) => acceptFriendRequest(args),
    declineFriendRequest: async (_, args) => declineFriendRequest(args),
    removeFriend: async (_, args) => removeFriend(args),
    blockUser: async (_, args) => blockUser(args),
    createLeague: async (_, args) => createLeague(args),
    createCommunity: async (_, args) => createCommunity(args),
    deleteLeague: async (_, args) => deleteLeague(args),
    deleteCommunity: async (_, args) => deleteCommunity(args),
    joinLeague: async (_, args) => joinLeague(args),
    joinCommunity: async (_, args) => joinCommunity(args),
    createGame: async (_, args) => createGame(args),
    confirmGame: async (_, args) => confirmGame(args),
    resetPassword: async (_, args) => resetPassword(args),
  },
};
