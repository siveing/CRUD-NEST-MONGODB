import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ConfigDto } from './config.dto';

// ==================================================
// =========  VALIDATE ENVIRONMENT FUNCTION =========
// ==================================================
export const validateEnv = <T>(className: new () => T, config: Record<string, unknown> = process.env) => {
  const validatedConfig: any = plainToClass(className as any, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { whitelist: true, transform: true, forbidNonWhitelisted: false });

  if (errors.length > 0) {
    errors.forEach(e => console.error(`${e.constraints![Object.keys(e.constraints!)[0]]}`, undefined, module));
    throw new Error(`${module}: Invalid environment config.`);
  }

  return validatedConfig;
};

// ===================================================
// ============  CONFIGURATION ENVIRONMENT ===========
// ===================================================
export const configEnv = () => validateEnv(ConfigDto);
