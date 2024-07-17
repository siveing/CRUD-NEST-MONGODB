import { Inject } from '@nestjs/common';

export const InjectCacheManager = () => Inject('CACHE_MANAGER');
