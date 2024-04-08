import { In } from 'typeorm';

import { AppDataSource } from '../data-source';
import { CommunityMember } from '../entity/CommunityMember';
import { Game } from '../entity/Game';

export const getGamesByCommunityList = async ({ communityId, limit, offset }) => {
  console.log('getGamesByCommunityList - info - started');

  const communityMembers = await AppDataSource.manager.find(CommunityMember, {
    where: { community: { id: communityId } },
    relations: {
      user: true,
    },
  });

  const communityMemberIds = communityMembers.map((m) => m.user.id);

  const games = await AppDataSource.manager.findAndCount(Game, {
    where: [
      {
        attacker: { id: In(communityMemberIds) },
        attackerHandshake: true,
        defenderHandshake: true,
      },
      {
        defender: { id: In(communityMemberIds) },
        attackerHandshake: true,
        defenderHandshake: true,
      },
    ],
    relations: { attacker: true, defender: true, league: true },
    take: limit,
    skip: offset,
    order: { date: 'DESC' },
  });

  console.log('getGamesByCommunityList - info - success');

  return {
    data: games[0],
    count: games[1],
  };
};
