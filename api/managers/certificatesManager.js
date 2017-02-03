const certificatesRepository = require('../repositories/certificatesRepository');

module.exports = {
  addCertification: (userId, cert, callback) => {
    // The image is transported as a Base64 string, convert to byte[] for storing
    const image = cert.image;
    cert.image = new Buffer(image, 'base64');

    certificatesRepository.addCertification(userId, cert, (err) => {
      if (err) {
        callback({
          message: 'Unable to add the certificate to the user',
          error: err
        });
      } else {
        callback(null, { message: 'Operation succeeded' });
      }
    });
  },

  getCertifications: (userId, callback) => {
    certificatesRepository.getCertifications(userId, (err, result) => {
      if (err) {
        callback({
          message: 'Unable to get the certifications for the user',
          error: err
        });
      } else {
        // Convert the byte[] to Base64 for transport
        result.map((cert) => {
          if (cert.image !== null) {
            cert.image = cert.image.toString('base64');
          }
          return cert;
        });

        callback(null, result);
      }
    });
  },

  removeCertification: (userId, certId, callback) => {
    certificatesRepository.removeCertification(userId, certId, (err) => {
      if (err) {
        callback({
          message: 'Unable to remove the certification from the user',
          error: err
        });
      } else {
        callback(null, { message: 'Operation succeeded' });
      }
    });
  }
};
