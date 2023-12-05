import { v1 as uuid } from 'uuid';

export const GENERATOR_PROVIDER = {
  uuid(): string {
    return uuid();
  },

  fileName(ext: string): string {
    return GENERATOR_PROVIDER.uuid() + '.' + ext;
  },

  getS3PublicUrl(key: string): string {
    if (!key) {
      throw new TypeError('key is required');
    }

    return `https://s3.${process.env.AWS_S3_BUCKET_NAME_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${key}`;
  },

  getS3Key(publicUrl: string): string {
    if (!publicUrl) {
      throw new TypeError('key is required');
    }

    const exec = new RegExp(
      `(?<=https://s3.${process.env.AWS_S3_BUCKET_NAME_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/).*`,
    ).exec(publicUrl);

    if (!exec) {
      throw new TypeError('publicUrl is invalid');
    }

    return exec[0];
  },

  generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  generatePassword(): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = lowercase.toUpperCase();
    const numbers = '0123456789';

    let text = '';

    for (let i = 0; i < 4; i++) {
      text += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
      text += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
      text += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return text;
  },

  /**
   * generate random string
   * @param length
   */
  generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replaceAll(/[^\dA-Za-z]+/g, '')
      .slice(0, Math.max(0, length));
  },
};
