import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type MutationOptions<TReq = unknown, TRes = unknown> = Omit<UseMutationOptions<TRes, AxiosError, TReq>, 'mutationKey' | 'mutationFn'>;
