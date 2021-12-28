import { makeVar } from '@apollo/client';

export const currentCategoryVar = makeVar<string | null>(null);
