import { Injectable } from '@nestjs/common';

@Injectable()
export class TemporalConfigService {
  generateConfig() {
    return {
      namespace: process.env['TEMPORAL_NAMESPACE'] || 'default',
      address: process.env['TEMPORAL_HOST'] || 'localhost:7233',
      tls: TemporalConfigService.generateTlsConfig(),
    };
  }

  private static generateTlsConfig() {
    if (process.env['TEMPORAL_CERT']) {
      return {
        clientCertPair: {
          crt: Buffer.from(process.env['TEMPORAL_CERT']),
          key: Buffer.from(process.env['TEMPORAL_KEY']),
        },
      };
    }

    return false;
  }
}
