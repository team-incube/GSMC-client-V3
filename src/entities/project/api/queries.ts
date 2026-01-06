import { queryOptions } from '@tanstack/react-query';

import { getProjectById } from './getProjectById';
import { getProjectBySearch, GetProjectBySearchRequest } from './getProjectBySearch';
import { getProjectMyScoreById } from './getProjectMyScoreById';
import { getProjects } from './getProjects';

export const projectQueries = {
  all: () => ['project'] as const,
  list: () =>
    queryOptions({
      queryKey: [...projectQueries.all(), 'list'],
      queryFn: getProjects,
    }),
  search: (params: GetProjectBySearchRequest) =>
    queryOptions({
      queryKey: [...projectQueries.all(), 'search', params],
      queryFn: () => getProjectBySearch(params),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...projectQueries.all(), 'detail', id],
      queryFn: () => getProjectById({ projectId: id }),
    }),
  myScore: (id: number) =>
    queryOptions({
      queryKey: [...projectQueries.all(), 'myScore', id],
      queryFn: () => getProjectMyScoreById({ projectId: id }),
    }),
};
