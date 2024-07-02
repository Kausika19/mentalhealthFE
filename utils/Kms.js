import AWS from 'aws-sdk';
import {Buffer} from 'buffer';

AWS.config.update({
  accessKeyId: 'AKIAXYKJVVQACBVBGUUD',
  secretAccessKey: '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',
  region: 'eu-north-1',
});

const encryptData = async (data) => {
    const kms = new AWS.KMS();
    const params = {
      KeyId: 'arn:aws:kms:eu-north-1:533267328000:key/fd6e77ed-c242-4929-920b-2c19d5851f94',
      Plaintext: data,
    };
    
    try {
      const encryptedData = await kms.encrypt(params).promise();
      return encryptedData.CiphertextBlob.toString('base64');
    } catch (error) {
      console.error('Encryption errors:', error);
      return null;
    }
  };

  const decryptData = async (encryptedData) => {
    const kms = new AWS.KMS();
    const params = {
      // Decoding from base64 to a buffer before passing to decrypt
      CiphertextBlob: Buffer.from(encryptedData, 'base64'),
    };
  
    try {
      const decryptedData = await kms.decrypt(params).promise();
      // Assuming the plaintext is UTF-8 encoded
      return decryptedData.Plaintext.toString('utf-8');
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  };

export {
    encryptData,
    decryptData,
};
