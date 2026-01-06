import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { projectQueries } from '@/entities/project/api/queries';
import { scoreQueries } from '@/entities/score/api/queries';
import { studentQueries } from '@/entities/student/api/queries';
import { getQueryClient } from '@/shared/lib/query-client';
import MainView from '@/view/main/ui/MainView';

export default async function MainPage() {
  const queryClient = getQueryClient();

  Promise.all([
    queryClient.prefetchQuery(studentQueries.me()),
    queryClient.prefetchQuery(scoreQueries.category()),
    queryClient.prefetchQuery(projectQueries.list()),
  ])


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainView />
    </HydrationBoundary>
  );
}
