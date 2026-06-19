import { ConfigService } from "@nestjs/config";

export default function isDevEnv(configService: ConfigService) {
  const nodeEnv = configService.getOrThrow<string>("NODE_ENV");

  return nodeEnv === "development";
}
