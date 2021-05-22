import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

// enum Environment {
//   Development = 'development',
//   Production = 'production',
//   Test = 'test',
//   Provision = 'provision',
// }

class EnvironmentVariables {
  //   @IsEnum(Environment)
  //   NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  KAKAO_REST_API_KEY: string;

  @IsString()
  KAKAO_ADMIN_KEY: string;

  @IsString()
  SESSION_KEY: string;

  @IsString()
  JWT_TOKEN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
