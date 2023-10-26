import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IWPDefault } from '@/types/types';
import { fetchPolicies } from '@/utils/fetchs/fetchs';
import React from 'react';

export const Politique = () => {
  const { data } = useQueryUtils<IWPDefault>({
    qKey: ['getPolicies'],
    qFn: () => fetchPolicies(),
  });
  return (
    <section>
      {data && (
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }}></div>
      )}
    </section>
  );
};
