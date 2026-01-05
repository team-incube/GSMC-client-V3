import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { studentQueries } from '@/entities/student/api/queries';
import { getQueryClient } from '@/shared/lib/query-client';
import MainView from '@/view/main/ui/MainView';

export default async function MainPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(studentQueries.me());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainView />
    </HydrationBoundary>
  );
}
