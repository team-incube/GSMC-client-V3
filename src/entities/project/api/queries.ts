import { queryOptions } from '@tanstack/react-query';

import { getProjectById, GetProjectByIdRequest } from './getProjectById';
import { getProjectBySearch, GetProjectBySearchRequest } from './getProjectBySearch';
import { getProjectMyScoreById, GetProjectMyScoreByIdRequest } from './getProjectMyScoreById';
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
  detail: (params: GetProjectByIdRequest) =>
    queryOptions({
      queryKey: [...projectQueries.all(), 'detail', params],
      queryFn: () => getProjectById(params),
    }),
  myScore: (params: GetProjectMyScoreByIdRequest) =>
    queryOptions({
      queryKey: [...projectQueries.all(), 'myScore', params],
      queryFn: () => getProjectMyScoreById(params),
    }),
};
