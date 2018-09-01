import { IPackOfLies } from '../generated/resolvers';
import { Types } from './types';

export interface PackOfLiesRoot {
  lies?: string;
  fakeness?: string;
}

export const PackOfLies: IPackOfLies.Resolver<Types> = {
  lies: root => root.lies,
  fakeness: root => root.fakeness,
};
