import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { Button, Image, Modal, Table } from 'react-bootstrap';
import moment from 'moment';
import { hideCertificateImage, showCertificateImage } from 'redux/modules/profile';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  state => ({
    certificates: state.profile.certificates,
    imageModal: state.profile.certificatesImageModal
  }),
  dispatch => bindActionCreators({ hideCertificateImage, showCertificateImage}, dispatch))
export default class ProfileCertificates extends Component {
  static propTypes = {
    certificates: PropTypes.array,
    dispatch: PropTypes.func,
    imageModal: PropTypes.object,
    showCertificateImage: PropTypes.func,
    hideCertificateImage: PropTypes.func,
  }

  render() {
    const { certificates, imageModal, showCertificateImage, hideCertificateImage } = this.props; // eslint-disable-line no-shadow
    const styles = require('./ProfileCertificates.scss');

    return (
      <div className={styles.profileCertificates + ' container'}>
        <h1>Certifications</h1>
        <Helmet title="Certifications" />
        {certificates <= 0 &&
          <div>
            <p>It seems like we have no certifications on record for you. If you believe
               this is a mistake, please contact the Director of Membership </p>
          </div>
        }
        {certificates.length > 0 &&
          <div>
            <p>Here are the certifications we have on record for you. If this is a mistake,
               please contact the Director of Membership </p>

            <Modal show={imageModal.show} onHide={hideCertificateImage}>
              <Modal.Header closeButton>
                <Modal.Title>Certification Image</Modal.Title>
              </Modal.Header>
              <Modal.Body align="center">
                <Image src={'data:image/png;base64,' + imageModal.image} responsive />
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={hideCertificateImage}>Close</Button>
              </Modal.Footer>
            </Modal>

            <Table className="table striped table-condensed">
              <thead>
                <tr>
                  <th className={styles.ownerCol}>Certification</th>
                  <th className={styles.ownerCol}>Authority</th>
                  <th className={styles.ownerCol}>Expiry</th>
                  <th className={styles.idCol}>Image</th>
                </tr>
              </thead>
              <tbody>
                {
                  certificates.map((cert, index) =>
                      <tr key={index}>
                        <td>{cert.certification}</td>
                        <td>{cert.authority}</td>
                        <td>{moment(cert.expiry).format('MMM Do, YYYY')}</td>
                        <td>{cert.image && <Button onClick={showCertificateImage.bind(this, cert.image)}>Show</Button>}</td>
                      </tr>)
                }
              </tbody>
            </Table>
          </div>}
      </div>
    );
  }
}
